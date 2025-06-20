import React from 'react'

const  Map=()=> {
  return (
    <div className="w-full h-96  rounded-lg overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.206040239301!2d77.51265267380852!3d28.473340991294965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceb8cebc3fb89%3A0x2737aca88d3806b3!2sKIRTY%20REALTY%20-Industrial%20%2CCorporate%2CProperty%20Lease%2CSale!5e0!3m2!1sen!2sin!4v1750419605758!5m2!1sen!2sin"
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