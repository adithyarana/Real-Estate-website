 "use client"
 import React from 'react'
 import { motion } from "framer-motion";
 function Btn1({content,additionalCSS,clickHandler}) {
   return (
          <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-full sm:w-auto bg-green-600 text-white px-8 py-3 ${additionalCSS} rounded-lg hover:bg-green-700 transition  duration-300 text-lg font-medium cursor-pointer `}
              onClick={clickHandler}
            >
             {content}
            </motion.button>
   )
 }
 
 export default Btn1