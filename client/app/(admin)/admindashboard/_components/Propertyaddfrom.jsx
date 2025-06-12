"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Plus } from "lucide-react";

const PropertyForm = () => {
  const router = useRouter();
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    type: "",
    price: "",
    location: "",
    address: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    region: "",
    status: "Available",
    priorityLevel: "Normal",
    amenities: "[]",
    tags: "[]",
    additionalData: "",
    propertyType: "",
    propertySubType: "",
    virtualTourUrl: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
      setPropertyData((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    setPropertyData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    alert("Property added successfully!");
    setLoading(false);
   
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Post New Property</h2>

      {/* Title */}
      <input
        name="title"
        placeholder="Title*"
        required
        className="input-field"
        value={propertyData.title}
        onChange={(e) => setPropertyData({ ...propertyData, title: e.target.value })}
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description*"
        required
        className="input-field h-24"
        value={propertyData.description}
        onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
      />

      {/* Type Select */}
      <select
        name="type"
        required
        className="input-field"
        value={propertyData.type}
        onChange={(e) => setPropertyData({ ...propertyData, type: e.target.value })}
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
        value={propertyData.price}
        onChange={(e) => setPropertyData({ ...propertyData, price: e.target.value })}
      />
      <input
        name="location"
        placeholder='Location JSON e.g. {"lat": 28.6, "lng": 77.2}'
        className="input-field"
        value={propertyData.location}
        onChange={(e) => setPropertyData({ ...propertyData, location: e.target.value })}
      />
      <input
        name="address"
        placeholder="Address*"
        required
        className="input-field"
        value={propertyData.address}
        onChange={(e) => setPropertyData({ ...propertyData, address: e.target.value })}
      />
      <input
        name="area"
        placeholder="Area*"
        required
        className="input-field"
        value={propertyData.area}
        onChange={(e) => setPropertyData({ ...propertyData, area: e.target.value })}
      />
      <input
        name="bedrooms"
        type="number"
        placeholder="Bedrooms"
        className="input-field"
        value={propertyData.bedrooms}
        onChange={(e) => setPropertyData({ ...propertyData, bedrooms: e.target.value })}
      />
      <input
        name="bathrooms"
        type="number"
        placeholder="Bathrooms"
        className="input-field"
        value={propertyData.bathrooms}
        onChange={(e) => setPropertyData({ ...propertyData, bathrooms: e.target.value })}
      />
      <select
        name="region"
        placeholder="Region*"
        required
        className="input-field"
        value={propertyData.region}
        onChange={(e) => setPropertyData({ ...propertyData, region: e.target.value })}
      >
        <option value="">-- Select Region* --</option>
        <option value="DELHI">DELHI</option>
        <option value="GREATER NOIDA">GREATER_NOIDA</option>
        <option value="NOIDA">NOIDA</option>
      </select>
      <select
        name="status"
        required
        className="input-field"
        value={propertyData.status}
        onChange={(e) => setPropertyData({ ...propertyData, status: e.target.value })}
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
        value={propertyData.priorityLevel}
        onChange={(e) => setPropertyData({ ...propertyData, priorityLevel: e.target.value })}
      />
      <select
        name="propertyType"
        required
        className="input-field"
        value={propertyData.propertyType}
        onChange={(e) => setPropertyData({ ...propertyData, propertyType: e.target.value })}
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
        value={propertyData.propertySubType}
        onChange={(e) => setPropertyData({ ...propertyData, propertySubType: e.target.value })}
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
        value={propertyData.virtualTourUrl}
        onChange={(e) => setPropertyData({ ...propertyData, virtualTourUrl: e.target.value })}
      />
      <input
        name="amenities"
        placeholder='Amenities as JSON e.g. ["Pool","Gym"]'
        className="input-field"
        value={propertyData.amenities}
        onChange={(e) => setPropertyData({ ...propertyData, amenities: e.target.value })}
      />
      <input
        name="tags"
        placeholder='Tags as JSON e.g. ["For Sale","Urgent"]'
        className="input-field"
        value={propertyData.tags}
        onChange={(e) => setPropertyData({ ...propertyData, tags: e.target.value })}
      />
      <input
        name="additionalData"
        placeholder='Additional Data (optional JSON)'
        className="input-field"
        value={propertyData.additionalData}
        onChange={(e) => setPropertyData({ ...propertyData, additionalData: e.target.value })}
      />

      {/* Thumbnail Upload */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Thumbnail* (1 image)</label>
        <div className="upload-box">
          <label htmlFor="thumbnailUpload" className="upload-label">
            {thumbnailPreview ? (
              <img src={thumbnailPreview} alt="thumbnail" className="h-full object-cover rounded-lg" />
            ) : (
              <Plus className="h-6 w-6 text-gray-600" />
            )}
          </label>
          <input
            id="thumbnailUpload"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            required
            className="hidden"
          />
        </div>
      </div>

      {/* Images Upload */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Images (multiple)</label>
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
            onChange={handleImagesChange}
            className="hidden"
          />
          {imagePreviews.map((url, idx) => (
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
        {loading ? "Submitting..." : "📤 Post Property"}
      </button>

      {/* Message */}
      {message && <div className="text-sm text-red-600">{message}</div>}
    </form>
  );
};

export default PropertyForm;
