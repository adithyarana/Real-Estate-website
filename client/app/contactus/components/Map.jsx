import React from 'react'

const  Map=()=> {
  return (
    <div className="w-full h-96  rounded-lg overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14027.735150479015!2d77.56059870255748!3d28.481540611956806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c95505607f94b%3A0x2c9b8f025150b1ed!2sSector%20MU%202%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310!5e0!3m2!1sen!2sin!4v1742927108263!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  )
}

export default Map