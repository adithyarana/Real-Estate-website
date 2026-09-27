"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const SiteNavbar = () => {
  const pathname = usePathname();
  const isProjectMicrosite = /^\/projects\/[^/]+$/.test(pathname || "");

  if (isProjectMicrosite) return null;
  return <Navbar />;
};

export default SiteNavbar;
