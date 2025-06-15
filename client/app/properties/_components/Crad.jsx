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


export const Card = ({ property, setSelectedProperty }) => {
  const router = useRouter();

  return (
    <div
      key={property.id}
      className="group relative overflow-hidden rounded-xl cursor-pointer bg-white  shadow-lg transition-all duration-300 hover:shadow-xl"
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
            <span className="text-sm">{property.region}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="mr-2 h-4 w-4" />
            <span className="text-sm">{property.area}</span>
          </div>
        </div>
      </div>

<button
        onClick={() => setSelectedProperty(property)}
        className="mt-4 flex w-full items-center cursor-pointer justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
        <span>Enquire Now</span>
        <ArrowUpRightFromSquare className="h-4 w-4" />
      </button>
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

  useEffect(() => {
    setLoading(true);
    const start= Date.now();
    try {
      const fun = async () => {
        const data = await getAllProperties();
        const elapsed = Date.now() - start;
        const delay = Math.max(300 - elapsed, 0); 
        
        setTimeout(() => {
          setAllProperties(data);
          setProperty(data);
          setLoading(false);
        }, delay);
      };
      fun();
    } catch (error) {
      console.log("Error Fetching the cards", error);
      setLoading(false);
    }
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
              Property not listed
            </div>
          ) : (
            property.map((property) => (
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
    </div>
  );
};

export default PropertyCard;
