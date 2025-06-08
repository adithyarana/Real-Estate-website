"use client"

import Button from '@/Component/Button';
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Enquirennow = ({propertyId,setModal}) => {
  const baseurl="http://localhost:4000/api/"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
   e.preventDefault();

   const resposne= async()=>{

    try {
        const response = await axios.post(
          `${baseurl}enquiry`,
          formData
        );
        console.log("date sent", response.data);
        toast.success("Form Submitted We Will Contact Soon!");

        // reset form
        setFormData({
          name: "",
          email: "",
          number: "",
          message: "",
        });
    } catch (error) {
        toast.error("Error sending the Data!");
    }
   }
    
    
   resposne();
  };

  return (
    <form onSubmit={handleSubmit}  className="space-y-3 rounded-md xl:h-[350px] xl:w-[350px]   p-4 bg-white">
      <div>
        <label className="block mb-0.5 text-xs font-medium text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-0.5 text-xs font-medium text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-0.5 text-xs font-medium text-gray-600">Phone Number</label>
        <input
          type="tel"
          name="number"
          required
          value={formData.number}
          onChange={handleChange}
          className="w-full rounded border px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-0.5 text-xs font-medium text-gray-600">Message</label>
        <textarea
          name="message"
          rows="2"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded border px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>

      <Button
        type="submit"
        additionalClass={"mt-4 flex item-center justify-center gap-2"}
      >
        Submit
        <Send size={24}/>
      </Button>
    </form>
  );
};

export default Enquirennow;
