"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";

const PHONE = "918076913424";

const MicrositeNavbar = ({ navItems, onScrollTo, onBack, onEnquire }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-md shadow-[0_8px_30px_rgba(22,101,52,0.08)] border-b border-green-100/60"
          : "bg-white/10 backdrop-blur-[6px] border-b border-white/15"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 md:py-3.5">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium tracking-wide transition ${
            scrolled
              ? "text-green-800 hover:bg-green-50"
              : "text-white hover:bg-white/15"
          }`}
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="mt-2.5 flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex gap-0.5 overflow-x-auto text-[13px] md:text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onScrollTo(item.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 transition ${
                  scrolled
                    ? "text-gray-600 hover:bg-green-50 hover:text-green-800"
                    : "text-white/85 hover:bg-white/15 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:+${PHONE}`}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                scrolled
                  ? "border border-green-200/80 text-green-800 hover:bg-green-50"
                  : "border border-white/30 text-white hover:bg-white/15"
              }`}
            >
              <Phone size={14} /> Call
            </a>
            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                scrolled
                  ? "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  : "border border-white/30 text-white hover:bg-white/15"
              }`}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <button
              type="button"
              onClick={onEnquire}
              className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MicrositeNavbar;
