"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectEnquiry = ({ project, compact = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    configuration: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const configs = (project.floorPlans || [])
    .map((plan) => plan.configuration)
    .filter(Boolean);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiry`, {
        ...formData,
        projectId: project.id,
        source: "PROJECT_MICROSITE",
      });
      toast.success("Enquiry submitted. We will contact you shortly.");
      setFormData({ name: "", email: "", number: "", configuration: "", message: "" });
    } catch {
      toast.error("Unable to submit enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${compact ? "" : "bg-white rounded-2xl p-6 shadow-lg"}`}>
      {!compact && (
        <div>
          <h3 className="font-heading text-2xl text-green-800">Interested in this project?</h3>
          <p className="text-sm text-gray-500 mt-1">Share your details for a site visit or callback.</p>
        </div>
      )}
      <input required name="name" placeholder="Name" className="input-field" value={formData.name} onChange={handleChange} />
      <input required name="number" type="tel" placeholder="Phone" className="input-field" value={formData.number} onChange={handleChange} />
      <input required name="email" type="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} />
      {configs.length > 0 && (
        <select name="configuration" className="input-field" value={formData.configuration} onChange={handleChange}>
          <option value="">Select configuration</option>
          {configs.map((config) => (
            <option key={config} value={config}>{config}</option>
          ))}
        </select>
      )}
      <textarea required name="message" rows={3} placeholder="Message" className="input-field" value={formData.message} onChange={handleChange} />
      <button disabled={submitting} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
        {submitting ? "Sending..." : "Enquire Now"}
      </button>
    </form>
  );
};

export default ProjectEnquiry;
