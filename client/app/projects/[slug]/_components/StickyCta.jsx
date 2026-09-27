"use client";

import { Phone, MessageCircle } from "lucide-react";

const PHONE = "918076913424";

const StickyCta = ({ onEnquire }) => (
  <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-green-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
    <div className="grid grid-cols-3 min-h-12">
      <a href={`tel:+${PHONE}`} className="flex items-center justify-center gap-1 py-3 text-xs sm:text-sm font-semibold text-green-800">
        <Phone size={15} /> Call
      </a>
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-1 py-3 text-xs sm:text-sm font-semibold text-emerald-700 border-x"
      >
        <MessageCircle size={15} /> WhatsApp
      </a>
      <button onClick={onEnquire} className="py-3 text-xs sm:text-sm font-semibold bg-green-600 text-white">
        Enquire
      </button>
    </div>
  </div>
);

export default StickyCta;
