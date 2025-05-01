"use client"

import React, { useState } from 'react'
import { Card } from './Crad'

const SimillarProperty = ({data}) => {
  const [selectedProperty,setSelectedProperty] = useState(null)
  const [ enquiryModal, setEnquiryModal ] = useState(null);
  return (
    <div>
        <h5 className="mb-2 uppercase font-medium">Related</h5>
        <h3 className="text-4xl mb-8">Simillar Properties </h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {data?.map((property, index) => (
              <Card property={property} key={index} setSelectedProperty={setEnquiryModal}/>
            ))}
        </div>
    </div>
  )
}

export default SimillarProperty