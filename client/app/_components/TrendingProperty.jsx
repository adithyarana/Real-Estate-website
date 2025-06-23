"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getAllProperties } from "@/Services/operations/Property";





const Tredingproperty = () => {
  const router = useRouter();

  const [properties, setProperties] = useState([]);

  // Slider settings
const settings = {
  dots: properties.length > 1,
  arrows: properties.length > 1,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: properties.length > 1,
  autoplaySpeed: 3000,
};

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getAllProperties();
        const filterproperty = response.slice(0, 4);

        while (filterproperty.length < 4) {
          filterproperty.push({
            id: `dummy-${filterproperty.length}`,
            title: "Coming Soon",
            thumbnail: "/dummy.png", 
            region: "New Location",
            area: "--- sq. ft.",
            isDummy: true,
          });
        }
        setProperties(filterproperty);
        console.log("property", filterproperty);
      } catch (error) {
        console.log("Error fetching property data", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10   ">
      <div className="flex flex-col md:flex-row items-center gap-8 ">
        {/* Left Side: Text Section */}
        <motion.div
          className="w-full md:w-1/2  text-center md:text-left "
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className=" font-heading text-4xl md:text-3xl  mb-10 font-bold text-green-800  md:mb-6 ">
            Trending Properties
          </h2>
          <p className=" font-body text-gray-700 text-lg mb-3 md:mb-4 font-bold">
            Build your dream with Kirty Realty!
          </p>
          <p className=" font-body text-gray-600 leading-relaxed text-lg text-justify  ">
            Now, invest in our upcoming projects of Kirty Realty at an affordable
            range. Our wide range of property types, from commercial and
            residential to industrial, will mesmerize you. You can avail of our
            promising properties with unique styles and designs that are highly
            trending in locations such as Delhi, Noida and Greater Noida.
          </p>
          <Link href={`/properties?type=All`}>
            <button className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-medium cursor-pointer mt-12">
              View All Properties
            </button>
          </Link>
        </motion.div>

        {/* Right Side: Slider Section */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Slider {...settings}>
            {properties.map((property, index) => (
              <div
                key={index}
                className="p-2"
                onClick={() => {
                if (!property.isDummy) {
                  const name = property.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");

                  router.push(`/properties/${name}-${property.id}`);
                }}
              }
              >
                <div className="shadow-lg rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={property.thumbnail}
                    alt={property.title}
                    className="w-full h-48 md:h-56 lg:h-72 object-cover"
                  />
                  <div className="p-4 text-center flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-green-800">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600">{property.region}</p>
                    <p className="text-sm font-medium text-green-700">
                      Area: {property.area}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default Tredingproperty;
