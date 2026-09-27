"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminProtect from "@/Component/AdminProtect";
import PropertyForm from "./_components/Propertyaddfrom";
import AdminNav from "./_components/AdminNav";
import AdminPropertyList from "./_components/AdminPropertyList";

const AdminDashboard = () => {
  const router = useRouter();
  const [editProperty, setEditProperty] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/adminlogin");
    toast.success("Logged Out Successfully");
  };

  const handleSaved = () => {
    setEditProperty(null);
    setRefreshKey((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (property) => {
    setEditProperty(property);
    setTimeout(() => {
      document.getElementById("property-form")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <AdminProtect>
      <div className="p-5 flex items-center justify-between  shadow-md rounded-l overflow-hiddeng w-full">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg text-lg font-medium hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <AdminNav />

      <div className="p-10">
        <AdminPropertyList onEdit={handleEdit} refreshKey={refreshKey} />
        <div id="property-form">
          <PropertyForm
            key={editProperty?.id || "new"}
            editProperty={editProperty}
            onSuccess={handleSaved}
          />
        </div>
      </div>
    </AdminProtect>
  );
};

export default AdminDashboard;
