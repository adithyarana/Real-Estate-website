"use client"
import Button from "@/Component/Button";
import React, { useState } from "react";
import Enquirennow from "../../_components/Enquirennow";

const EnquiryButton = ({ propertyId }) => {
  const [enquiryModal, setEnquiryModal] = useState(null);

  return <>
        <Button additionalClass={"mt-10"} onClick={() => setEnquiryModal(!enquiryModal)}>Ask For Details</Button>
        <div>
            <h2>Enquiry Details</h2>
            <Enquirennow/>
        </div>
  </>
};

export default EnquiryButton;
