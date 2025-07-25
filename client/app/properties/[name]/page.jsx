"use client";
import Btn2 from "@/Component/Btn2";
import {
  Cctv,
  Droplet,
  Feather,
  Mail,
  MapPin,
  Microwave,
  ParkingSquare,
  PhoneCall,
  Plug,
  Umbrella,
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Card } from "../_components/Crad";
import Button from "@/Component/Button";
import SimillarProperty from "../_components/SimillarProperty";
import EnquiryButton from "./_components/EnquiryButton";
import Enquirennow from "../_components/Enquirennow";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPropertyByCode } from "@/Services/operations/Property";
import ReviewCard from "@/app/_components/Reviewsection";
import ReviewForm from "./_components/reviewdetails";

// details page

// const property = {
//   id: 1,
//   pCode: "123456",
//   title: "Modern Luxury Villa",
//   description:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet exercitationem aperiam cumque molestiae voluptas sapiente. Accusamus, delectus maiores minus rerum at fugiat culpa doloribus excepturi eveniet eius necessitatibus beatae iste alias numquam aspernatur recusandae doloremque incidunt laborum sed accusantium fuga. Delectus illum adipisci esse magni molestiae, odio reiciendis labore provident?",
//   price: 2500000,
//   location: {
//     lat: 323,
//     long: 123,
//   },
//   address: "Beta-1, Greater Noida, U.P.",
//   bedrooms: 4,
//   bathrooms: 3,
//   area: "5,200 sq ft",
//   region: "Noida",
//   status: "Available",
//   thumbnail:
//     "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=500&h=400",
//   images: [
//     "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=500&h=400",
//     "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=500&h=400",
//     "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=500&h=400",
//   ],
//   amenities: [
//     "Outdoor Kitchen",
//     "Electricity",
//     "Garage",
//     "Camera",
//     "Swimming pool",
//   ],
//   tags: ["noida-property", "trending"],
//   additionalData: [
//     {
//       key: "built",
//       value: "Built in 2020",
//     },
//   ],
//   propertyType: "Industrial",
//   propertySubtype: "Factory",
// };

// const simillarProperty = [
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
//   // Add more as needed
// ];

// const baseurl = "http://localhost:4000/api/";

const amenitiesMap = {
  garage: <ParkingSquare className="w-6 h-6" />,
  water: <Droplet className="w-6 h-6" />,
  kitchen: <Microwave className="w-6 h-6" />,
  electricity: <Plug className="w-6 h-6" />,
  camera: <Cctv className="w-6 h-6" />,
  pool: <Umbrella className="w-6 h-6" />,
  default: <Feather className="w-6 h-6" />,
};
const informationKey = ["area", "address" ,"type", "region", "bathrooms", "bedrooms"];
const baseurl = `${process.env.NEXT_PUBLIC_API_URL}/api/property/`;

function page() {
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  console.log("name", name);
  const properyId = name.split("-").pop();

  useEffect(() => {
    if (!name) {
      return;
    }
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${baseurl}${properyId}`
        );
        setProperty(response.data.data);
        console.log("property", response.data.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching property data", error);
        setError(error);
      }
    };
    fetchdata();
  }, [properyId]);

  if (loading) return <p className="text-center text-2xl text-green-800 font-body">Loading...</p>;
  if (error) return <p className="text-center text-2xl text-red-800 font-body">{error}</p>;
  if (!property) return <p className="text-center text-2xl text-red-800 font-body">No property found.</p>;

  const ownerDetails = {
    name: process.env.NEXT_PUBLIC_OWNER_NAME || "Surendra Singh Rana",
    email: process.env.NEXT_PUBLIC_OWNER_EMAIL || "example@gmail.com",
    phone: process.env.NEXT_PUBLIC_OWNER_PHONE || "9876543210",
  };

  // const [ enquiryModal, setEnquiryModal ] = useState(null);

  return (
    <div className="w-full h-full  bg-gradient-to-b from-white to-green-100 relative">
      <div className=" py-8 w-11/12 2xl:w-10/12 mx-auto pb-18 ">
        {/* Title & location */}
        <div className="flex gap-3 flex-col">
          <h1 className="text-4xl font-medium font-heading text-green-800 font-sans">{property?.title}</h1>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <p className="text-sm text-gray-600 font-body">{property?.address}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mt-10">
          <div className="w-full flex flex-col flex-1 lg:flex-3/4">
            {/* Thumnbnail */}
            <div className=" flex w-full h-fit rounded-xl items-stretch  ">
              <img
                src={property?.thumbnail}
                className=" object-cover w-full  rounded-xl md:h-[450px]"
              />
            </div>

            {/* Overview */}
            <div className="flex-1 lg:flex-3/4 w-full mt-16">
              <h3 className="text-3xl mb-8 font-heading text-green-800">Description</h3>
              <p className="text-gray-600 text-lg text-justify lg:text-start font-body">
                {property?.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="flex mt-16 flex-col">
              <h3 className="text-3xl mb-6 font-heading text-green-800">Amenities</h3>
              <div className="flex-1 gap-7 lg:flex-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {property?.amenities?.map((item, index) => (
                  <div className="w-full text-start py-3 text-lg" key={index}>
                     <span className="text-green-600 text-xl">✅</span>
                     <span className="ml-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-col flex-1 lg:flex-1/4 gap-8">
            {/* Information */}
            <div className="bg-white shadow-lg border border-green-300 w-full h-full rounded-xl px-6 xl:px-8 py-10">

              <div className="flex items-center justify-between py-4 border-b border-t border-gray-400">
                <h4 className="text-lg font-medium text-green-800">Property ID</h4>
                <div className="text-lg font-semibold font-heading text-green-800">
                  {property?.pCode ? `${property.pCode}` : ""}
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-t border-gray-400">
                <h4 className="text-lg font-medium text-green-800">Price</h4>
                <div className="text-lg font-semibold font-heading text-green-800">
                  {property?.price ? `${property.price}` : "Enquiry for price"}
                </div>
              </div>

              <h3 className="mt-8 mb-3 font-semibold text-xl xl:text-2xl font-heading text-green-800">
                INFORMATION
              </h3>
              {informationKey?.map(
                (key, index) =>
                  property?.[key] && (
                    <div
                      className="flex items-center justify-between py-4 border-b border-gray-400"
                      key={index}
                    >
                      <h4 className=" capitalize font-semibold text-green-800">
                        {key}
                      </h4>
                      <p>
                        {property[key].toString().length > 15
                          ? `${property[key].toString().substring(0, 20)}...`
                          : property[key].toString()}
                      </p>
                    </div>
                  )
              )}
              {Array.isArray(property?.additionalData) &&
                property.additionalData.map((data, index) => (
                  <div
                    className="flex items-center justify-between py-4 border-b border-gray-400"
                    key={index}
                  >
                    <h4 className="capitalize font-semibold text-green-800">
                      {data.key}
                    </h4>
                    <p>{data.value?.substring(0, 20)}</p>
                  </div>
                ))}
            </div>
            {/* Agent details */}
            {/* <div className="w-full h-48 py-4 px-8 rounded-lg  bg-white flex-1 lg:flex-1/4 flex flex-col justify-between items-start">
            <h4 className="text-lg font-semibold mb-4">
              Get in touch with agent directly.
            </h4>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex-1/3">
                <img
                  src="/owner.png"
                  alt="agent"
                  className="obejct-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="flex-2/3 space-y-1">
                <div className="font-semibold text-gray-600 text-lg">
                  {ownerDetails.name}
                </div>
                <div className="flex items-center w-full gap-3">
                  <div>
                    <Mail size={16} />
                  </div>
                  <div>{ownerDetails.email}</div>
                </div>
                <div className="flex items-center w-full gap-3">
                  <div>
                    <PhoneCall size={16} />
                  </div>
                  <div>
                    <span>+91</span>
                    {ownerDetails.phone}
                  </div>
                </div>
              </div>
            </div>
            </div> */}

            <div className="bg-white shadow-lg border border-green-300 rounded-xl px-2 py-4">
              <div className="text-2xl font-medium pl-4 text-green-800 font-heading">Enquire Now!</div>
              <Enquirennow propertyId={property?.id} />
            </div>
          </div>
        </div>

        {/* Overview and agent details */}
        <div className="flex flex-col lg:flex-row gap-16 mt-16"></div>

        {/* Property gallary */}
        <div className="w-full mt-16">
          <h5 className="mb-2 uppercase font-medium text-green-800 font-heading">Media</h5>
          <h3 className="text-4xl mb-6 text-green-800 font-heading">Property Gallary</h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">
            {property?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="gallary-images"
                loading="lazy"
                className="rounded-xl object-cover w-full h-[30rem]"
              />
            ))}
          </div>
        </div>

        {/* Simillar property */}
        {/* <div className="w-full mt-16">
          <SimillarProperty data={SimillarProperty} />
        </div> */}
      </div>
      <div className="w-full">
      <ReviewForm/>
      </div>
    </div>
  );
}

export default page;
