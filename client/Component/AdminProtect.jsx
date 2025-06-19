"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminProtect = ({ children }) => {
  const router = useRouter();                  // using hifher order function to pretect the admin dashboard page yes
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = () => {
      const adminToken = localStorage.getItem("adminToken"); // 
      if (!adminToken) {
        router.replace("/adminlogin"); 
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin(); 

    // Listen for storage changes (admin login)
    window.addEventListener("storage", checkAdmin);

    return () => {
      window.removeEventListener("storage", checkAdmin);
    };
  }, [router]);

  if (isAdmin === null) return <p>Loading...</p>; 

  return <>{children}</>;
};

export default AdminProtect;
