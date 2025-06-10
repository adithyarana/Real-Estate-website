"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";


const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    rating: "",
    review: "",
  });

  const { name : propertyId } = useParams();

  const baseurl = "http://localhost:4000/api/";

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    const payload = {
        ...reviewData,
        propertyId, // props
      };
    e.preventDefault();
    try {
     const response = await axios.post(`${baseurl}review`, payload);
     toast.success("Review submitted successfully!");
    console.log("date sent", response.data);
      setReviewData({ name: "", email: "", rating: "", review: "" });
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error("Error submitting review");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10">
      <h3 className="text-2xl font-semibold text-center mb-6 font-heading text-green-800">
        Submit Your Review
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center justify-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={reviewData.name}
          onChange={handleChange}
          className="border border-gray-400 p-3 rounded-lg w-full md:w-auto hover:border-green-600"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={reviewData.email}
          onChange={handleChange}
          className="border border-gray-400 p-3 rounded-lg w-full md:w-auto hover:border-green-600"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={reviewData.rating}
          onChange={handleChange}
          className="border border-gray-400 p-3 rounded-lg w-full md:w-full hover:border-green-600"
          required
        />
        <input
          type="text"
          name="review"
          placeholder="Your Review"
          value={reviewData.review}
          onChange={handleChange}
          className="border border-gray-400 p-3 rounded-lg w-full md:w-auto hover:border-green-600"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 w-full rounded-lg hover:bg-green-700 transition duration-300 hover:text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;