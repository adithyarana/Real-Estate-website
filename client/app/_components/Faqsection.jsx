import { useState } from 'react';
import { ChevronDown, ChevronUp, Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';
export default function RealEstateFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqs = [
    {
      question: "What documents are required to sell my property through Kirty Realty?",
      answer: "To sell your property with us, you'll need your title deed, ID proof, property tax receipts, and an occupancy certificate. If there's an agreement or loan involved, we’ll guide you through those too — our experts make the paperwork hassle-free."
    },
    {
      question: "How does Kirty Realty support the property selling process?",
      answer: "We handle everything — from creating an attractive listing with professional photos to promoting it across platforms, arranging site visits, negotiating with buyers, and managing legal formalities till the deal is closed. You focus on moving forward; we handle the rest."
    },
    {
      question: "Do I need an agent to sell, rent, or lease my property?",
      answer: "You don’t *need* one — but with Kirty Realty, having an expert by your side speeds up the process, attracts serious buyers or tenants, and helps you get the best deal. We manage calls, visits, pricing, and paperwork so you don’t have to."
    },
    {
      question: "How is my property’s value calculated?",
      answer: "Our team considers your property’s location, size, condition, market trends, and recent sales in the area. We offer a free and transparent property valuation so you can price smartly and attract genuine interest."
    },
    {
      question: "How long does it take to sell, rent, or lease a property?",
      answer: "The timeline depends on pricing, property condition, and market demand. Some deals close in weeks, others take a few months. With Kirty Realty’s marketing strategies and local network, we aim to speed up the process."
    },
    {
      question: "What are the costs involved when selling a property?",
      answer: "Typical costs include agent commission (1–2%), legal fees, documentation charges, and government transfer fees. We provide a detailed cost breakdown before you list — no surprises, just clarity."
    },
    {
      question: "Do I need to pay tax when I sell my property?",
      answer: "Yes, capital gains tax may apply depending on how long you've owned the property. Our team will help you understand the tax rules, potential exemptions, and plan accordingly."
    },
    {
      question: "Can I sell a property that still has a loan on it?",
      answer: "Absolutely. Many properties are sold while under a loan. The loan can be cleared during the sale process — either by the buyer or using the proceeds. Kirty Realty coordinates with your bank to ensure a smooth handover."
    },
    {
      question: "Does Kirty Realty help with renting and leasing too?",
      answer: "Yes! We help property owners find verified tenants and lessees. From listing and tenant screening to rental agreements and handovers — we handle it all, so your property earns without stress."
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