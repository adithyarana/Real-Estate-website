"use client";
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Hourglass,
  Clock,
  DoorClosed,
} from "lucide-react";
import Map from "./components/Map";
import { FaWhatsapp } from "react-icons/fa";
import { color, motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Contactus = () => {
  const [fromdata, setfromdata] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    address: "",
  });

  const baseurl= `${process.env.NEXT_PUBLIC_API_URL}/api/`

  const [consultation, setconsultation] = useState({
    phone: "",
  });

  const handleconsultation = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        `${baseurl}consultation/add`,
        consultation
      );
      console.log("data sent", data.data);
      toast.success("We will Contact Soon!");

      setconsultation({
        phone: "",
      });

      


    } catch (error) {
      // console.error("Error sending Phone Number:", error.response?.data || error.message);
      toast.error("Errro sending the Phone Number!");
    }
  };



  const handleform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
            `${baseurl}contact/add`,
        fromdata
      );
      console.log("date sent", response.data);
      toast.success("Data Sent We Will Contact Soon!");

      // reset form
      setfromdata({
        name: "",
        email: "",
        number: "",
        city: "",
        address: "",
      });
    } catch (error) {
      // console.error("Error sending message:", error.response?.data || error.message);
      toast.error("Errro sending the Data!");
    }
  };

  return (
    <div className=" mx-auto  ">
      {/* google map section */}
      <Map />

      {/* Contact form section */}
      <div className="container mx-auto  py-5  ">
        <motion.h2
          className="text-2xl font-semibold text-green-800 mb-4 ml-4  "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Contact us
        </motion.h2>
        {/* Line below heading */}
        <div className="w-60 sm:w-2xl ml-4 border-b-2 border-green-500 mb-4"></div>
        {/* 
        // card sectoin */}

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Left Side - Contact Details */}
          <div className="flex flex-col gap-6 xl:ml-7 ml-4 mr-4">
            <div className=" shadow-lg border border-green-400 rounded-2xl p-6 ">
              <div className="space-y-4">
                <div className="flex items-center ">
                  <MapPin className="mr-3 text-green-600 w-8 h-8" />
                  <span>
                    {" "}
                    <span className="text-2xl">Greater Noida</span> <br />
                    Sector MU 2, Greater Noida, UP 201310
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 text-green-600 w-6 h-6" />
                  <span className="ml-2">+916301837384</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 text-green-600 w-6 h-6" />
                  <span className="ml-2">contact@example.com</span>
                </div>
              </div>
            </div>

            <div className=" shadow-lg border border-green-400 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Hourglass className="mr-3 text-green-600 w-6 h-6" />
                  <span className="text-2xl">Business Hours</span>
                </div>
                <div className="flex items-center ">
                  <Clock className="mr-3 text-green-600 w-6 h-6" />
                  <span>Monday - Saturday : 9 AM - 6 PM</span>
                </div>
                <div className="flex items-center ">
                  <DoorClosed className="mr-3 text-green-600 w-6 h-6" />
                  <span>Sunday : Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-6">
              Fill up and reach out to us
            </h2>

            <form onSubmit={handleform} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={fromdata.name}
                  onChange={(e) =>
                    setfromdata({
                      ...fromdata,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Your Name"
                  className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={fromdata.email}
                  onChange={(e) =>
                    setfromdata({
                      ...fromdata,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Your Email"
                  className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <input
                type="tel"
                name="number"
                value={fromdata.number}
                onChange={(e) =>
                  setfromdata({ ...fromdata, [e.target.name]: e.target.value })
                }
                placeholder="Your Phone Number"
                className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <select
                name="city"
                value={fromdata.city}
                onChange={(e) =>
                  setfromdata({ ...fromdata, city: e.target.value })
                }
                className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 "
              >
                <option className="" value="">
                  Select City
                </option>
                <option value="GREATER_NOIDA">GREATER_NOIDA</option>
                <option value="DELHI">DELHI</option>
                <option value="NOIDA">NOIDA</option>
              </select>

              <textarea
                name="address"
                value={fromdata.address}
                onChange={(e) =>
                  setfromdata({ ...fromdata, address: e.target.value })
                }
                placeholder="Enter your Address"
                rows="5"
                className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-500 cursor-pointer transition duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" /> Send Message
              </button>
            </form>
          </div>
        </motion.div>

        {/* private contact section */}

        <motion.div
          className="mt-14 flex flex-col gap-4 items-center text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-green-800 ">
            Couldn’t find what you are looking for?
          </h2>
          <h4 className="font-light m">Schedule a private consultation</h4>

          {/* Input & Button Row */}
          <div className="flex  w-full max-w-2xl border border-green-300 rounded-lg overflow-hidden">
            {/* Country Code */}
            <div className="flex items-center px-4 bg-gray-100 border-r border-green-300">
              <span className="text-gray-700 font-medium">+91</span>
            </div>

            {/* Phone Number Input */}
            <input
              type="tel"
              value={consultation.phone}
              onChange={(e) =>
                setconsultation({ ...consultation, phone: e.target.value })
              }
              name="phone"
              placeholder="000 000 0000"
              className="w-full p-3 text-gray-700 focus:outline-none"
              required
            />

            {/* Request Button */}
            <button
              onClick={handleconsultation}
              className="bg-green-600 cursor-pointer text-white px-6  py-3 font-medium hover:bg-green-700 transition duration-300 xl:whitespace-nowrap 2xl:whitespace-nowrap "
            >
              REQUEST CONSULTATION
            </button>
          </div>

          {/* WhatsApp Notification Message */}
          <div className="flex items-center gap-2 text-gray-600">
            <FaWhatsapp className="text-green-500 text-xl" />
            <span>We’ll send a notification on your WhatsApp</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contactus;
