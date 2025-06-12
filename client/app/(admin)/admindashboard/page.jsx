"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AdminProtect from "@/Component/AdminProtect";
import PropertyForm from "./_components/Propertyaddfrom";
const  AdminDashboard=()=> {
  const router = useRouter();

  const handleLogout = () => {
   
    localStorage.removeItem("adminToken");

    router.push("/adminlogin");
    toast.success("Logged Out Successfully");
  };

  return (
    <AdminProtect>
      
      <div className="p-5 flex items-center justify-between  shadow-md rounded-l overflow-hiddeng w-full">
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        {/* Action Buttons */}
        <div className="flex gap-x-4">
          {/* <button className="bg-green-600 text-white px-5 py-2 rounded-lg text-lg font-medium flex items-center gap-x-2 hover:bg-green-700 transition cursor-pointer">
            <span className="text-2xl">+</span> Create Property
          </button> */}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg text-lg font-medium hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

     <div className="p-10">
     <PropertyForm />
     </div>
    
    </AdminProtect>
  );
}

export default AdminDashboard;
