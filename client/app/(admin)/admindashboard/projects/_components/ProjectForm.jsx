"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { saveProject } from "@/Services/operations/Project";
import {
  compressImageFile,
  fileExt,
  formatBytes,
  imageTypeError,
  toVideoEmbedUrl,
} from "./mediaHelpers";

const emptyFloorPlan = { configuration: "", area: "", price: "", image: "" };
const MAX_BROCHURE_BYTES = 40 * 1024 * 1024;
const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const FILE_FIELD_ALIASES = {
  heroImage: "heroImage",
  ogImage: "ogImage",
  brochure: "brochure",
  galleryImages: "gallery",
  amenityImages: "amenityImages",
  floorPlanImages: "floorPlans",
};

const readApiError = (error) => {
  const data = error.response?.data;
  let message = "";
  if (data && typeof data === "object") {
    message = data.message || data.error || "";
  } else if (typeof data === "string" && data.trim()) {
    message = data.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 280);
  }
  if (!message && error.code === "ECONNABORTED") {
    message = "Save timed out. Please try again.";
  }
  if (!message && !error.response) {
    message = error.message || "Network error. Could not reach the server.";
  }
  if (!message) {
    message = error.message || `Request failed${error.response?.status ? ` (${error.response.status})` : ""}`;
  }
  const field = data?.field || error.field;
  const fieldErrors =
    data?.errors && typeof data.errors === "object" && !Array.isArray(data.errors) ? data.errors : {};
  return { message, field: FILE_FIELD_ALIASES[field] || field, fieldErrors };
};

const mapMessageToField = (message = "") => {
  const text = message.toLowerCase();
  if (text.includes("name is required")) return "name";
  if (text.includes("slug already exists") || text.includes("invalid slug")) return "slug";
  if (text.includes("invalid project status") || text === "invalid status") return "status";
  if (text.includes("hero")) return "heroImage";
  if (text.includes("brochure") || (text.includes("pdf") && text.includes("file"))) return "brochure";
  if (text.includes("gallery")) return "gallery";
  if (text.includes("amenity")) return "amenityImages";
  if (text.includes("floor plan")) return "floorPlans";
  if (text.includes("og image") || text.includes("ogimage")) return "ogImage";
  if (text.includes("file size") || text.includes("too large")) return "brochure";
  return "";
};

const ProjectForm = ({ initialProject = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialProject?.slug));
  const [form, setForm] = useState({
    name: "",
    slug: "",
    location: "",
    developer: "",
    shortDescription: "",
    description: "",
    constructionStatus: "",
    projectType: "Residential",
    possession: "",
    startingPrice: "",
    priceRange: "",
    configurations: "",
    highlights: "Prime Location, Premium Construction, Gated Community",
    amenities: "Swimming Pool, Gym, Club House, Garden, Parking, Security",
    address: "",
    latitude: "",
    longitude: "",
    mapsUrl: "",
    nearbyLandmarks: "",
    nearbySchools: "",
    nearbyHospitals: "",
    nearbyMetro: "",
    nearbyHighways: "",
    reraNumber: "",
    legalInfo: "",
    seoTitle: "",
    seoDescription: "",
    videoUrl: "",
    brochureUrl: "",
    status: "DRAFT",
    featured: false,
  });
  const [heroImage, setHeroImage] = useState(null);
  const [heroPreview, setHeroPreview] = useState(initialProject?.heroImage || "");
  const [ogImage, setOgImage] = useState(null);
  const [brochure, setBrochure] = useState(null);
  const [galleryExisting, setGalleryExisting] = useState(initialProject?.gallery || []);
  const [galleryNew, setGalleryNew] = useState([]);
  const [amenityExisting, setAmenityExisting] = useState(initialProject?.amenityImages || []);
  const [amenityNew, setAmenityNew] = useState([]);
  const [floorPlans, setFloorPlans] = useState(
    initialProject?.floorPlans?.length ? initialProject.floorPlans : [{ ...emptyFloorPlan }]
  );

  useEffect(() => {
    if (!initialProject) return;
    const nearby = initialProject.nearby || {};
    setForm((prev) => ({
      ...prev,
      name: initialProject.name || "",
      slug: initialProject.slug || "",
      location: initialProject.location || "",
      developer: initialProject.developer || "",
      shortDescription: initialProject.shortDescription || "",
      description: initialProject.description || "",
      constructionStatus: initialProject.constructionStatus || "",
      projectType: initialProject.projectType || "Residential",
      possession: initialProject.possession || "",
      startingPrice: initialProject.startingPrice || "",
      priceRange: initialProject.priceRange || "",
      configurations: initialProject.configurations || "",
      highlights: Array.isArray(initialProject.highlights)
        ? initialProject.highlights.join(", ")
        : prev.highlights,
      amenities: Array.isArray(initialProject.amenities)
        ? initialProject.amenities.join(", ")
        : prev.amenities,
      address: initialProject.address || "",
      latitude: initialProject.latitude || "",
      longitude: initialProject.longitude || "",
      mapsUrl: initialProject.mapsUrl || "",
      nearbyLandmarks: (nearby.landmarks || []).join(", "),
      nearbySchools: (nearby.schools || []).join(", "),
      nearbyHospitals: (nearby.hospitals || []).join(", "),
      nearbyMetro: (nearby.metro || []).join(", "),
      nearbyHighways: (nearby.highways || []).join(", "),
      reraNumber: initialProject.reraNumber || "",
      legalInfo: initialProject.legalInfo || "",
      seoTitle: initialProject.seoTitle || "",
      seoDescription: initialProject.seoDescription || "",
      videoUrl: initialProject.videoUrl || "",
      brochureUrl: initialProject.brochureUrl || "",
      status: initialProject.status || "DRAFT",
      featured: Boolean(initialProject.featured),
    }));
    setHeroPreview(initialProject.heroImage || "");
    setGalleryExisting(initialProject.gallery || []);
    setAmenityExisting(initialProject.amenityImages || []);
    setFloorPlans(
      initialProject.floorPlans?.length ? initialProject.floorPlans : [{ ...emptyFloorPlan }]
    );
  }, [initialProject]);

  useEffect(() => {
    if (!slugTouched) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.name) }));
    }
  }, [form.name, slugTouched]);

  const splitList = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setFormError("");
  };

  const inputClass = (key, extra = "") =>
    `input-field ${extra} ${errors[key] ? "border-red-500 ring-1 ring-red-500" : ""}`.trim();

  const FieldError = ({ name }) =>
    errors[name] ? <p className="text-sm text-red-600 mt-1">{errors[name]}</p> : null;

  const validateForm = (nextStatus) => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Project name is required";
    if (!form.slug.trim()) nextErrors.slug = "Slug is required";
    if (!form.location.trim()) nextErrors.location = "Location is required";
    const status = nextStatus || form.status;
    if (!["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
      nextErrors.status = "Invalid project status";
    }
    const heroErr = imageTypeError(heroImage, "Hero image");
    if (heroErr) nextErrors.heroImage = heroErr;
    const ogErr = imageTypeError(ogImage, "OG image");
    if (ogErr) nextErrors.ogImage = ogErr;
    if (brochure && fileExt(brochure) !== "pdf") {
      nextErrors.brochure = "Brochure must be a PDF file";
    }
    if (brochure && brochure.size > MAX_BROCHURE_BYTES) {
      nextErrors.brochure = `Brochure is ${formatBytes(brochure.size)}. Please use a PDF under 40 MB.`;
    }
    const oversizedImage = [
      [heroImage, "Hero image", "heroImage"],
      [ogImage, "OG image", "ogImage"],
      ...galleryNew.map((item) => [item.file, "Gallery image", "gallery"]),
      ...amenityNew.map((file) => [file, "Amenity image", "amenityImages"]),
      ...floorPlans.map((plan) => [plan.file, "Floor plan image", "floorPlans"]),
    ].find(([file]) => file && file.size > MAX_IMAGE_BYTES);
    if (oversizedImage) {
      nextErrors[oversizedImage[2]] = `${oversizedImage[1]} is ${formatBytes(oversizedImage[0].size)}. Please use an image under 25 MB.`;
    }
    const invalidGallery = galleryNew.find((item) => imageTypeError(item.file, "Gallery image"));
    if (invalidGallery) {
      nextErrors.gallery = imageTypeError(invalidGallery.file, "Gallery image");
    }
    const invalidAmenity = amenityNew.find((file) => imageTypeError(file, "Amenity image"));
    if (invalidAmenity) {
      nextErrors.amenityImages = imageTypeError(invalidAmenity, "Amenity image");
    }
    const invalidFloor = floorPlans.find((plan) => imageTypeError(plan.file, "Floor plan image"));
    if (invalidFloor) {
      nextErrors.floorPlans = imageTypeError(invalidFloor.file, "Floor plan image");
    }
    return nextErrors;
  };

  const handleSubmit = async (e, nextStatus) => {
    e.preventDefault();
    setFormError("");
    const nextErrors = validateForm(nextStatus);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setLoading(false);
      return;
    }
    setErrors({});
    try {
      setLoading(true);
      const status = nextStatus || form.status;
      const [heroFile, ogFile, galleryFiles, amenityFiles] = await Promise.all([
        heroImage instanceof File ? compressImageFile(heroImage) : Promise.resolve(null),
        ogImage ? compressImageFile(ogImage) : Promise.resolve(null),
        Promise.all(galleryNew.map(async (item) => ({ ...item, file: await compressImageFile(item.file) }))),
        Promise.all(amenityNew.map((file) => compressImageFile(file))),
      ]);
      const compressedFloorPlans = await Promise.all(
        floorPlans.map(async (plan) =>
          plan.file ? { ...plan, file: await compressImageFile(plan.file) } : plan
        )
      );
      const payload = new FormData();
      Object.entries({
        ...form,
        status,
        featured: String(form.featured),
      }).forEach(([key, value]) => {
        if (
          [
            "highlights",
            "amenities",
            "nearbyLandmarks",
            "nearbySchools",
            "nearbyHospitals",
            "nearbyMetro",
            "nearbyHighways",
          ].includes(key)
        ) {
          return;
        }
        payload.append(key, value ?? "");
      });
      payload.set("videoUrl", toVideoEmbedUrl(form.videoUrl));
      payload.append("highlights", JSON.stringify(splitList(form.highlights)));
      payload.append("amenities", JSON.stringify(splitList(form.amenities)));
      payload.append(
        "nearby",
        JSON.stringify({
          landmarks: splitList(form.nearbyLandmarks),
          schools: splitList(form.nearbySchools),
          hospitals: splitList(form.nearbyHospitals),
          metro: splitList(form.nearbyMetro),
          highways: splitList(form.nearbyHighways),
        })
      );
      payload.append("existingGallery", JSON.stringify(galleryExisting));
      payload.append("existingAmenityImages", JSON.stringify(amenityExisting));
      payload.append(
        "floorPlans",
        JSON.stringify(
          compressedFloorPlans
            .filter((plan) => plan.configuration || plan.area || plan.price || plan.image || plan.file)
            .map(({ file, ...rest }) => ({
              ...rest,
              replaceImage: Boolean(file),
            }))
        )
      );
      if (heroFile instanceof File) payload.append("heroImage", heroFile);
      if (ogFile) payload.append("ogImage", ogFile);
      if (brochure) payload.append("brochure", brochure);
      galleryFiles.forEach((item) => {
        payload.append("galleryImages", item.file);
      });
      payload.append(
        "newGalleryCategories",
        JSON.stringify(galleryFiles.map((item) => item.category))
      );
      amenityFiles.forEach((file) => payload.append("amenityImages", file));
      compressedFloorPlans.forEach((plan) => {
        if (plan.file) payload.append("floorPlanImages", plan.file);
      });

      const response = await saveProject(payload, initialProject?.id);
      toast.success(response.message || "Project saved");
      router.push("/admindashboard/projects");
    } catch (error) {
      console.error(error);
      const { message, field, fieldErrors } = readApiError(error);
      const mapped = { ...fieldErrors };
      const mappedField = field || mapMessageToField(message);
      if (mappedField) mapped[mappedField] = message;
      setErrors(mapped);
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const sectionClass = "space-y-4 rounded-xl border border-green-100 bg-white p-5 shadow-sm";

  const seoPlaceholder = useMemo(() => {
    if (!form.name) return "";
    return `${form.name}${form.location ? ` ${form.location}` : ""} | Price, Floor Plans & Amenities`;
  }, [form.name, form.location]);

  return (
    <form className="space-y-8 max-w-5xl mx-auto pb-16" noValidate onSubmit={(e) => handleSubmit(e)}>
      <section className={sectionClass}>
        <h2 className="text-xl font-bold text-green-800">Basic Information</h2>
        <div>
          <input className={inputClass("name")} placeholder="Project Name*" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          <FieldError name="name" />
        </div>
        <div>
          <input
            className={inputClass("slug")}
            placeholder="Slug*"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", slugify(e.target.value));
            }}
          />
          <FieldError name="slug" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input className={inputClass("location")} placeholder="Location*" value={form.location} onChange={(e) => updateField("location", e.target.value)} />
            <FieldError name="location" />
          </div>
          <input className="input-field" placeholder="Developer" value={form.developer} onChange={(e) => updateField("developer", e.target.value)} />
        </div>
        <input className="input-field" placeholder="Short description / highlight" value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} />
        <textarea className="input-field h-28" placeholder="Full description" value={form.description} onChange={(e) => updateField("description", e.target.value)} />
        <div className="grid md:grid-cols-3 gap-4">
          <input className="input-field" placeholder="Project type (Residential)" value={form.projectType} onChange={(e) => updateField("projectType", e.target.value)} />
          <input className="input-field" placeholder="Possession / status" value={form.possession} onChange={(e) => updateField("possession", e.target.value)} />
          <input className="input-field" placeholder="Construction status" value={form.constructionStatus} onChange={(e) => updateField("constructionStatus", e.target.value)} />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-xl font-bold text-green-800">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input className="input-field" placeholder="Starting price e.g. ₹85 Lakh onwards" value={form.startingPrice} onChange={(e) => updateField("startingPrice", e.target.value)} />
          <input className="input-field" placeholder="Price range" value={form.priceRange} onChange={(e) => updateField("priceRange", e.target.value)} />
          <input className="input-field" placeholder="Configurations e.g. 2 & 3 BHK" value={form.configurations} onChange={(e) => updateField("configurations", e.target.value)} />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-xl font-bold text-green-800">Images & Brochure</h2>
        <label className="block text-sm font-medium text-gray-700">Hero image</label>
        {heroPreview && <img src={heroPreview} alt="Hero preview" className="h-40 w-full object-cover rounded-lg" />}
        <input
          type="file"
          accept="image/*"
          className={errors.heroImage ? "border border-red-500 rounded p-1" : ""}
          onChange={(e) => {
            const file = e.target.files?.[0];
            setHeroImage(file || null);
            if (file) setHeroPreview(URL.createObjectURL(file));
            setErrors((prev) => {
              const next = { ...prev };
              delete next.heroImage;
              return next;
            });
            setFormError("");
          }}
        />
        <FieldError name="heroImage" />
        <label className="block text-sm font-medium text-gray-700">OG image (optional)</label>
        <input
          type="file"
          accept="image/*"
          className={errors.ogImage ? "border border-red-500 rounded p-1" : ""}
          onChange={(e) => {
            setOgImage(e.target.files?.[0] || null);
            setErrors((prev) => {
              const next = { ...prev };
              delete next.ogImage;
              return next;
            });
            setFormError("");
          }}
        />
        <FieldError name="ogImage" />
        <label className="block text-sm font-medium text-gray-700">Project video link</label>
        <p className="text-xs text-gray-500 mb-1">Paste a YouTube or Vimeo URL. Do not upload a video file.</p>
        <input
          className="input-field"
          placeholder="https://www.youtube.com/watch?v=..."
          value={form.videoUrl}
          onChange={(e) => updateField("videoUrl", e.target.value)}
          onBlur={() => updateField("videoUrl", toVideoEmbedUrl(form.videoUrl) || form.videoUrl)}
        />
        <label className="block text-sm font-medium text-gray-700">Brochure PDF</label>
        <p className="text-xs text-gray-500">PDF up to 40 MB. Images are compressed automatically before upload.</p>
        {form.brochureUrl && (
          <a href={form.brochureUrl} target="_blank" rel="noreferrer" className="text-green-700 underline text-sm">Current brochure</a>
        )}
        {brochure && (
          <p className="text-sm text-gray-600">Selected: {brochure.name} ({formatBytes(brochure.size)})</p>
        )}
        <input
          type="file"
          accept="application/pdf"
          className={errors.brochure ? "border border-red-500 rounded p-1" : ""}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setBrochure(file);
            if (file && fileExt(file) !== "pdf") {
              setErrors((prev) => ({ ...prev, brochure: "Brochure must be a PDF file" }));
              return;
            }
            if (file && file.size > MAX_BROCHURE_BYTES) {
              setErrors((prev) => ({
                ...prev,
                brochure: `Brochure is ${formatBytes(file.size)}. Please use a PDF under 40 MB.`,
              }));
              return;
            }
            setErrors((prev) => {
              const next = { ...prev };
              delete next.brochure;
              return next;
            });
            setFormError("");
          }}
        />
        <FieldError name="brochure" />

        <div>
          <p className="font-medium mb-2">Gallery</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {galleryExisting.map((item, index) => (
              <div key={`${item.url}-${index}`} className="relative">
                <img src={item.url} alt="" className="h-24 w-full object-cover rounded" loading="lazy" />
                <button type="button" className="absolute top-1 right-1 bg-white rounded-full p-1" onClick={() => setGalleryExisting((prev) => prev.filter((_, i) => i !== index))}>
                  <Trash2 size={14} />
                </button>
                <p className="text-xs mt-1 capitalize">{item.category}</p>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className={errors.gallery ? "border border-red-500 rounded p-1" : ""}
            onChange={(e) => {
              const files = Array.from(e.target.files || []).map((file) => ({ file, category: "project" }));
              setGalleryNew((prev) => [...prev, ...files]);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.gallery;
                return next;
              });
              setFormError("");
            }}
          />
          <FieldError name="gallery" />
          {galleryNew.map((item, index) => (
            <div key={index} className="flex items-center gap-3 mt-2">
              <span className="text-sm truncate">{item.file.name}</span>
              <select
                className="input-field max-w-xs"
                value={item.category}
                onChange={(e) =>
                  setGalleryNew((prev) =>
                    prev.map((row, i) => (i === index ? { ...row, category: e.target.value } : row))
                  )
                }
              >
                <option value="project">Project / Exterior</option>
                <option value="interior">Interior</option>
                <option value="amenities">Amenities</option>
                <option value="construction">Construction</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
          ))}
        </div>

        <div>
          <p className="font-medium mb-2">Amenity images</p>
          <input
            type="file"
            accept="image/*"
            multiple
            className={errors.amenityImages ? "border border-red-500 rounded p-1" : ""}
            onChange={(e) => {
              setAmenityNew((prev) => [...prev, ...Array.from(e.target.files || [])]);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.amenityImages;
                return next;
              });
              setFormError("");
            }}
          />
          <FieldError name="amenityImages" />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-xl font-bold text-green-800">Highlights & Amenities</h2>
        <input className="input-field" placeholder="Highlights (comma separated)" value={form.highlights} onChange={(e) => updateField("highlights", e.target.value)} />
        <input className="input-field" placeholder="Amenities (comma separated)" value={form.amenities} onChange={(e) => updateField("amenities", e.target.value)} />
      </section>

      <section className={sectionClass}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-green-800">Floor Plans</h2>
          <button type="button" className="flex items-center gap-1 text-green-700" onClick={() => setFloorPlans((prev) => [...prev, { ...emptyFloorPlan }])}>
            <Plus size={16} /> Add
          </button>
        </div>
        {floorPlans.map((plan, index) => (
          <div key={index} className="grid md:grid-cols-4 gap-3 items-end border-b pb-4">
            <input className="input-field" placeholder="2 BHK" value={plan.configuration} onChange={(e) => setFloorPlans((prev) => prev.map((row, i) => i === index ? { ...row, configuration: e.target.value } : row))} />
            <input className="input-field" placeholder="Area" value={plan.area} onChange={(e) => setFloorPlans((prev) => prev.map((row, i) => i === index ? { ...row, area: e.target.value } : row))} />
            <input className="input-field" placeholder="Price" value={plan.price} onChange={(e) => setFloorPlans((prev) => prev.map((row, i) => i === index ? { ...row, price: e.target.value } : row))} />
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                className={errors.floorPlans ? "border border-red-500 rounded p-1" : ""}
                onChange={(e) => {
                  setFloorPlans((prev) => prev.map((row, i) => i === index ? { ...row, file: e.target.files?.[0], image: row.image } : row));
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.floorPlans;
                    return next;
                  });
                  setFormError("");
                }}
              />
              <button type="button" onClick={() => setFloorPlans((prev) => prev.filter((_, i) => i !== index))}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        <FieldError name="floorPlans" />
      </section>

      <section className={sectionClass}>
        <h2 className="text-xl font-bold text-green-800">Location</h2>
        <input className="input-field" placeholder="Address" value={form.address} onChange={(e) => updateField("address", e.target.value)} />
        <div className="grid md:grid-cols-3 gap-4">
          <input className="input-field" placeholder="Latitude" value={form.latitude} onChange={(e) => updateField("latitude", e.target.value)} />
          <input className="input-field" placeholder="Longitude" value={form.longitude} onChange={(e) => updateField("longitude", e.target.value)} />
          <input className="input-field" placeholder="Google Maps URL" value={form.mapsUrl} onChange={(e) => updateField("mapsUrl", e.target.value)} />
        </div>
        <input className="input-field" placeholder="Nearby landmarks (comma separated)" value={form.nearbyLandmarks} onChange={(e) => updateField("nearbyLandmarks", e.target.value)} />
        <input className="input-field" placeholder="Schools" value={form.nearbySchools} onChange={(e) => updateField("nearbySchools", e.target.value)} />
        <input className="input-field" placeholder="Hospitals" value={form.nearbyHospitals} onChange={(e) => updateField("nearbyHospitals", e.target.value)} />
        <input className="input-field" placeholder="Metro" value={form.nearbyMetro} onChange={(e) => updateField("nearbyMetro", e.target.value)} />
        <input className="input-field" placeholder="Highways / expressways" value={form.nearbyHighways} onChange={(e) => updateField("nearbyHighways", e.target.value)} />
      </section>

      <section className={sectionClass}>
        <h2 className="text-xl font-bold text-green-800">Legal, SEO & Publishing</h2>
        <input className="input-field" placeholder="RERA number" value={form.reraNumber} onChange={(e) => updateField("reraNumber", e.target.value)} />
        <textarea className="input-field h-20" placeholder="Registration / legal information" value={form.legalInfo} onChange={(e) => updateField("legalInfo", e.target.value)} />
        <input className="input-field" placeholder={seoPlaceholder || "SEO title"} value={form.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} />
        <textarea className="input-field h-20" placeholder="SEO description" value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} />
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <select className={inputClass("status")} value={form.status} onChange={(e) => updateField("status", e.target.value)}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <FieldError name="status" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} />
            Feature on homepage
          </label>
        </div>
      </section>

      {formError && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button disabled={loading} type="submit" className="bg-gray-800 text-white px-5 py-2 rounded-lg">
          {loading ? "Uploading..." : "Save"}
        </button>
        <button disabled={loading} type="button" onClick={(e) => handleSubmit(e, "DRAFT")} className="bg-amber-500 text-white px-5 py-2 rounded-lg">
          Save Draft
        </button>
        <button disabled={loading} type="button" onClick={(e) => handleSubmit(e, "PUBLISHED")} className="bg-green-600 text-white px-5 py-2 rounded-lg">
          Publish
        </button>
        {initialProject?.slug && (
          <button type="button" onClick={() => router.push(`/admindashboard/projects/${initialProject.id}/preview`)} className="border border-green-600 text-green-700 px-5 py-2 rounded-lg">
            Preview
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
