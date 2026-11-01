import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import { ShieldCheck, Clock, MapPin, Search, ArrowRight, PhoneCall } from 'lucide-react';
import { SHOP_INFO } from '../data/mockData';

export const Hero: React.FC = () => {
  const { lang, setIsBookingOpen, setActiveTrackId } = useRepair();
  const [quickTrackInput, setQuickTrackInput] = useState('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTrackInput.trim()) return;
    setActiveTrackId(quickTrackInput.trim().toUpperCase());
    const trackElem = document.getElementById('track');
    if (trackElem) {
      trackElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:py-20 border-b border-slate-800">
      {/* Background radial gradient accent */}
      <div 
        className="absolute -top-32 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 2-Column Split: Editorial Value Prop on Left, High-res Visual & Quick Tracker on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Trust Kicker (no pills, clean typography) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-400">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Shani Mandir Road, Biratnagar
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Near Main Road & City Center</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">9+ Years Serving Morang</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              {lang === 'ne' ? (
                <>
                  विराटनगरको भरपर्दो <span className="text-blue-400">मोबाइल मर्मत</span> सेवा केन्द्र
                </>
              ) : (
                <>
                  Fast & Certified <span className="text-blue-400">Mobile Repairs</span> in Biratnagar.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'ne'
                ? 'शनि मन्दिर रोडमा स्थित हाम्रो ल्याबमा फुटेको स्क्रिन, ब्याट्री, पानी पसेको तथा डेड भएको मोबाइलको आधुनिक माइक्रोस्कोपबाट तत्काल समाधान गरिन्छ। ९० दिनको वारेन्टी सहित।'
                : 'From cracked OLED screens and 30-minute battery swaps to complex chip-level micro-soldering. Located right on Shani Mandir Road with genuine parts, transparent pricing, and 90-day warranty.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 shrink-0"
              >
                {lang === 'ne' ? 'अहिले मर्मत बुक गर्नुहोस्' : 'Book a Repair'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${SHOP_INFO.primaryPhone}`}
                className="px-5 py-3.5 text-sm font-medium text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-750 hover:text-white transition-colors flex items-center gap-2 shrink-0"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>{SHOP_INFO.primaryPhone}</span>
              </a>
            </div>

            {/* Inline Quick Tracking Search Box */}
            <div className="pt-4 border-t border-slate-800">
              <span className="block text-xs font-medium text-slate-400 mb-2">
                {lang === 'ne' ? 'पहिले नै फोन दिनुभएको छ? यहाँ टिकट नम्बर राख्नुहोस्:' : 'Already handed over your device? Check live status:'}
              </span>
              <form onSubmit={handleQuickTrack} className="flex max-w-md items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={quickTrackInput}
                    onChange={(e) => setQuickTrackInput(e.target.value)}
                    placeholder="Enter Ticket ID (e.g. HMR-8421)"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors shrink-0"
                >
                  {lang === 'ne' ? 'हेर्नुहोस्' : 'Track'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Realism */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl">
              <img
                src="/src/assets/images/hero_repair_lab_1793511335397.jpg"
                alt="Hamro Mobile Repair precision workstation at Shani Mandir Road"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              {/* Subtle scrim for card anchor */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Quiet anchor overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">Shani Mandir Road Lab #1</p>
                  <p className="text-slate-400 text-[11px]">Level-3 Micro-soldering Bench Active</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-emerald-400 font-semibold">90-Day Warranty</p>
                  <p className="text-slate-400 text-[11px]">ISO Tested Tools</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column Proof Row below hero split (Section 13 of design rules) */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">14,250+</p>
            <p className="text-xs text-slate-400">Mobiles Restored in Morang</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono tabular-nums">30-Mins</p>
            <p className="text-xs text-slate-400">Express Screen & Battery Fix</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">90–180 Days</p>
            <p className="text-xs text-slate-400">Written Repair Warranty</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">100% Free</p>
            <p className="text-xs text-slate-400">Diagnostics Check (No Fix, No Fee)</p>
          </div>
        </div>

      </div>
    </section>
  );
};
