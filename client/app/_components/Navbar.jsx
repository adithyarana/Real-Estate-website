"use client";
import React, { useState } from "react";
import { Home, Menu, X, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // WhatsApp redirect function
  const redirectToWhatsApp = () => {
    window.open("https://wa.me/919718592809", "_blank");
  };

  return (
    <nav className="bg-gradient-to-b from-white to-green-50 shadow-lg sticky top-0 z-50 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 xl:max-w-full 2xl:px-12">
        <div className="flex justify-between h-20 items-center ">
          {/* Logo */}
          <Link href="/" className="flex items-center ">
            <Image
              src="/logo1.png"
              width={150}
              height={80}
              alt="Beautiful house"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden text-[15px] 2xl:text-xl font-medium md:flex text-nowrap  items-center space-x-8 ">
            <Link
              href="/properties"
              className={`${
                pathname === "/properties"
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600"
              } transition duration-150 ease-in-out`}
            >
              Search Properties
            </Link>

            <Link
              href="/aboutus"
              className={`${
                pathname === "/aboutus"
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600"
              } transition duration-150 ease-in-out`}
            >
          About us
            </Link>

            <Link
              href="/ourservices"
              className={`${
                pathname === "/ourservices"
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600"
              } transition duration-150 ease-in-out`}
            >
              Our Services
            </Link>

            <Link
              href="/contactus"
              className={`${
                pathname === "/contactus"
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600"
              } transition duration-150 ease-in-out`}
            >
              Contact Us
            </Link>

            <button
              onClick={redirectToWhatsApp}
              className="bg-emerald-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-emerald-700 transition duration-150 ease-in-out"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              WhatsApp Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-emerald-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all  ease-in-out duration-700 ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-4 pb-3 bg-gradient-to-b from-white to-green-50 shadow-lg ">
          <Link
            href="/properties"
            className={`block py-2 ${
              pathname === "/properties"
                ? "text-green-600 font-semibold"
                : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            Search Properties
          </Link>

          
          <Link
              href="/aboutus"
              className={`block py-2 ${
                pathname === "/aboutus"
                  ? "text-green-600 font-semibold"
                  : "text-gray-700 hover:text-emerald-600"
              } transition duration-150 ease-in-out `}
            >
          About us
            </Link> 

          <Link
            href="/ourservices"
            className={`block py-2 ${
              pathname === "/ourservices"
                ? "text-green-600 font-semibold"
                : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            Our Services
          </Link>

          <Link
            href="/contactus"
            className={`block py-2 ${
              pathname === "/contactus"
                ? "text-green-600 font-semibold"
                : "text-gray-700 hover:text-emerald-600"
            }`}
          >
            Contact Us
          </Link>

          

          <button
            onClick={redirectToWhatsApp}
            className="w-full mt-2 bg-emerald-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-emerald-700 transition duration-150 ease-in-out"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            WhatsApp Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
