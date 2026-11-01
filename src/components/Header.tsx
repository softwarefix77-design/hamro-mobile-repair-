import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import { Menu, X } from 'lucide-react';
import { SHOP_INFO } from '../data/mockData';

export const Header: React.FC = () => {
  const { setIsBookingOpen, lang, setLang, setIsAdminOpen } = useRepair();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Quiet top utility announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-200">Shani Mandir Road, Biratnagar</span>
            <span className="text-slate-500" aria-hidden="true">·</span>
            <span className="text-slate-400">Sun–Fri: 9:00 AM – 8:00 PM</span>
            <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
            <a href={`tel:${SHOP_INFO.primaryPhone}`} className="text-slate-300 font-mono text-[11px] hidden sm:inline hover:text-white">
              Call: {SHOP_INFO.primaryPhone}
            </a>
            <span className="text-slate-500 hidden md:inline" aria-hidden="true">·</span>
            <a 
              href={`https://wa.me/${SHOP_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namaste!`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 font-mono text-[11px] hidden md:inline hover:underline"
            >
              WhatsApp: {SHOP_INFO.whatsapp}
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[11px] text-slate-400 hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
              title="Open shop technician management panel"
            >
              {lang === 'ne' ? 'कर्मचारी लगइन' : 'Technician Desk'}
            </button>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang('en')}
                className={`text-[11px] px-1.5 py-0.5 rounded transition-colors ${
                  lang === 'en' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ne')}
                className={`text-[11px] px-1.5 py-0.5 rounded transition-colors ${
                  lang === 'ne' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                नेपाली
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-600 transition-colors"
          >
            Hamro Mobile Repair
          </a>

          {/* Zone 2: 4–5 single-line clean text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ne' ? 'सेवाहरू' : 'Services'}
            </a>
            <a href="#track" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ne' ? 'मर्मत ट्र्याक' : 'Track Repair'}
            </a>
            <a href="#calculator" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ne' ? 'मूल्य अनुमान' : 'Price Calculator'}
            </a>
            <a href="#location" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ne' ? 'ठेगाना तथा सम्पर्क' : 'Location & Contact'}
            </a>
            <a href="#reviews" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ne' ? 'समीक्षाहरू' : 'Customer Reviews'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              {lang === 'ne' ? 'मर्मत बुक गर्नुहोस्' : 'Book a Repair'}
            </button>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-700 hover:text-slate-900 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              {lang === 'ne' ? 'सेवाहरू' : 'Services'}
            </a>
            <a
              href="#track"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              {lang === 'ne' ? 'मर्मत ट्र्याक' : 'Track Repair'}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              {lang === 'ne' ? 'मूल्य अनुमान' : 'Price Calculator'}
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              {lang === 'ne' ? 'ठेगाना तथा सम्पर्क' : 'Location & Contact'}
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 hover:text-blue-600"
            >
              {lang === 'ne' ? 'समीक्षाहरू' : 'Customer Reviews'}
            </a>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Shani Mandir Road, Biratnagar</span>
              <a href={`tel:${SHOP_INFO.primaryPhone}`} className="text-blue-600 font-semibold font-mono">
                {SHOP_INFO.primaryPhone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
