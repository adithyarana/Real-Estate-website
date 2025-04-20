"use client";
import React, { use } from "react";
import {  Shield, Star, Clock, Users } from "lucide-react";
import {motion} from "framer-motion";
import Tredingproperty from "../_components/TrendingProperty.jsx";
import Btn1 from "@/Component/Btn1.jsx";
import Btn2 from "@/Component/Btn2.jsx";
import { useRouter } from "next/navigation";


 export const Herosection = () => {

  const router = useRouter(); // Use Next.js router for navigation

  
  return (
    <div className="min-h-screen overflow-hidden ">
      {/* Hero Section with Background Image */}
      <div
        className="relative bg-cover bg-center h-screen "
        style={{
          backgroundImage: `url(${"/banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black opacity-45"></div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 pt-52">
          <div className="pb-5">
          <motion.h1
           className="font-heading text-5xl 2xl:text-7xl font-extrabold text-white mb-4"
           initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            viewport={{ once: true }}>
              Welcome to The{" "}
              <span className="text-green-400"> Tenancy properties</span>
            </motion.h1>

            <motion.p 
           className=" font-body text-base sm:text-lg text-white max-w-xs sm:max-w-2xl mx-auto mb-6 sm:mb-8 text-center leading-tight"

            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}>
              Discover your dream home with personalized real estate solutions.
              We help you find the perfect property that matches your lifestyle
              and aspirations.
            </motion.p>
          </div>

          {/* Property Filter */}
          {/* <PropertyFilter/> */}

      <div className="flex flex-col sm:flex-row gap-4 mb-6 ">
      <Btn2 
            content={"Buy A Property"}
            clickHandler={(()=>{
                    
                router.push("/properties")
            })}
            />

      <Btn2
            content={"Rent A Property"}
            clickHandler={(()=>{
                    
              router.push("/properties")
            })}
            />

      </div>


         
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Heading */}
          <motion.h2
            className="font-heading text-3xl font-bold text-center text-green-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Why Choose The Tenancy
          </motion.h2>

          {/* Grid Container */}
          <div className="grid md:grid-cols-4 gap-8 ">
            {[
              {
                Icon: Shield,
                title: "Trusted Service",
                text: "We provide reliable and transparent real estate services with your best interests at heart.",
              },
              {
                Icon: Star,
                title: "Expert Guidance",
                text: "Our experienced team offers personalized advice to help you make informed decisions.",
              },
              {
                Icon: Clock,
                title: "Efficient Process",
                text: "We streamline your property search with quick, hassle-free consultations and viewings.",
              },
              {
                Icon: Users,
                title: "Client-Centric",
                text: "Your satisfaction is our priority. We go above and beyond to meet your unique needs.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                {/* Animated Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mx-auto mb-4 text-green-600 flex justify-center"
                >
                  <item.Icon size={60} />
                </motion.div>

                {/* Title and Description */}
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-green-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* trending properties section */}
         <Tredingproperty/>

      {/* Ready to Find Your Dream Home */}
      <section className="py-16  bg-gradient-to-b from-white to-green-50 ">
        <motion.div
          className="max-w-4xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Animated Heading */}
          <motion.h2
            className="font-heading text-3xl font-bold text-green-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Ready to Find Your Dream Place?
          </motion.h2>

          {/* Animated Paragraph */}
          <motion.p
            className=" font-body text-lg text-green-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Let's turn your property dreams into reality. Contact us today for a
            personalized consultation.
          </motion.p>

          {/* Animated Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Btn1
            content ={"Search Properties"}
            additionalCSS ={"bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-medium"}
            clickHandler = {() => {
              console.log("Search Properties Clicked")
            }}
            />
            <Btn1
            content ={"Contact Us"}
            additionalCSS ={"bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-medium"}
            clickHandler = {() => {
              console.log("contact Us Clicked")
            }}
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};


