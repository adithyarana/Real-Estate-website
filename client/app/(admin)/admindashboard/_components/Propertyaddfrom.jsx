"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PropertyForm = () => {
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
    thumbnail: null,
    thumbnailPreview: null,
    images: [],
    imagePreviews: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const baseurl = "http://localhost:4000/api/property";
  const router = useRouter();


     // the data is saved in local storage afte the page refresh
     // Loading saved data from localStorage
   
    useEffect(() => {
      const propertyData = localStorage.getItem("property");
      if (propertyData) {
        setProperty(JSON.parse(propertyData));
      }
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const timer = setTimeout(() => {
          localStorage.setItem("property", JSON.stringify(property));
        }, 200); // slight delay to avoid clashing with initial load
        return () => clearTimeout(timer);
      }
    }, [property]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Parse and validate JSON strings for amenities and tags
      let parsedTags = [];
      let parsedAmenities = [];

      try {
        parsedTags = property.tags ? JSON.parse(property.tags) : [];
        if (!Array.isArray(parsedTags)) throw new Error();
      } catch {
        setMessage(
          'Tags must be a valid JSON array (e.g. ["For Sale", "Urgent"])'
        );
        setLoading(false);
        return;
      }

      try {
        parsedAmenities = property.amenities
          ? JSON.parse(property.amenities)
          : [];
        if (!Array.isArray(parsedAmenities)) throw new Error();
      } catch {
        setMessage(
          'Amenities must be a valid JSON array (e.g. ["Gym", "Pool"])'
        );
        setLoading(false);
        return;
      }

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
      formData.append("thumbnail", property.thumbnail);
      formData.append("propertySubType", property.propertySubType);
      formData.append("virtualTourUrl", property.virtualTourUrl);
      for (let i = 0; i < property.images.length; i++) {
        formData.append("images", property.images[i]);
      }

   

      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMessage("Please login to add property");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${baseurl}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Property added successfully!");
      console.log(response.data);
      setLoading(false);
      localStorage.removeItem("property");
      router.push("/properties?type=All");
    } catch (err) {
      console.error("Add property error:", err);
      toast.error("Something went wrong while adding the property.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📝 Post New Property
      </h2>

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
            required
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
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
      >
        {loading ? "Posting plz wait..." : "📤 Post Property"}
      </button>

      {/* Message */}
      {message && <div className="text-sm text-red-600">{message}</div>}
    </form>
  );
};

export default PropertyForm;
