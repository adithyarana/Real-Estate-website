"use client";
import React from 'react'
import {motion} from 'framer-motion'

const  Experience=()=> {
  return (
    <div className=' p-5 bg-gradient-to-b from-white to-green-100'>
          <div className="mb-16">
        <motion.h2 className=" font-heading text-3xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}

        >Our Experience</motion.h2>
        <motion.div className="grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}

        >
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600 card hover:scale-105 transition-transform duration-300 " >
            <div className="text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className=" font-heading text-xl font-bold text-green-700 mb-3">1000+</h3>
            <p className=" font-body text-gray-700">
              Successful residential transactions completed, from cozy apartments to luxury estates.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600 card hover:scale-105 transition-transform duration-300">
            <div className="text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className=" font-heading text-xl font-bold text-green-700 mb-3">15 Years</h3>
            <p className="font-body text-gray-700">
              Of trusted experience helping clients navigate the real estate market with confidence.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600 card hover:scale-105 transition-transform duration-300">
            <div className="text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className=" font-heading text-xl font-bold text-green-700 mb-3">95%</h3>
            <p className="font-body text-gray-700">
              Client satisfaction rate, with most of our business coming from referrals and repeat clients.
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default Experience