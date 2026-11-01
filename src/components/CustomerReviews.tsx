import React from 'react';
import { useRepair } from '../context/RepairContext';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ShieldCheck, MapPin } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const { lang } = useRepair();

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <span>05. Real Customer Feedback</span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span>Morang & Sunsari Residents</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'ne' ? 'हाम्रा ग्राहकहरूको अनुभव र विश्वास' : 'Trusted by 14,000+ Biratnagar Locals'}
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs shrink-0">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-900 font-mono">4.9 / 5.0</span>
            <span className="text-xs text-slate-500">(1,280+ Reviews)</span>
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{lang === 'ne' ? item.textNe : item.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {item.device}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
