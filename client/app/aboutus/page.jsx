"use client";
import React from 'react'
import Head from 'next/head'
import Herosection from './components/herosection'
import Experience from './components/Experience'
import Btn1 from '@/Component/Btn1'
import Link from 'next/link'
import Visitus from './components/Visitus'
import {motion} from 'framer-motion'
function Aboutus() {
  return (
    <div className=" bg-gradient-to-b from-white to-green-50">
    <Head>
      <title>About Us </title>
      <meta name="description" content="Learn about our experienced real estate team" />
    </Head>

   <Herosection/>

      {/* Owner Section */}
      <motion.div className="mb-16 p-5"
       initial={{ opacity: 0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
       viewport={{ once: true }}
       >
        <h2 className="text-3xl font-bold text-green-800 mb-6">Meet The Owner</h2>
        <div className=" rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img src="/owner.png" alt="Agency Owner" className="w-full h-full 2xl:w-[500px] 2xl:h-[500px] object-cover" />
            </div>
            <div className="p-8 md:w-2/3">
              <h3 className=" font-heading text-2xl 2xl:text-4xl font-bold text-green-700 mb-3">Surender Singh Rana</h3>
              <p className="text-gray-600 mb-2">Founder</p>
              <div className="w-16 h-1 bg-green-500 mb-4"></div>
              <p className=" font-body text-gray-700 leading-relaxed mb-4">
                With over 15+ years of experience in the real estate market, we has developed 
                a reputation for integrity, market knowledge, and client satisfaction. After working 
                with several top agencies, we founded The Tenancy Real Estate with a vision to create 
                a more personalized approach to property transactions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                "Our goal is to help each client find not just a property, but a place they can truly call home. 
                I believe in building relationships based on trust and delivering results that exceed expectations."
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience Section */}
       <Experience/>

     
      {/* Call to Action */}
      <motion.div className=" text-green-700  p-8 rounded-lg shadow-lg text-center"
       initial={{ opacity: 0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
       viewport={{ once: true }}
       >
        <h2 className=" font-heading text-3xl font-bold mb-4">Ready to work with us?</h2>
        <p className=" font-body text-lg mb-6">Contact our team today to discuss your real estate goals.</p>
       <Link href="/contactus">
       <Btn1
    
        content={"Contact Us"}
        />
       </Link>
      </motion.div>

      {/* visit us section */}
      <Visitus/>
    </div>
  
  )
}

export default Aboutus