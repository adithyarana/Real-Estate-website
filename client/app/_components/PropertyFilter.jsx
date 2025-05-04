import React, { useState } from 'react';
import { MapPin, Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Btn2 from '@/Component/Btn2';

const PropertyFilter = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [For, setFor] = useState('');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="max-w-4xl w-full px-4 pb-11">
      <motion.div 
        className="bg-white shadow-lg rounded-xl p-6 border border-green-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-4 gap-4 ">
          {/* Location Filter */}
          <motion.div className="relative" variants={itemVariants}>
            <label className="block text-green-800 mb-2 mr-20">
              <motion.span 
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MapPin
                  className="inline-block mr-2 text-green-600"
                  size={20}
                />
              </motion.span>
              Location
            </label>
            <motion.select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-green-200 rounded text-green-700 focus:ring-2 focus:ring-green-300 focus:border-green-500 focus:outline-none"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.4)" }}
            >
              <option value="">All Locations</option>
              <option value="CA">Greater Noida</option>
              <option value="NY">Noida</option>
              <option value="FL">Delhi</option>
              <option value="AY">Yamuna Expressway</option>
            </motion.select>
          </motion.div>

          {/* Property Type Filter */}
          <motion.div className="relative" variants={itemVariants}>
            <label className="block text-green-800 mb-2 mr-11">
              <motion.span 
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Home
                  className="inline-block mr-2 text-green-600"
                  size={20}
                />
              </motion.span>
              Property Type
            </label>
            <motion.select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 border border-green-200 rounded text-green-700 focus:ring-2 focus:ring-green-300 focus:border-green-500 focus:outline-none"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.4)" }}
            >
              <option value="">All Types</option>
              <option value="villa">Land</option>
              <option value="villa">Plot</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
            </motion.select>
          </motion.div>

          {/* Price Range Filter */}
          <motion.div className="relative" variants={itemVariants}>
            <label className="block text-green-800 mb-2 mr-30">For:</label>
            <motion.select
              value={For}
              onChange={(e) => setFor(e.target.value)}
              className="w-full p-2 border border-green-200 rounded text-green-700 focus:ring-2 focus:ring-green-300 focus:border-green-500 focus:outline-none"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.4)" }}
            >
              <option value="">All properties</option>
              <option value="Buy">Buy</option>
              <option value="Lease">Lease</option>
            </motion.select>
          </motion.div>

          {/* Search Button */}
          <motion.div className="flex items-end" variants={itemVariants}>
            {/* <motion.button
              className="w-full bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                animate={{ 
                  x: [0, 5, 0],
                  transition: { 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }
                }}
                className="inline-flex items-center"
              >
                <Search className="mr-2" size={20} />
                Search Properties
              </motion.span>
            </motion.button> */}
            <Btn2
            content={"Search Properties"}
            clickHandler={(()=>{
                    
                console.log("Search Properties Clicked")
            })}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyFilter;

