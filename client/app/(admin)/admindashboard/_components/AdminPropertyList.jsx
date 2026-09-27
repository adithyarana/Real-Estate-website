"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllProperties } from "@/Services/operations/Property";

const AdminPropertyList = ({ onEdit, refreshKey }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/api/property`;

  const load = async () => {
    setLoading(true);
    const data = await getAllProperties();
    setProperties(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [refreshKey]);

  const handleDelete = async (property) => {
    if (!window.confirm(`Delete property "${property.title}"? This cannot be undone.`)) {
      return;
    }
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${baseurl}/${property.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      toast.success("Property deleted");
      load();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete property");
    }
  };

  return (
    <div className="mb-10 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing Properties</h2>
      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-600">No properties found in the database.</p>
      ) : (
        <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
          <thead className="bg-green-50 text-left text-sm">
            <tr>
              <th className="p-3">Property</th>
              <th className="p-3">Code</th>
              <th className="p-3">Status</th>
              <th className="p-3">Region</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t text-sm">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {property.thumbnail && (
                      <img
                        src={property.thumbnail}
                        alt=""
                        className="h-12 w-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{property.title}</p>
                      <p className="text-gray-500">
                        {property.propertyType} {property.type ? `• ${property.type}` : ""}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{property.pCode}</td>
                <td className="p-3">{property.status}</td>
                <td className="p-3">{property.region}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(property)}
                      className="text-green-700 underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(property)}
                      className="text-red-600 underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPropertyList;
