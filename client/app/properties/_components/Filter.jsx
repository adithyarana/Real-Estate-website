"use client";
import { Search, RefreshCw } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const locations = ["NOIDA", "DELHI", "GREATER_NOIDA"];

const propertyTypes = [
  "RESIDENTIAL",
  "COMMERCIAL",
  "INDUSTRIAL",
  "INSTITUTIONAL",
];

const types = ["All", "LEASE", "PRE-LEASE"];

const propertySubtypes = {
  RESIDENTIAL: [
    "APARTMENT", //Residential
    "VILLA",
    "KOTHI",
    "HOUSE",
    "BUILDER_FLOOR_APARTMENT",
    "FARM_HOUSE",
  ],
  COMMERCIAL: [
    "OFFICE", //Commercial
    "SHOP",
    "SHOWROOM",
    "BUSSINESS_CENTER",
    "LAND",
    "HOTEL",
  ],
  INDUSTRIAL: [
    "SHED", //Industrial
    "FACTORY",
    "WAREHOUSE",
  ],

  INSTITUTIONAL: [
    "CORPORATE_PLOT", //Institutional
    "CORPORATE_BUILDING",
    "COLLEGE_PLOT",
    "SCHOOL_PLOT",
    "HOSPITAL_BUILDING",
    "HOSPITAL_PLOT",
    "OFFICE_IT",
    "BUILDING",
    "IT_PLOT",
    "IT_BUILDING",
    "BANQUET_HALL",
  ],
};

const PropertyFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    region: "",
    propertyType: "",
    propertySubtype: "",
  });

  // saved the filter after the refresh

  useEffect(()=>{
    const region = searchParams.get("region")|| "";
    const propertyType = searchParams.get("propertyType")|| "";
    const propertySubtype = searchParams.get("propertySubtype")|| "";

    setFilters({
      region,
      propertyType,
      propertySubtype,
    })

    if(!searchParams.get("type")){
      router.push(pathname + "?type=All");
    }
    
  },[]);



  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset propertySubtype if propertyType changes
    if (name === "propertyType") {
      setFilters({
        ...filters,
        [name]: value,
        propertySubtype: "",
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  // to reset filters to default values
  const resetFilters = () => {
    setFilters({
      region: "",
      propertyType: "",
      propertySubtype: "",
    });
    router.push(pathname + "?type=All");
  };

  const setFiltersHandler = () => {
    const params = new URLSearchParams(searchParams.toString());
    for (const filter in filters) {
      const value = filters[filter];
      if (value !== "") {
        params.set(filter, value);
      } else if (searchParams.has(filter)) {
        params.delete(filter);
      }
    }
    router.push(pathname + "?" + params.toString());
  };

  const setTypeHandler = (type = "All") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", type);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-300  shadow-lg p-8 border border-green-200">
      <motion.h2
        className="text-3xl font-bold text-green-800 w-fit mx-auto py-2 mb-6 px-4 text-center font-heading border-b-2 border-green-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Find Your Perfect Property
      </motion.h2>

      <motion.div className="flex w-full flex-col md:flex-row items-center justify-center gap-4  text-green-950 uppercase mb-6">
        {types.map((type, index) => (
          <div
            key={index}
            className={`flex  items-center gap-4 px-6 py-1 hover:text-green-800 cursor-pointer ${
              searchParams.get("type") === type
                ? "border-b-2 border-green-800"
                : ""
            }`}
            onClick={() => setTypeHandler(type)}
          >
            <div>{type}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col xl:w-6.5xl  md:flex-row gap-4 mb-6 "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Location Filter */}
        <div className="flex-1 relative group">
          <label
            htmlFor="region"
            className="absolute -top-2 left-4 px-1 bg-white text-sm font-medium text-green-700 rounded"
          >
            Region
          </label>
          <select
            id="region"
            name="region"
            value={filters.region}
            onChange={handleChange}
            className="w-full p-4 border-2 border-green-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-400"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>     
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="flex-1 flex relative group">
          <label
            htmlFor="propertyType"
            className="absolute -top-2 left-4 px-1 bg-white text-sm font-medium text-green-700 rounded"
          >
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full p-4 border-2 border-green-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-400"
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Property Subtype Filter */}
        <div className="flex-1 relative group">
          <label
            htmlFor="propertySubtype"
            className="absolute -top-2 left-4 px-1 bg-white text-sm font-medium text-green-700 rounded"
          >
            Property Subtype
          </label>
          <select
            id="propertySubtype"
            name="propertySubtype"
            value={filters.propertySubtype}
            onChange={handleChange}
            disabled={!filters.propertyType}
            className="w-full p-4 border-2 border-green-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <option value="">All Subtypes</option>
            {filters.propertyType &&
              propertySubtypes[filters.propertyType].map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
          </select>
        </div>

        {/* search  */}

        <div className="flex-1 relative group">
          <label
            htmlFor="search"
            className="absolute -top-2 left-4 px-1 bg-white text-sm font-medium text-green-700 rounded"
          >
            Search
          </label>

          <input
            type="text"
            className="w-[300px] p-4 border-2 border-green-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            placeholder="search by locality or by propertyId"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="px-6 py-4 cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            onClick={setFiltersHandler}
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </button>
          <button
            onClick={resetFilters}
            className="px-6 py-4 bg-white cursor-pointer hover:bg-gray-50 text-green-700 rounded-full font-medium border-2 border-green-300 transition-colors duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Reset
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyFilter;
