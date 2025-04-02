import React from 'react'
import { motion } from "framer-motion";
import { Search } from 'lucide-react';


function Btn2({content , clickHandler}) {

  return (
      <motion.button
              className={`w-full bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors duration-300 cursor-pointer`}
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
               {content}
              </motion.span>
            </motion.button> 
  )
}

export default Btn2