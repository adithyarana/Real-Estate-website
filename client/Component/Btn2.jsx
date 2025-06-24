import React from 'react'
import { motion } from "framer-motion";



function Btn2({content , clickHandler}) {

  return (
      <motion.button
              className={`w-35 h-15 xl:w-47 xl:h-20  bg-green-700 ml-12 xl:-ml-1  text-white font-bold font-heading text-[1.1rem] text-nowrap  p-5 rounded hover:bg-green-700 transition-colors duration-300 cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
            >
              <motion.span
                className="flex items-center mr-3 ml-3 text-sm xl:text-lg  justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                onClick={clickHandler}
              >
               
               {content}
              </motion.span>
            </motion.button> 
  )
}

export default Btn2