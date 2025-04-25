"use client";
import {
  MapPin,
  Square,
  ArrowUpRightFromSquare,
  X,
  Axis3D,
} from "lucide-react";
import { useEffect, useState } from "react";
import Enquirennow from "./Enquirennow";
import Link from "next/link";
import axios from "axios";

const propertyData = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    price: 2500000,
    location: "Beverly Hills, CA",
    area: "5,200 sq ft",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 2,
    title: "Oceanfront Residence",
    price: 3200000,
    location: "Malibu, CA",
    area: "4,800 sq ft",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 3,
    title: "Contemporary Downtown Penthouse",
    price: 1850000,
    location: "Los Angeles, CA",
    area: "3,600 sq ft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 4,
    title: "Contemporary Downtown Penthouse",
    price: 1850000,
    location: "Los Angeles, CA",
    area: "3,600 sq ft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500&h=400",
  },
  // Add more as needed
];

const PropertyCard = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  // const [property, setproperty] = useState([]); // to update the data

  // fetching the data from backend

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("/api/property/get-properties");
        setproperty(response.data);
      } catch (error) {
        console.log("Error fetching the data", error);
      }
    };
    fetchdata();
  }, []);

  const openModal = (open) => {
    setSelectedProperty(open);
  };

  const closeModal = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-green-800 font-heading">
        Featured Properties
      </h1>

      {/* // card */}
      <Link href="">
        <div className="mx-auto grid  gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:w-full">
          {propertyData.map((property) => (
            <div
              key={property.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              </div>

              <div className="p-3">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  {property.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Square className="mr-2 h-4 w-4" />
                    <span className="text-sm">{property.area}</span>
                  </div>
                </div>

                <button
                  onClick={() => openModal(property)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  <span>Enquire Now</span>
                  <ArrowUpRightFromSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Enquiry Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col font-body  ">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Enquiry for {selectedProperty.title}
              </h2>
              <h3>Fill up the form and get an expert call</h3>
            </div>
            <Enquirennow />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
