
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Link from "next/link";
// Dummy data for properties
const propertyData = [
  {
    image: "/land.jpg",
    type: "2 BHK Apartment",
    location: "Mumbai, India",
    area: "1200 sq. ft.",
  },
  {
    image: "https://via.placeholder.com/400x250",
    type: "3 BHK Villa",
    location: "Delhi, India",
    area: "2500 sq. ft.",
  },
  {
    image: "https://via.placeholder.com/400x250",
    type: "1 BHK Studio",
    location: "Bangalore, India",
    area: "800 sq. ft.",
  },
  {
    image: "https://via.placeholder.com/400x250",
    type: "4 BHK Duplex",
    location: "Chennai, India",
    area: "3000 sq. ft.",
  },
];

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

 const Tredingproperty = () => {
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
        <p className= " font-body text-gray-700 text-lg mb-3 md:mb-4 font-bold">
          Build your dream with The Tenancy Real Estate!
        </p>
        <p className=" font-body text-gray-600 leading-relaxed text-lg text-justify  ">
          Now, invest in our upcoming projects of The Tenency at an affordable
          range. Our wide range of property types, from commercial and
          residential to industrial, will mesmerize you. You can avail of our
          promising properties with unique styles and designs that are highly
          trending in locations such as Delhi, Gurgaon, Noida, Greater Noida,
          and Bengaluru.
        </p>
       <Link href=''>
       <button  className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-medium cursor-pointer mt-12">
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
          {propertyData.map((property, index) => (
            <div key={index} className="p-2">
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img
                  src={property.image}
                  alt={property.type}
                  className="w-full h-48 md:h-56 lg:h-72 object-cover"
                />
                <div className="p-4 text-center flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-green-800">
                    {property.type}
                  </h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
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
