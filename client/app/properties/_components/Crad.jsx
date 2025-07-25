"use client";
import {
  MapPin,
  Square,
  ArrowUpRightFromSquare,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Enquirennow from "./Enquirennow";
import {  useRouter, useSearchParams } from "next/navigation";
import { getAllProperties } from "@/Services/operations/Property";
import PropertyCardSkeleton from "../_components/Skelton";
import Pagination from "../_components/Pagination";


export const Card = ({ property, setSelectedProperty }) => {
  const router = useRouter();

  const handleCardClick = () => {
    const name = property.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    router.push(`/properties/${name}-${property.id}`);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      {/* Thumbnail */}
      <div
        className="relative h-44 w-full overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={property.thumbnail || "/placeholder.jpg"}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <span className="absolute top-2 left-2 rounded-md bg-white/90 opacity-100 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
          {property.type}
        </span>
      </div>

      {/* Property Info */}
      <div
        className="flex flex-col gap-2 p-4 cursor-pointer flex-grow"
        onClick={handleCardClick}
      >
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {property.title}
        </h3>
        <p className="text-xs text-gray-500 font-medium">
          {property?.propertyType} - {property?.propertySubtype}
        </p>

        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Property ID:</span>
            <span>{property.pCode}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{property.region}</span>
          </div>

          <div className="flex items-center gap-2">
            <Square className="h-4 w-4 text-gray-500" />
            <span>{property.area}</span>
          </div>
        </div>
      </div>

      {/* Enquiry Button - Fixed at bottom */}
      <div className="mt-auto px-4 py-3">
        <button
          onClick={() => setSelectedProperty(property)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <span>Enquire Now</span>
          <ArrowUpRightFromSquare className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// property code structute

const PropertyCard = () => {

  const searchParams = useSearchParams();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [property, setProperty] = useState([]); // to update the data
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cardperpage = 6;
  const totalcard = property.length;
  const totalpage = Math.ceil(totalcard / cardperpage);

  const start=(currentPage-1)*cardperpage;
  const end=start+cardperpage;
  const currentproperty=property.slice(start,end);


  useEffect(() => {
    setLoading(true);
  
    const fun = async () => {
        try {
        const data = await getAllProperties();        
        
          setAllProperties(data);
          setProperty(data);
          setLoading(false);
    
    } catch (error) {
      console.log("Error Fetching the cards", error);
      setLoading(false);
    }
  };
    fun();
  }, []);



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
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100">
      <h1 className="mb-8 text-center text-4xl font-bold text-green-800 font-heading">
        Featured Properties
      </h1>

      {/* // card */}
      <div className="mx-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12">
        {loading ?
          Array.from({length:6}).map((_,i)=>(
            <PropertyCardSkeleton key={i}/>
          ))   
          :
          property.length === 0 ? (
            <div className="col-span-full mt-20 text-center text-md xl:text-2xl md:text-xl 2xl:text-3xl font-body text-green-700 font-semibold">
             🏡 Property not listed
            </div>
          ) : (
            currentproperty.map((property) => (
              <Card
                property={property}
                key={property.id}
                setSelectedProperty={setSelectedProperty}
              />
            ))
          )
        }
      </div>

     

      {/* Enquiry Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full xl:w-[400px] max-w-lg rounded-lg bg-white p-6 shadow-xl">
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
              <p>Property ID : {selectedProperty?.pCode}</p>
            </div>
            <Enquirennow propertyId={selectedProperty?.id} />
          </div>
        </div>
      )}

<div className="mt-12">
  <Pagination currentPage={currentPage} totalpage={totalpage} onpageChange={(page)=>setCurrentPage(page)}/>
</div>
      
    </div>
    
  );
};

export default PropertyCard;
