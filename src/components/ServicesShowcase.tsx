import React from 'react';
import { useRepair } from '../context/RepairContext';
import { SERVICES_CATALOG } from '../data/mockData';
import { Clock, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const ServicesShowcase: React.FC = () => {
  const { lang, setIsBookingOpen, setSelectedServiceForBooking } = useRepair();

  const handleBookService = (serviceTitle: string) => {
    setSelectedServiceForBooking(serviceTitle);
    setIsBookingOpen(true);
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <span>02. Certified Repair Services</span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span>Fast-Track Turnaround on Shani Mandir Road</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'ne' 
                ? 'हाम्रा छिटो र भरपर्दो मर्मत सेवाहरू' 
                : 'Fast, Certified Hardware & Chip-Level Repairs'}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {lang === 'ne'
                ? 'प्रत्येक मर्मतमा सक्कली पार्टपुर्जा, आधुनिक उपकरण तथा लिखित वारेन्टी प्रदान गरिन्छ। धेरैजसो समस्या ३० देखि ४५ मिनेटमै समाधान हुन्छ।'
                : 'Every repair is performed with factory-spec original parts, micro-soldering precision, and written warranties. 80% of jobs completed within 45 minutes.'}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              {lang === 'ne' ? 'सबै सेवाहरूको बुकिङ' : 'Book Any Service'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento Grid layout with Asymmetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_CATALOG.map((service, index) => {
            const isMarquee = index === 0 || index === 1;

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all ${
                  isMarquee ? 'lg:col-span-1 shadow-sm' : ''
                }`}
              >
                <div>
                  {/* Visual Image slot if present */}
                  {service.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-md">
                        {service.duration}
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Editorial Numbering & Tag */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-slate-900">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      {service.highlightTag && (
                        <span className="text-[11px] font-medium text-blue-600 font-mono">
                          {service.highlightTag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {lang === 'ne' ? service.titleNe : service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                      {lang === 'ne' ? service.shortDescNe : service.shortDesc}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-700">
                      {(lang === 'ne' ? service.featuresNe : service.features).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Starting from</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                        रू {service.startingPriceNPR.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBookService(service.title)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>{lang === 'ne' ? 'बुक गर्नुहोस्' : 'Book Repair'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{service.warranty}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Why Choose Hamro Mobile Repair Strip */}
        <div className="mt-14 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                30-Minute Fast Track Desk
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Common repairs like battery swaps, screens, charging docks, and speaker meshes are completed in under 45 minutes while you wait in our air-conditioned reception.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                No Fix, No Fee Guarantee
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We believe in 100% transparent diagnostics. If our technicians cannot resolve your device's motherboard or hardware fault, you pay रू 0.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Direct Shani Mandir Road Access
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Central Biratnagar location with easy 2-wheeler and 4-wheeler parking. Free express delivery pickup available across Morang & Sunsari.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
