import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import { SHOP_INFO } from '../data/mockData';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Mail, 
  Navigation, 
  Send,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { lang, showToast } = useRepair();
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;
    setCallbackSent(true);
    showToast(lang === 'ne' 
      ? 'धन्यवाद! हाम्रो प्राविधिकले १० मिनेटभित्र तपाईंलाई फोन गर्नेछ।' 
      : 'Callback requested! Our technician will call you within 10 minutes.');
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
            <span>04. Shop Location & Contact</span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span>Heart of Biratnagar</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ne' ? 'शनि मन्दिर रोड, विराटनगरमा हामीलाई भेट्नुहोस्' : 'Visit Our Shani Mandir Road Lab'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'ne'
              ? 'विराटनगर मेन रोडबाट १०० मिटर पश्चिम, शनि मन्दिरको ठीक अगाडि। सहज पार्किङ र तुरुन्त मर्मत सुविधा।'
              : 'Conveniently situated 100 meters west of Biratnagar Main Road, directly opposite Shani Mandir. Ample parking for two-wheelers and cars.'}
          </p>
        </div>

        {/* 2-Column Split: Contact Details & Shop Visual on Left, Interactive Map & Callback on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Shop Front Photo */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Visual Shop Reception Photo */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <img
                src="/src/assets/images/shop_front_biratnagar_1793511336324.jpg"
                alt="Hamro Mobile Repair customer reception counter at Shani Mandir Road, Biratnagar"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-medium">
                Customer Reception & Intake Counter · Shani Mandir Road
              </div>
            </div>

            {/* Address & Hours Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  Address & Landmark
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {SHOP_INFO.location}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {SHOP_INFO.landmark}
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  Working Hours
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-slate-900 font-medium">{SHOP_INFO.openingHours.weekdays}</p>
                  <p className="text-slate-600">{SHOP_INFO.openingHours.saturday}</p>
                  <span className="inline-block mt-1 text-[11px] text-emerald-600 font-semibold font-mono">
                    Emergency repairs on-call
                  </span>
                </div>
              </div>

            </div>

            {/* Direct Connect Buttons */}
            <div className="p-5 bg-slate-900 text-white rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Phone & WhatsApp Hotline</h4>
                  <p className="text-xs text-slate-400">Speak directly with our senior technician</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Open Now</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${SHOP_INFO.primaryPhone}`}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {SHOP_INFO.primaryPhone}</span>
                </a>

                <a
                  href={`https://wa.me/${SHOP_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namaste!%20I%20need%20mobile%20repair%20information%20at%20Hamro%20Mobile%20Repair%20Shani%20Mandir%20Road.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ({SHOP_INFO.whatsapp})</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Simulated Biratnagar Map & Quick Callback */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Simulated Map Card */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  Biratnagar Local Route Guide
                </div>
                <a
                  href="https://maps.google.com/?q=Shani+Mandir+Road+Biratnagar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>

              {/* Graphic Map Canvas Illustration */}
              <div className="relative h-64 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 p-4 flex flex-col justify-between">
                {/* Street Grid Graphic */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Road overlays */}
                <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-slate-300 border-x border-slate-400 transform -skew-x-6 flex items-center justify-center">
                  <span className="text-[10px] text-slate-500 font-mono rotate-90 whitespace-nowrap">
                    Main Road (Traffic Chowk ➔ Rani)
                  </span>
                </div>

                <div className="absolute top-1/2 left-0 right-0 h-10 bg-slate-300 border-y border-slate-400 flex items-center px-4">
                  <span className="text-[10px] text-slate-600 font-mono font-medium">
                    Shani Mandir Road
                  </span>
                </div>

                {/* Landmark Pins */}
                <div className="relative z-10 flex justify-between text-xs">
                  <div className="bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-300 text-[11px] font-medium text-slate-700 shadow-xs">
                    Traffic Chowk (5 mins)
                  </div>
                  <div className="bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-300 text-[11px] font-medium text-slate-700 shadow-xs">
                    City Center / Roadcess
                  </div>
                </div>

                {/* Primary Destination Pin */}
                <div className="relative z-10 self-center bg-blue-600 text-white px-3 py-2 rounded-xl shadow-lg border-2 border-white flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <p className="font-bold text-xs leading-none">Hamro Mobile Repair</p>
                    <p className="text-[10px] text-blue-100">Opposite Shani Mandir</p>
                  </div>
                </div>

                <div className="relative z-10 flex justify-between text-xs">
                  <div className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-medium border border-amber-300">
                    Shani Mandir Temple
                  </div>
                  <div className="bg-white/90 px-2 py-0.5 rounded text-[10px] text-slate-600 border border-slate-300">
                    To Bargachhi Chowk
                  </div>
                </div>
              </div>

              {/* Transit Distances */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-800">2 Mins</p>
                  <p className="text-[10px] text-slate-500">Walk from Main Road</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-800">5 Mins</p>
                  <p className="text-[10px] text-slate-500">From Traffic Chowk</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-800">Free</p>
                  <p className="text-[10px] text-slate-500">Customer Parking</p>
                </div>
              </div>
            </div>

            {/* Request a 10-Min Callback Card */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Request an Instant Callback</h4>
                <p className="text-xs text-slate-600">
                  Leave your number and a technician will call you back with advice & cost estimates.
                </p>
              </div>

              {callbackSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Request received! We will call you within 10 minutes during working hours.</span>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="Your Name"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="tel"
                      required
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="Your Phone Number"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Free Callback</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
