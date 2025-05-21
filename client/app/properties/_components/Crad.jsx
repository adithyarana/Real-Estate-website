"use client";
import {
  MapPin,
  Square,
  ArrowUpRightFromSquare,
  X,
  Axis3D,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Enquirennow from "./Enquirennow";
import Link from "next/link";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllProperties } from "@/Services/operations/Property";

// const propertyData = [
//   {
//     id: 1,
//     title: "Modern Luxury Villa",
//     propertyType: "Industrial",
//     propertySubtype: "Factory",
//     pCode: "123456",
//     price: 2500000,
//     location: "Noida",
//     area: "5,200 sq ft",
//     type: "Buy",
//     image:
//       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=500&h=400",
//   },
//   {
//     id: 2,
//     title: "Oceanfront Residence",
//     propertyType: "Residential",
//     propertySubtype: "House",
//     pCode: "241123",
//     price: 3200000,
//     location: "Delhi",
//     area: "4,800 sq ft",
//     type: "Buy",
//     image:
//       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=500&h=400",
//   },
//   {
//     id: 3,
//     title: "Contemporary Downtown Penthouse",
//     price: 1850000,
//     location: "Gurgaon",
//     propertyType: "Industrial",
//     propertySubtype: "Warehouse",
//     pCode: "121321",
//     area: "3,600 sq ft",
//     type: "Pre-Lease",
//     image:
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500&h=400",
//   },
//   {
//     id: 4,
//     title: "Contemporary Downtown Penthouse",
//     price: 1850000,
//     location: "Delhi",
//     propertyType: "Residential",
//     propertySubtype: "Condo",
//     pCode: "123342",
//     area: "3,600 sq ft",
//     type: "Lease",
//     image:
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500&h=400",
//   },
//   // Add more as needed
// ];

export const Card = ({ property, setSelectedProperty }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      key={property.id}
      className="group relative overflow-hidden rounded-xl cursor-pointer bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      // onClick={() => router.push(process.env.NEXT_PUBLIC_BASE_URL + "/properties/" + property.title.toLowerCase().split(' ').join('-') + '-' + property.id.toString())}
    >
      <div
        className="relative h-40 overflow-hidden"
        onClick={() => {
          const name = property.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") 
            .replace(/^-+|-+$/g, ""); 

          router.push(`/properties/${name}-${property.id}`);
        }}
      >
        <img
          src={property.thumbnail}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="px-4 py-1 rounded-xl bg-gray-300 text-sm font-semibold absolute top-2 left-3">
          {property.type}
        </div>
      </div>

      <div
        className="p-3"
        onClick={() => {
          const name = property.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") 
            .replace(/^-+|-+$/g, ""); 

          router.push(`/properties/${name}-${property.id}`);
        }}
      >
        <h3 className="mb-1 text-xl font-semibold text-gray-800">
          {property.title}
        </h3>
        <p className="text-xs font-semibold leading-2 opacity-80 mb-3 z-10">
          {property?.propertyType}
          {"  "}
          {property?.propertySubtype}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gray-600">
            <h4 className="font-medium text-sm">Property ID : </h4>
            <span className="text-sm">{property.pCode}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="text-sm">{JSON.stringify(property.region)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="mr-2 h-4 w-4" />
            <span className="text-sm">{property.area}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setSelectedProperty(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
        <span>Enquire Now</span>
        <ArrowUpRightFromSquare className="h-4 w-4" />
      </button>
    </div>
  );
};

const PropertyCard = () => {
  useEffect(() => {
    try {
      const fun = async () => {
        const data = await getAllProperties();
        setAllProperties(data);
        setProperty(data);
      };
      fun();
    } catch (error) {
      console.log("Error Fetching the cards", error);
    }
  }, []);

  const searchParams = useSearchParams();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [property, setProperty] = useState([]); // to update the data
  const [allProperties, setAllProperties] = useState([]);

  // useEffect(() => {
  //     setProperty(data);
  // },[data]);

  useEffect(() => {
    const filteredProperty = allProperties.filter((p) => {
      let check = true;
      if (searchParams.has("region"))
        check = check && searchParams.get("region") == p.region;
      if (searchParams.has("propertyType"))
        check = check && searchParams.get("propertyType") == p.propertyType;
      if (searchParams.has("propertySubtype"))
        check =
          check && searchParams.get("propertySubtype") == p.propertySubtype;
      if (searchParams.get("type") != "All")
        check = check && searchParams.get("type") == p.type;
      return check;
    });

    setProperty(filteredProperty);
  }, [searchParams, allProperties]);

  const openModal = (open) => {
    setSelectedProperty(open);
  };

  const closeModal = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-green-800 font-heading">
        Featured Properties
      </h1>

      {/* // card */}
      <div className="mx-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12">
        {property.map((property) => (
          <Card
            property={property}
            key={property.id}
            setSelectedProperty={setSelectedProperty}
            openModal={openModal}
          />
        ))}
      </div>

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
                Enquiry Now
              </h2>
              <h3>Fill up the form and get an expert call</h3>
            </div>
            <Enquirennow propertyId={selectedProperty} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
