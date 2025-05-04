import { useState } from 'react';
import { ChevronDown, ChevronUp, Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';
export default function RealEstateFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqs = [
    {
      question: "What documents do I need to sell my property?",
      answer: "To sell your property through Tenancy Real Estate, you’ll need proof of ownership (title deed), property tax receipts, identity proof, sale agreement (if applicable), and an occupancy certificate. We’ll guide you through any additional paperwork based on your property type and location."
    },
    {
      question: "How does Tenancy Real Estate help in selling my property?",
      answer: "We provide end-to-end support — from listing your property with high-quality photos and descriptions to promoting it to potential buyers, arranging visits, negotiating offers, and assisting with paperwork until the final sale is complete."
    },
    {
      question: "Do I need to hire a real estate agent to sell my home?",
      answer: "It's not mandatory, but partnering with a professional from Tenancy Real Estate can speed up the sale and help you get the best deal. Our agents manage inquiries, showings, legal formalities, and negotiations on your behalf."
    },
    {
      question: "How is my property’s value determined?",
      answer: "We evaluate your property based on location, size, amenities, recent market trends, and comparable sales. Our experts at Tenancy Real Estate offer a free property valuation to help you price it competitively."
    },
    {
      question: "How long does it take to sell a property?",
      answer: "The time to sell depends on your location, pricing, demand, and market conditions. On average, it may take anywhere from a few weeks to a few months. With the right pricing and marketing strategy, we aim to close deals quickly."
    },
    {
      question: "What are the costs involved in selling a property?",
      answer: "Costs may include agent commission (usually 1–2% of the sale price), legal/documentation charges, capital gains tax (if applicable), and government transfer fees. Tenancy Real Estate provides a breakdown of all estimated costs before you list."
    },
    {
      question: "Is there any tax I need to pay when selling property?",
      answer: "Yes, you may be liable to pay capital gains tax on any profit made from the sale. The rate depends on how long you've held the property. Our advisors can help you understand the tax implications and any exemptions you may qualify for."
    },
    {
      question: "Can I sell my property if it is still under loan?",
      answer: "Yes, you can sell a property under a mortgage. The loan must be settled at the time of sale, either by the buyer or using the sale proceeds. Tenancy Real Estate can coordinate with your bank and assist with a smooth transaction."
    }
  ];
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full   bg-gradient-to-b from-white to-green-50 shadow-lg overflow-hidden">
      {/* Header */}
      <div className=" p-6 xl:mt-10 flex items-center justify-between">
        <motion.div className="flex items-center space-x-3"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        >
          <Home className="text-green-800" size={40} />
          <h1 className="xl:text-4xl text-2xl   font-bold text-green-800 font-heading ">Frequently Asked Questions</h1>
        </motion.div>
      </div>
      
      {/* Search Bar */}
      <div className=" p-4 border-b border-green-100">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-green-500" size={20} />
          <input
            type="text"
            placeholder="Search for questions..."
            className="w-full py-2 pl-10 pr-4 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* FAQ List */}
      <div className="divide-y divide-green-100">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="border-l-4 border-transparent hover:border-green-500 transition-all duration-200">
              <button
                className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium text-lg text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-green-600" size={20} />
                ) : (
                  <ChevronDown className="text-green-600" size={20} />
                )}
              </button>
              
              <div 
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 text-center text-gray-500">
            No questions match your search. Try different keywords.
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-green-50 p-4 text-center text-gray-600 text-sm border-t border-green-100">
        <p>Can't find what you're looking for? <a href="/contactus" className="text-green-600 font-medium hover:underline">Contact our team</a></p>
      </div>
    </div>
  );
}