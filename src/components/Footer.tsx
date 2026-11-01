import React from 'react';
import { useRepair } from '../context/RepairContext';
import { SHOP_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setIsBookingOpen, setIsAdminOpen } = useRepair();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <a href="#" className="text-base font-extrabold text-white tracking-tight">
              Hamro Mobile Repair
            </a>
            <p className="text-slate-400 text-xs leading-relaxed">
              {lang === 'ne'
                ? 'विराटनगरको अग्रणी स्मार्टफोन तथा ट्याब्लेट चिप-लेभल मर्मत केन्द्र। शनि मन्दिर रोडमा अवस्थित।'
                : "Biratnagar's specialized smartphone & tablet micro-soldering clinic. Reliable, fast, and guaranteed since 2017."}
            </p>
            <div className="pt-1 flex items-center gap-2 text-slate-500 text-[11px]">
              <span>Registration No: 48920/074</span>
              <span aria-hidden="true">·</span>
              <span>PAN: 602391024</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </p>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  All Repair Services
                </a>
              </li>
              <li>
                <a href="#track" className="hover:text-white transition-colors">
                  Live Status Tracking
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Instant Price Estimator
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Location & Directions
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Workshop Hours */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Workshop Location
            </p>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>
                  Shani Mandir Road, Ward-8, Biratnagar, Morang, Nepal (Opposite Shani Mandir)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p>Sun–Fri: 9:00 AM – 8:00 PM</p>
                  <p>Saturday: 10:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Hotline */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${SHOP_INFO.primaryPhone}`}
                className="flex items-center gap-2 hover:text-white transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Call: {SHOP_INFO.primaryPhone}</span>
              </a>
              <a
                href={`https://wa.me/${SHOP_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namaste!%20Inquiry%20for%20Hamro%20Mobile%20Repair%20Biratnagar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>WhatsApp: {SHOP_INFO.whatsapp}</span>
              </a>
              <a
                href={`tel:${SHOP_INFO.secondaryPhone}`}
                className="flex items-center gap-2 hover:text-white transition-colors font-mono text-slate-500"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{SHOP_INFO.secondaryPhone} (Landline)</span>
              </a>
              <div className="pt-2">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded text-xs transition-colors"
                >
                  Book a Repair Online
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Hamro Mobile Repair. Shani Mandir Road, Biratnagar, Nepal. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-500 hover:text-slate-300 transition-colors underline decoration-slate-700"
            >
              Technician Portal
            </button>
            <span aria-hidden="true">·</span>
            <span>Privacy & Warranty Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
