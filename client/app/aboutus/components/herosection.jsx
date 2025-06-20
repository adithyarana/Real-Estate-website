"use client";
import React from 'react'
import {motion} from 'framer-motion'

const  Herosection=()=> {
  return (
    <div className='bg-gradient-to-b from-white to-green-100'>

         {/* Hero Section */}
    <div className="relative ">
      <div className="w-full h-78 2xl:h-96 bg-gradient-to-r from-green-700 to-green-500">
        <div className="container mx-auto px-6 h-full flex items-center">
          <motion.h1 className=" font-heading text-4xl mb-12  md:text-5xl font-bold text-white"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true }}    
          >About Us</motion.h1>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#f0fdf4" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,224C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </div>

    {/* Main Content */}
    <motion.div className="container mx-auto px-6 py-12"
     initial={{ opacity: 0, y: 40 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6, ease: "easeOut" }}
     viewport={{ once: true }}
     >
      <div className="mb-16">
        <h2 className=" font-heading text-3xl font-bold text-green-800 mb-6">Our Story</h2>
        <div className=" font-body p-8 rounded-lg shadow-lg">
          <p className="text-gray-700 leading-relaxed">
            Kirty Realty was founded in 2010 with a vision to transform the real estate experience. 
            What began as a small team of passionate professionals has grown into one of the region's most 
            trusted real estate agencies. We combine deep local knowledge with personalized service to help 
            our clients find their perfect property match.
          </p>
        </div>
      </div>


</motion.div>
    </div>
  )
}

export default Herosection