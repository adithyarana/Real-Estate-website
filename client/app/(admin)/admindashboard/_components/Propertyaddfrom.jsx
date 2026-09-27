"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const toJsonArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value || (typeof value === "string" && !value.trim())) return [];
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const PropertyForm = ({ editProperty = null, onSuccess }) => {
  const [property, setProperty] = useState({
    title: "",
    description: "",
    type: "",
    price: "",
    location: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    area: "",
    status: "",
    priorityLevel: "",
    region: "",
    additionalData: "",
    amenities: "",
    tags: "",
    virtualTourUrl: "",
    propertySubType: "",
    projectId: "",
    thumbnail: null,
    thumbnailPreview: null,
    images: [],
    imagePreviews: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [projects, setProjects] = useState([]);

  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/api/property`;
  const router = useRouter();


     // the data is saved in local storage afte the page refresh
     // Loading saved data from localStorage
   
    useEffect(() => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/project/admin/all`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setProjects(res.data.data || []))
          .catch(() => {});
      }
      if (editProperty) return;
      const propertyData = localStorage.getItem("property");
      if (propertyData) {
        try {
          const parsed = JSON.parse(propertyData);
          setProperty((prev) => ({
            ...prev,
            ...parsed,
            thumbnail: null,
            images: [],
            thumbnailPreview: null,
            imagePreviews: [],
          }));
        } catch {
          /* ignore bad local draft */
        }
      }
    }, []);

    useEffect(() => {
      if (!editProperty) return;
      setProperty({
        title: editProperty.title || "",
        description: editProperty.description || "",
        type: editProperty.type || "",
        price: editProperty.price || "",
        location:
          typeof editProperty.location === "string"
            ? editProperty.location
            : JSON.stringify(editProperty.location || {}),
        address: editProperty.address || "",
        bedrooms: editProperty.bedrooms ?? "",
        bathrooms: editProperty.bathrooms ?? "",
        propertyType: editProperty.propertyType || "",
        area: editProperty.area || "",
        status: editProperty.status || "",
        priorityLevel: editProperty.priorityLevel ?? "",
        region: editProperty.region || "",
        additionalData:
          editProperty.additionalData == null
            ? ""
            : typeof editProperty.additionalData === "string"
            ? editProperty.additionalData
            : JSON.stringify(editProperty.additionalData),
        amenities: Array.isArray(editProperty.amenities)
          ? JSON.stringify(editProperty.amenities)
          : editProperty.amenities || "",
        tags: Array.isArray(editProperty.tags)
          ? JSON.stringify(editProperty.tags)
          : editProperty.tags || "",
        virtualTourUrl: editProperty.virtualTourUrl || "",
        propertySubType: editProperty.propertySubType || "",
        projectId: editProperty.projectId || "",
        thumbnail: null,
        thumbnailPreview: editProperty.thumbnail || null,
        images: [],
        imagePreviews: editProperty.images || [],
        existingImages: editProperty.images || [],
      });
    }, [editProperty]);

    useEffect(() => {
      if (typeof window !== "undefined" && !editProperty) {
        const timer = setTimeout(() => {
          const { thumbnail, images, imagePreviews, ...rest } = property;
          localStorage.setItem("property", JSON.stringify(rest));
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [property, editProperty]);



  const validateAddForm = () => {
    const errors = {};
    if (!String(property.title || "").trim()) errors.title = "Property title is required.";
    if (!String(property.description || "").trim()) errors.description = "Description is required.";
    if (!property.type) errors.type = "Type is required.";
    if (!String(property.address || "").trim()) errors.address = "Address is required.";
    if (!String(property.area || "").trim()) errors.area = "Area is required.";
    if (!property.region) errors.region = "Region is required.";
    if (!property.status) errors.status = "Status is required.";
    if (!property.propertyType) errors.propertyType = "Property type is required.";
    if (!property.propertySubType) errors.propertySubType = "Property sub-type is required.";
    if (!(property.thumbnail instanceof File)) errors.thumbnail = "Thumbnail image is required.";
    if ((property.images || []).length > 5) errors.images = "You can upload up to 5 images.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editProperty) {
      const errors = validateAddForm();
      setFieldErrors(errors);
      setSuccessMessage("");
      setMessage("");
      if (Object.keys(errors).length) {
        return;
      }
    }

    try {
      setLoading(true);

      const parsedTags = toJsonArray(property.tags);
      const parsedAmenities = toJsonArray(property.amenities);

      const formData = new FormData();
      formData.append("title", property.title);
      formData.append("description", property.description);
      formData.append("type", property.type);
      formData.append("price", property.price);
      formData.append("location", property.location);
      formData.append("address", property.address);
      formData.append("bedrooms", parseInt(property.bedrooms));
      formData.append("bathrooms", parseInt(property.bathrooms));
      formData.append("propertyType", property.propertyType);
      formData.append("area", property.area);
      formData.append("status", property.status);
      formData.append("priorityLevel", property.priorityLevel);
      formData.append("region", property.region);
      formData.append("additionalData", property.additionalData);
      formData.append("amenities", JSON.stringify(parsedAmenities));
      formData.append("tags", JSON.stringify(parsedTags));
      if (property.thumbnail instanceof File) {
        formData.append("thumbnail", property.thumbnail);
      }
      formData.append("propertySubType", property.propertySubType);
      formData.append("virtualTourUrl", property.virtualTourUrl);
      if (property.projectId) {
        formData.append("projectId", property.projectId);
      }
      if (editProperty) {
        formData.append(
          "existingImages",
          JSON.stringify(property.existingImages || [])
        );
      }
      for (let i = 0; i < property.images.length; i++) {
        if (property.images[i] instanceof File) {
          formData.append("images", property.images[i]);
        }
      }

      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMessage("Please login to add property");
        setLoading(false);
        return;
      }

      if (editProperty?.id) {
        await axios.put(`${baseurl}/${editProperty.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Property updated successfully!");
      } else {
        if (!(property.thumbnail instanceof File)) {
          setMessage("Thumbnail image is required");
          setLoading(false);
          return;
        }
        await axios.post(`${baseurl}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem("property");
        setFieldErrors({});
        setMessage("");
        setSuccessMessage("Property created successfully");
        setProperty((prev) => ({
          ...prev,
          title: "",
          description: "",
          type: "",
          price: "",
          location: "",
          address: "",
          bedrooms: "",
          bathrooms: "",
          propertyType: "",
          area: "",
          status: "",
          priorityLevel: "",
          region: "",
          additionalData: "",
          amenities: "",
          tags: "",
          virtualTourUrl: "",
          propertySubType: "",
          projectId: "",
          thumbnail: null,
          thumbnailPreview: null,
          images: [],
          imagePreviews: [],
        }));
      }
      setLoading(false);
      if (onSuccess) onSuccess();
      else router.push("/properties?type=All");
    } catch (err) {
      console.error("Add property error:", err);
      setLoading(false);
      if (!editProperty) {
        const backendMessage = err.response?.data?.message;
        setSuccessMessage("");
        setMessage(
          backendMessage
            ? `Unable to create property. ${backendMessage}`
            : "Unable to create property"
        );
        return;
      }
      toast.error("Something went wrong while adding the property.");
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";
  const FieldError = ({ name }) =>
    !editProperty && fieldErrors[name] ? (
      <p className="mt-1 text-sm text-red-600">🔴 {fieldErrors[name]}</p>
    ) : null;
  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
  const hintClass = "mt-1 text-xs text-gray-500";
  const sectionClass =
    "rounded-2xl border border-green-100 bg-white p-5 sm:p-6 shadow-sm space-y-4";

  const projectSelect = (
    <select
      name="projectId"
      className={editProperty ? "input-field" : fieldClass}
      value={property.projectId || ""}
      onChange={(e) => setProperty({ ...property, projectId: e.target.value })}
    >
      <option value="">-- Optional: Link to Project --</option>
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>
  );

  const titleInput = (
    <input
      name="title"
      placeholder="Title*"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.title}
      onChange={(e) => setProperty({ ...property, title: e.target.value })}
    />
  );

  const descriptionInput = (
    <textarea
      name="description"
      placeholder="Description*"
      required
      className={editProperty ? "input-field h-24" : `${fieldClass} min-h-28 resize-y`}
      value={property.description}
      onChange={(e) =>
        setProperty({ ...property, description: e.target.value })
      }
    />
  );

  const typeSelect = (
    <select
      name="type"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.type}
      onChange={(e) => setProperty({ ...property, type: e.target.value })}
    >
      <option value="">-- Select Type* --</option>
      <option value="SALE">SALE</option>
      <option value="LEASE">LEASE</option>
      <option value="PRE_LEASED">PRE_LEASED</option>
    </select>
  );

  const priceInput = (
    <input
      name="price"
      placeholder="Price"
      className={editProperty ? "input-field" : fieldClass}
      value={property.price}
      onChange={(e) => setProperty({ ...property, price: e.target.value })}
    />
  );

  const locationInput = (
    <input
      name="location"
      placeholder='Location JSON e.g. {"lat": 28.6, "lng": 77.2}'
      className={editProperty ? "input-field" : fieldClass}
      value={property.location}
      onChange={(e) => setProperty({ ...property, location: e.target.value })}
    />
  );

  const addressInput = (
    <input
      name="address"
      placeholder="Address*"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.address}
      onChange={(e) => setProperty({ ...property, address: e.target.value })}
    />
  );

  const areaInput = (
    <input
      name="area"
      placeholder="Area*"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.area}
      onChange={(e) => setProperty({ ...property, area: e.target.value })}
    />
  );

  const bedroomsInput = (
    <input
      name="bedrooms"
      type="number"
      placeholder="Bedrooms"
      className={editProperty ? "input-field" : fieldClass}
      value={property.bedrooms}
      onChange={(e) => setProperty({ ...property, bedrooms: e.target.value })}
    />
  );

  const bathroomsInput = (
    <input
      name="bathrooms"
      type="number"
      placeholder="Bathrooms"
      className={editProperty ? "input-field" : fieldClass}
      value={property.bathrooms}
      onChange={(e) =>
        setProperty({ ...property, bathrooms: e.target.value })
      }
    />
  );

  const regionSelect = (
    <select
      name="region"
      placeholder="Region*"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.region}
      onChange={(e) => setProperty({ ...property, region: e.target.value })}
    >
      <option value="">-- Select Region* --</option>
      <option value="DELHI">DELHI</option>
      <option value="GREATER_NOIDA">GREATER_NOIDA</option>
      <option value="NOIDA">NOIDA</option>
    </select>
  );

  const statusSelect = (
    <select
      name="status"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.status}
      onChange={(e) => setProperty({ ...property, status: e.target.value })}
    >
      <option value="">-- Select Status* --</option>
      <option value="AVAILABLE">AVAILABLE</option>
      <option value="SOLD">SOLD</option>
      <option value="RENTED">RENTED</option>
      <option value="PENDING">PENDING</option>
    </select>
  );

  const priorityInput = (
    <input
      name="priorityLevel"
      type="number"
      placeholder="Priority Level"
      className={editProperty ? "input-field" : fieldClass}
      value={property.priorityLevel}
      onChange={(e) =>
        setProperty({ ...property, priorityLevel: Number(e.target.value) })
      }
    />
  );

  const propertyTypeSelect = (
    <select
      name="propertyType"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.propertyType}
      onChange={(e) =>
        setProperty({ ...property, propertyType: e.target.value })
      }
    >
      <option value="">-- Select Property Type* --</option>
      <option value="COMMERCIAL">COMMERCIAL</option>
      <option value="INDUSTRIAL">INDUSTRIAL</option>
      <option value="INSTITUTIONAL">INSTITUTIONAL</option>
      <option value="RESIDENTIAL">RESIDENTIAL</option>
    </select>
  );

  const propertySubTypeSelect = (
    <select
      name="propertySubType"
      required
      className={editProperty ? "input-field" : fieldClass}
      value={property.propertySubType}
      onChange={(e) =>
        setProperty({ ...property, propertySubType: e.target.value })
      }
    >
      <option value="">-- Select Property Sub-Type* --</option>
      <option value="PLOT">PLOT</option>
      <option value="SHED">SHED</option>
      <option value="FACTORY">FACTORY</option>
      <option value="WAREHOUSE">WAREHOUSE</option>
      <option value="OFFICE">OFFICE</option>
      <option value="SHOP">SHOP</option>
      <option value="SHOWROOM">SHOWROOM</option>
      <option value="BUSSINESS_CENTER">BUSSINESS_CENTER</option>
      <option value="LAND">LAND</option>
      <option value="HOTEL">HOTEL</option>
      <option value="CORPORATE_PLOT">CORPORATE_PLOT</option>
      <option value="CORPORATE_BUILDING">CORPORATE_BUILDING</option>
      <option value="COLLEGE_PLOT">COLLEGE_PLOT</option>
      <option value="SCHOOL_PLOT">SCHOOL_PLOT</option>
      <option value="HOSPITAL_BUILDING">HOSPITAL_BUILDING</option>
      <option value="HOSPITAL_PLOT">HOSPITAL_PLOT</option>
      <option value="OFFICE_IT">OFFICE_IT</option>
      <option value="BUILDING">BUILDING</option>
      <option value="IT_PLOT">IT_PLOT</option>
      <option value="IT_BUILDING">IT_BUILDING</option>
      <option value="BANQUET_HALL">BANQUET_HALL</option>
      <option value="APARTMENT">APARTMENT</option>
      <option value="VILLA">VILLA</option>
      <option value="KOTHI">KOTHI</option>
      <option value="HOUSE">HOUSE</option>
      <option value="BUILDER_FLOOR_APARTMENT">BUILDER_FLOOR_APARTMENT</option>
      <option value="FARM_HOUSE">FARM_HOUSE</option>
    </select>
  );

  const virtualTourInput = (
    <input
      name="virtualTourUrl"
      placeholder="Virtual Tour URL"
      className={editProperty ? "input-field" : fieldClass}
      value={property.virtualTourUrl}
      onChange={(e) =>
        setProperty({ ...property, virtualTourUrl: e.target.value })
      }
    />
  );

  const amenitiesInput = (
    <input
      name="amenities"
      placeholder='Amenities as JSON e.g. ["Pool","Gym"]'
      className={editProperty ? "input-field" : fieldClass}
      value={property.amenities}
      onChange={(e) =>
        setProperty({ ...property, amenities: e.target.value })
      }
    />
  );

  const tagsInput = (
    <input
      name="tags"
      placeholder='Tags as JSON e.g. ["For Sale","Urgent"]'
      className={editProperty ? "input-field" : fieldClass}
      value={property.tags}
      onChange={(e) => setProperty({ ...property, tags: e.target.value })}
    />
  );

  const additionalDataInput = (
    <input
      name="additionalData"
      placeholder="Additional Data (optional JSON)"
      className={editProperty ? "input-field" : fieldClass}
      value={property.additionalData}
      onChange={(e) =>
        setProperty({ ...property, additionalData: e.target.value })
      }
    />
  );

  const thumbnailUpload = (
    <div>
      <label className="block font-medium text-gray-700 mb-1">
        Thumbnail* (1 image)
      </label>
      <div className={editProperty ? "upload-box" : `relative h-44 w-full max-w-xs overflow-hidden rounded-xl border-2 border-dashed ${fieldErrors.thumbnail && !editProperty ? "border-red-400 bg-red-50" : "border-green-200 bg-green-50/50 hover:bg-green-50"} cursor-pointer`}>
        <label htmlFor="thumbnailUpload" className={editProperty ? "upload-label" : "flex h-full w-full items-center justify-center"}>
          {property.thumbnailPreview ? (
            <img
              src={property.thumbnailPreview}
              alt="thumbnail"
              className={editProperty ? "h-full object-cover rounded-lg" : "h-full w-full object-cover"}
            />
          ) : (
            <span className="flex flex-col items-center gap-2 text-green-700">
              <Plus className="h-6 w-6 text-gray-600" />
              {!editProperty && <span className="text-xs font-medium">Click to upload cover image</span>}
            </span>
          )}
        </label>
        <input
          id="thumbnailUpload"
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setProperty((prev) => ({
                  ...prev,
                  thumbnail: file,
                  thumbnailPreview: reader.result,
                }));
              };
              reader.readAsDataURL(file);
            }
          }}
          required={false}
          className="hidden"
        />
      </div>
    </div>
  );

  const imagesUpload = (
    <div>
      <label className="block font-medium text-gray-700 mb-1">
        Images (multiple)
      </label>
      <div className="flex gap-4 flex-wrap">
        <label htmlFor="imagesUpload" className={editProperty ? "upload-box w-32 h-32" : "flex h-32 w-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-green-200 bg-green-50/50 hover:bg-green-50"}>
          <Plus className="h-6 w-6 text-gray-600" />
        </label>
        <input
          id="imagesUpload"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
              const previews = files.map((file) => URL.createObjectURL(file));
              setProperty((prev) => ({
                ...prev,
                images: files,
                imagePreviews: previews,
              }));
            }
          }}
          className="hidden"
        />
        {property.imagePreviews?.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`preview-${idx}`}
            className="w-32 h-32 object-cover rounded-lg border"
          />
        ))}
      </div>
    </div>
  );

  if (editProperty) {
    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ✏️ Edit Property
      </h2>

      <select
        name="projectId"
        className="input-field"
        value={property.projectId || ""}
        onChange={(e) => setProperty({ ...property, projectId: e.target.value })}
      >
        <option value="">-- Optional: Link to Project --</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      {/* Title */}
      <input
        name="title"
        placeholder="Title*"
        required
        className="input-field"
        value={property.title}
        onChange={(e) => setProperty({ ...property, title: e.target.value })}
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description*"
        required
        className="input-field h-24"
        value={property.description}
        onChange={(e) =>
          setProperty({ ...property, description: e.target.value })
        }
      />

      {/* Type Select */}
      <select
        name="type"
        required
        className="input-field"
        value={property.type}
        onChange={(e) => setProperty({ ...property, type: e.target.value })}
      >
        <option value="">-- Select Type* --</option>
        <option value="SALE">SALE</option>
        <option value="LEASE">LEASE</option>
        <option value="PRE_LEASED">PRE_LEASED</option>
      </select>

      {/* Other Inputs */}
      <input
        name="price"
        placeholder="Price"
        className="input-field"
        value={property.price}
        onChange={(e) => setProperty({ ...property, price: e.target.value })}
      />
      <input
        name="location"
        placeholder='Location JSON e.g. {"lat": 28.6, "lng": 77.2}'
        className="input-field"
        value={property.location}
        onChange={(e) => setProperty({ ...property, location: e.target.value })}
      />
      <input
        name="address"
        placeholder="Address*"
        required
        className="input-field"
        value={property.address}
        onChange={(e) => setProperty({ ...property, address: e.target.value })}
      />
      <input
        name="area"
        placeholder="Area*"
        required
        className="input-field"
        value={property.area}
        onChange={(e) => setProperty({ ...property, area: e.target.value })}
      />
      <input
        name="bedrooms"
        type="number"
        placeholder="Bedrooms"
        className="input-field"
        value={property.bedrooms}
        onChange={(e) => setProperty({ ...property, bedrooms: e.target.value })}
      />
      <input
        name="bathrooms"
        type="number"
        placeholder="Bathrooms"
        className="input-field"
        value={property.bathrooms}
        onChange={(e) =>
          setProperty({ ...property, bathrooms: e.target.value })
        }
      />
      <select
        name="region"
        placeholder="Region*"
        required
        className="input-field"
        value={property.region}
        onChange={(e) => setProperty({ ...property, region: e.target.value })}
      >
        <option value="">-- Select Region* --</option>
        <option value="DELHI">DELHI</option>
        <option value="GREATER_NOIDA">GREATER_NOIDA</option>
        <option value="NOIDA">NOIDA</option>
      </select>
      <select
        name="status"
        required
        className="input-field"
        value={property.status}
        onChange={(e) => setProperty({ ...property, status: e.target.value })}
      >
        <option value="">-- Select Status* --</option>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="SOLD">SOLD</option>
        <option value="RENTED">RENTED</option>
        <option value="PENDING">PENDING</option>
      </select>
      <input
        name="priorityLevel"
        type="number"
        placeholder="Priority Level"
        className="input-field"
        value={property.priorityLevel}
        onChange={(e) =>
          setProperty({ ...property, priorityLevel: Number(e.target.value) })
        }
      />
      <select
        name="propertyType"
        required
        className="input-field"
        value={property.propertyType}
        onChange={(e) =>
          setProperty({ ...property, propertyType: e.target.value })
        }
      >
        <option value="">-- Select Property Type* --</option>
        <option value="COMMERCIAL">COMMERCIAL</option>
        <option value="INDUSTRIAL">INDUSTRIAL</option>
        <option value="INSTITUTIONAL">INSTITUTIONAL</option>
        <option value="RESIDENTIAL">RESIDENTIAL</option>
      </select>
      <select
        name="propertySubType"
        required
        className="input-field"
        value={property.propertySubType}
        onChange={(e) =>
          setProperty({ ...property, propertySubType: e.target.value })
        }
      >
        <option value="">-- Select Property Sub-Type* --</option>
        <option value="PLOT">PLOT</option>
        <option value="SHED">SHED</option>
        <option value="FACTORY">FACTORY</option>
        <option value="WAREHOUSE">WAREHOUSE</option>
        <option value="OFFICE">OFFICE</option>
        <option value="SHOP">SHOP</option>
        <option value="SHOWROOM">SHOWROOM</option>
        <option value="BUSSINESS_CENTER">BUSSINESS_CENTER</option>
        <option value="LAND">LAND</option>
        <option value="HOTEL">HOTEL</option>
        <option value="CORPORATE_PLOT">CORPORATE_PLOT</option>
        <option value="CORPORATE_BUILDING">CORPORATE_BUILDING</option>
        <option value="COLLEGE_PLOT">COLLEGE_PLOT</option>
        <option value="SCHOOL_PLOT">SCHOOL_PLOT</option>
        <option value="HOSPITAL_BUILDING">HOSPITAL_BUILDING</option>
        <option value="HOSPITAL_PLOT">HOSPITAL_PLOT</option>
        <option value="OFFICE_IT">OFFICE_IT</option>
        <option value="BUILDING">BUILDING</option>
        <option value="IT_PLOT">IT_PLOT</option>
        <option value="IT_BUILDING">IT_BUILDING</option>
        <option value="BANQUET_HALL">BANQUET_HALL</option>
        <option value="APARTMENT">APARTMENT</option>
        <option value="VILLA">VILLA</option>
        <option value="KOTHI">KOTHI</option>
        <option value="HOUSE">HOUSE</option>
        <option value="BUILDER_FLOOR_APARTMENT">BUILDER_FLOOR_APARTMENT</option>
        <option value="FARM_HOUSE">FARM_HOUSE</option>
      </select>
      <input
        name="virtualTourUrl"
        placeholder="Virtual Tour URL"
        className="input-field"
        value={property.virtualTourUrl}
        onChange={(e) =>
          setProperty({ ...property, virtualTourUrl: e.target.value })
        }
      />
      <input
        name="amenities"
        placeholder='Amenities as JSON e.g. ["Pool","Gym"]'
        className="input-field"
        value={property.amenities}
        onChange={(e) =>
          setProperty({ ...property, amenities: e.target.value })
        }
      />
      <input
        name="tags"
        placeholder='Tags as JSON e.g. ["For Sale","Urgent"]'
        className="input-field"
        value={property.tags}
        onChange={(e) => setProperty({ ...property, tags: e.target.value })}
      />
      <input
        name="additionalData"
        placeholder="Additional Data (optional JSON)"
        className="input-field"
        value={property.additionalData}
        onChange={(e) =>
          setProperty({ ...property, additionalData: e.target.value })
        }
      />

      {/* Thumbnail Upload */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Thumbnail* (1 image)
        </label>
        <div className="upload-box">
          <label htmlFor="thumbnailUpload" className="upload-label">
            {property.thumbnailPreview ? (
              <img
                src={property.thumbnailPreview}
                alt="thumbnail"
                className="h-full object-cover rounded-lg"
              />
            ) : (
              <Plus className="h-6 w-6 text-gray-600" />
            )}
          </label>
          <input
            id="thumbnailUpload"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProperty((prev) => ({
                    ...prev,
                    thumbnail: file,
                    thumbnailPreview: reader.result,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
            required={!editProperty}
            className="hidden"
          />
        </div>
      </div>

      {/* Images Upload */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Images (multiple)
        </label>
        <div className="flex gap-4 flex-wrap">
          <label htmlFor="imagesUpload" className="upload-box w-32 h-32">
            <Plus className="h-6 w-6 text-gray-600" />
          </label>
          <input
            id="imagesUpload"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              if (files.length > 0) {
                const previews = files.map((file) => URL.createObjectURL(file));
                setProperty((prev) => ({
                  ...prev,
                  images: files,
                  imagePreviews: previews,
                }));
              }
            }}
            className="hidden"
          />
          {property.imagePreviews?.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`preview-${idx}`}
              className="w-32 h-32 object-cover rounded-lg border"
            />
            
          ))}

          
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
      >
        {loading
          ? "Saving plz wait..."
          : editProperty
          ? "💾 Update Property"
          : "📤 Post Property"}
      </button>
      {editProperty && (
        <button
          type="button"
          onClick={() => onSuccess && onSuccess()}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg"
        >
          Cancel
        </button>
      )}
      </div>

      {/* Message */}
      {message && <div className="text-sm text-red-600">{message}</div>}
    </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-4xl space-y-6 pb-8"
    >
      <div className="rounded-2xl bg-gradient-to-r from-green-700 to-emerald-600 px-5 py-6 text-white shadow-md sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-100">Admin</p>
        <h2 className="mt-1 font-heading text-2xl font-bold sm:text-3xl">Post New Property</h2>
        <p className="mt-2 max-w-2xl text-sm text-green-50">
          Fill in the sections below. Fields marked * are required. Your draft is saved in this browser until you submit.
        </p>
      </div>

      {successMessage && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          ✓ {successMessage}
        </div>
      )}
      {message && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          🔴 {message}
        </div>
      )}

      <section className={sectionClass}>
        <div>
          <h3 className="font-heading text-lg font-semibold text-green-800">Basic Information</h3>
          <p className="text-xs text-gray-500">Name, listing type and how this property is classified.</p>
        </div>
        <div>
          <label className={labelClass}>Link to Project</label>
          {projectSelect}
          <p className={hintClass}>Optional. Leave blank if this listing is not tied to a project microsite.</p>
        </div>
        <div>
          <label className={labelClass}>Title <span className="text-red-500">*</span></label>
          {titleInput}
          <FieldError name="title" />
        </div>
        <div>
          <label className={labelClass}>Description <span className="text-red-500">*</span></label>
          {descriptionInput}
          <FieldError name="description" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Type <span className="text-red-500">*</span></label>
            {typeSelect}
            <FieldError name="type" />
          </div>
          <div>
            <label className={labelClass}>Status <span className="text-red-500">*</span></label>
            {statusSelect}
            <FieldError name="status" />
          </div>
          <div>
            <label className={labelClass}>Property Type <span className="text-red-500">*</span></label>
            {propertyTypeSelect}
            <FieldError name="propertyType" />
          </div>
          <div>
            <label className={labelClass}>Property Sub-Type <span className="text-red-500">*</span></label>
            {propertySubTypeSelect}
            <FieldError name="propertySubType" />
          </div>
        </div>
        <div className="max-w-xs">
          <label className={labelClass}>Priority Level</label>
          {priorityInput}
          <p className={hintClass}>Higher numbers appear first in listings.</p>
        </div>
      </section>

      <section className={sectionClass}>
        <div>
          <h3 className="font-heading text-lg font-semibold text-green-800">Location</h3>
          <p className="text-xs text-gray-500">Where the property sits on the map and on the listing card.</p>
        </div>
        <div>
          <label className={labelClass}>Region <span className="text-red-500">*</span></label>
          {regionSelect}
          <FieldError name="region" />
        </div>
        <div>
          <label className={labelClass}>Address <span className="text-red-500">*</span></label>
          {addressInput}
          <FieldError name="address" />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          {locationInput}
          <p className={hintClass}>Use JSON coordinates, for example {`{"lat": 28.6, "lng": 77.2}`}</p>
        </div>
      </section>

      <section className={sectionClass}>
        <div>
          <h3 className="font-heading text-lg font-semibold text-green-800">Pricing</h3>
          <p className="text-xs text-gray-500">Ask price and built-up / plot area as shown on the website.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Price</label>
            {priceInput}
          </div>
          <div>
            <label className={labelClass}>Area <span className="text-red-500">*</span></label>
            {areaInput}
            <FieldError name="area" />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div>
          <h3 className="font-heading text-lg font-semibold text-green-800">Property Details</h3>
          <p className="text-xs text-gray-500">Layout, amenities and extra listing metadata.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Bedrooms</label>
            {bedroomsInput}
          </div>
          <div>
            <label className={labelClass}>Bathrooms</label>
            {bathroomsInput}
          </div>
        </div>
        <div>
          <label className={labelClass}>Virtual Tour URL</label>
          {virtualTourInput}
        </div>
        <div>
          <label className={labelClass}>Amenities</label>
          {amenitiesInput}
          <p className={hintClass}>JSON array or comma-separated, e.g. ["Pool","Gym"]</p>
        </div>
        <div>
          <label className={labelClass}>Tags</label>
          {tagsInput}
          <p className={hintClass}>JSON array or comma-separated, e.g. ["For Sale","Urgent"]</p>
        </div>
      </section>

      <section className={sectionClass}>
        <div>
          <h3 className="font-heading text-lg font-semibold text-green-800">Images</h3>
          <p className="text-xs text-gray-500">Thumbnail is required. Gallery images are optional.</p>
        </div>
        {thumbnailUpload}
        <FieldError name="thumbnail" />
        {property.thumbnail instanceof File && (
          <p className="text-xs text-green-700">Selected: {property.thumbnail.name}</p>
        )}
        {imagesUpload}
        <FieldError name="images" />
        {property.images?.length > 0 && (
          <p className="text-xs text-gray-500">{property.images.length} gallery image(s) selected</p>
        )}
      </section>

      <section className={sectionClass}>
        <div>
          <h3 className="font-heading text-lg font-semibold text-green-800">Additional Details</h3>
          <p className="text-xs text-gray-500">Optional extra JSON stored with the listing.</p>
        </div>
        <div>
          <label className={labelClass}>Additional Data</label>
          {additionalDataInput}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-600 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {loading ? "Creating Property..." : "Post Property"}
        </button>
        <p className="text-xs text-gray-500">Required fields must be filled before submit.</p>
      </div>
    </form>
  );
};

export default PropertyForm;
