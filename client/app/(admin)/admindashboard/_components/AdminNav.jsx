"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();
  const links = [
    { href: "/admindashboard", label: "Properties" },
    { href: "/admindashboard/projects", label: "Projects" },
  ];

  return (
    <div className="flex flex-wrap gap-3 px-5 pb-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            pathname === link.href || (link.href !== "/admindashboard" && pathname?.startsWith(link.href))
              ? "bg-green-600 text-white"
              : "bg-green-50 text-green-800 hover:bg-green-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default AdminNav;
