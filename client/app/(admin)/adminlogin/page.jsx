"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield } from 'lucide-react';

const AdminLogin=()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Use Next.js router for navigation
  

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, 
        { email, password },
        { withCredentials: true } 
      );

      toast.success("Login Success!")
      localStorage.setItem("adminToken", res.data.token);
      console.log("Token received:", res.data.token);

    // Notify AdminProtect.js that storage has changed
    window.dispatchEvent(new Event("storage"));
    
      router.push("/admindashboard"); 
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error("Login Faild!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-indigo-50 p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-100 rounded-full">
            <Shield className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
        <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        <button
        type="submit"
        
          className="w-full py-2.5 px-4 text-white bg-green-500 rounded-lg font-medium cursor-pointer "
        >
            Sign in
        
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        Protected admin area. Unauthorized access is prohibited.
      </p>
    </div>
  </div>
  );
}

export default AdminLogin;
