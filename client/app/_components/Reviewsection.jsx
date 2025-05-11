import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
  {
    id: 1,
    name: "Jennifer Smith",
    rating: 5,
    date: "April 28, 2025",
    content: "Absolutely amazing service! The agent was professional, knowledgeable, and helped us find our dream home within our budget. Highly recommend!",
    property: "Lakeside Villa",
  },
  {
    id: 2,
    name: "Michael Johnson",
    rating: 4,
    date: "April 25, 2025",
    content: "Great experience overall. The process was smooth and transparent. Only giving 4 stars because the closing took a bit longer than expected.",
    property: "Downtown Apartment",
  },
  {
    id: 3,
    name: "Sarah Williams",
    rating: 5,
    date: "April 22, 2025",
    content: "Outstanding expertise and customer service. They made buying our first home stress-free and enjoyable. Will definitely use them again!",
    property: "Sunset Meadows",
  },
  {
    id: 4,
    name: "David Chen",
    rating: 5,
    date: "April 20, 2025",
    content: "The virtual tour technology they use is incredible! Saved us so much time in the house hunting process. The agent was also very responsive.",
    property: "Highland Terrace",
  },
];

const ReviewCard = () => {
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));

  return (
    <motion.div className="w-full h-full p-4 relative"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}>
      <motion.h2 className="xl:text-4xl text-2xl font-bold text-green-800 text-center mb-6 xl:mt-10 font-heading "
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
       viewport={{ once: true }}
      >What Our Clients Say</motion.h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row border-l-4 border-green-600 overflow-hidden">
              <div className="bg-green-50 p-6 flex flex-col items-center md:w-1/4">
                <div className="bg-green-600 rounded-full p-4 mb-4">
                  <User size={40} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">{review.name}</h3>
                <div className="flex mb-2">{renderStars(review.rating)}</div>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>

              <div className="p-6 md:w-3/4">
                <p className="italic text-gray-700 mb-4">"{review.content}"</p>
                <p>
                  <span className="text-green-700 font-medium">Property:</span>{' '}
                  <span className="text-gray-800">{review.property}</span>
                </p>
                <div className="mt-4 pt-4 border-t text-sm text-green-800 font-medium">
                  Verified Purchase
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tailwind-only style overrides */}
      <style jsx>{`
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: #15803d; /* Tailwind green-700 */
        }
        :global(.swiper-pagination-bullet) {
          background-color: #bbf7d0; /* Tailwind green-200 */
          opacity: 1;
        }
        :global(.swiper-pagination-bullet-active) {
          background-color: #15803d; /* Tailwind green-700 */
        }
      `}</style>
    </motion.div>
  );
};

export default ReviewCard;
