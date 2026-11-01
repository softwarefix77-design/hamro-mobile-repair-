import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  AlertCircle, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  User,
  Smartphone,
  Calendar
} from 'lucide-react';
import { RepairStatus } from '../types/repair';
import { SHOP_INFO } from '../data/mockData';

const STAGES: { key: RepairStatus; label: string; labelNe: string; step: number }[] = [
  { key: 'received', label: 'Received & Logged', labelNe: 'फोन बुझिलिएको', step: 1 },
  { key: 'diagnosing', label: 'Diagnostic Testing', labelNe: 'चेकजाँच हुँदै', step: 2 },
  { key: 'repairing', label: 'Parts & Micro-soldering', labelNe: 'मर्मत भइरहेको', step: 3 },
  { key: 'testing', label: 'Quality Bench Check', labelNe: 'गुणस्तर परीक्षण', step: 4 },
  { key: 'ready', label: 'Ready for Collection', labelNe: 'लिन तयार', step: 5 },
];

export const RepairTracker: React.FC = () => {
  const { tickets, activeTrackId, setActiveTrackId, lang, setIsBookingOpen } = useRepair();
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);

  // Find currently selected ticket
  const currentTicket = tickets.find(
    (t) => t.id.toLowerCase() === (activeTrackId || '').toLowerCase()
  ) || tickets[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    const found = tickets.find(
      (t) => t.id.toUpperCase() === query || t.phone.includes(query)
    );

    if (found) {
      setActiveTrackId(found.id);
      setSearchInput('');
    } else {
      setSearchError(
        lang === 'ne' 
          ? `टिकट "${query}" फेला परेन। कृपया आफ्नो HMR-XXXX आइडी वा फोन नम्बर जाँच गर्नुहोस्।` 
          : `Ticket "${query}" not found. Please verify your HMR-XXXX ID or phone number.`
      );
    }
  };

  const getStageIndex = (status: RepairStatus): number => {
    switch (status) {
      case 'received': return 0;
      case 'diagnosing': return 1;
      case 'repairing': return 2;
      case 'testing': return 3;
      case 'ready': 
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const activeIndex = getStageIndex(currentTicket?.status || 'received');

  return (
    <section id="track" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
            <span>01. Live Diagnostic Portal</span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span className="text-slate-600">Updated in Real Time from Shani Mandir Road Bench</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ne' ? 'आफ्नो मोबाइल मर्मतको ताजा अवस्था हेर्नुहोस्' : 'Track Your Repair in Real-Time'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {lang === 'ne'
              ? 'आफ्नो रसिदमा रहेको टिकट नम्बर (जस्तै HMR-8421) वा मोबाइल नम्बर हानेर मर्मतको प्रगति हेर्नुहोस्।'
              : 'Enter your Repair Ticket ID or registered phone number to view live technician bench logs, diagnostic findings, and completion estimate.'}
          </p>
        </div>

        {/* Search Bar & Demo Ticket Selectors */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={lang === 'ne' ? 'टिकट नम्बर राख्नुहोस् (उदा. HMR-8421 वा फोन नम्बर)' : 'Search by Ticket ID (e.g. HMR-8421) or phone number'}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              {lang === 'ne' ? 'खोज्नुहोस्' : 'Track Status'}
            </button>
          </form>

          {searchError && (
            <p className="mt-2 text-xs text-rose-600 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {searchError}
            </p>
          )}

          {/* Quick Demo Tickets Switcher */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">
              {lang === 'ne' ? 'डेमो टिकट हेर्न क्लिक गर्नुहोस्:' : 'Quick demo samples:'}
            </span>
            {tickets.slice(0, 4).map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => {
                  setActiveTrackId(ticket.id);
                  setSearchError(null);
                }}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors font-mono font-medium ${
                  activeTrackId === ticket.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {ticket.id} ({ticket.deviceModel.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Main Tracking Card */}
        {currentTicket ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Top Bar of Ticket */}
            <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Repair Ticket</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-xs text-emerald-400 font-medium">Live Diagnostics</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white">
                    {currentTicket.id}
                  </span>
                  {currentTicket.urgent && (
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-500 text-slate-950 rounded">
                      PRIORITY URGENT
                    </span>
                  )}
                  {currentTicket.status === 'ready' && (
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-500 text-white rounded">
                      READY FOR PICKUP
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300">
                  Customer: <strong className="text-white">{currentTicket.customerName}</strong> · Contact: <span className="font-mono">{currentTicket.phone}</span>
                </p>
              </div>

              {/* Ready estimate & action */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-right space-y-1 shrink-0">
                <p className="text-xs text-slate-400">Estimated Ready Time</p>
                <p className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                  {currentTicket.estimatedCompletion}
                </p>
                <p className="text-[11px] text-slate-400">
                  {currentTicket.serviceType === 'pickup' ? 'Doorstep Delivery' : 'Collect at Shani Mandir Road'}
                </p>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
                Repair Lifecycle Stages
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx < activeIndex || currentTicket.status === 'delivered';
                  const isCurrent = idx === activeIndex && currentTicket.status !== 'delivered';
                  
                  return (
                    <div key={stage.key} className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stage.step}
                        </div>
                        {idx < STAGES.length - 1 && (
                          <div
                            className={`hidden sm:block h-0.5 flex-1 w-12 transition-colors ${
                              isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-xs font-semibold ${
                            isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {lang === 'ne' ? stage.labelNe : stage.label}
                        </p>
                        <p className="text-[11px] text-slate-500 hidden sm:block">
                          {isCompleted ? 'Verified' : isCurrent ? 'In progress' : 'Upcoming'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Device Details & Bench Findings */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Device & Issue Specs */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    Device & Issue Diagnosis
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Device Brand:</span>
                      <span className="font-semibold text-slate-900">{currentTicket.deviceBrand}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Model:</span>
                      <span className="font-semibold text-slate-900">{currentTicket.deviceModel}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Issue Category:</span>
                      <span className="font-semibold text-slate-900">{currentTicket.issueCategory}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Warranty Period:</span>
                      <span className="font-semibold text-emerald-600 font-mono">{currentTicket.warrantyDays} Days Written Guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Technician Notes Box */}
                <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-blue-600" />
                      Technician Bench Log
                    </span>
                    <span className="text-[11px] text-blue-700 font-medium">
                      {currentTicket.technicianName}
                    </span>
                  </div>
                  <p className="text-xs text-blue-950 leading-relaxed font-sans">
                    {currentTicket.technicianNotes}
                  </p>
                </div>

                {/* Timeline Log */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    Activity History
                  </h4>
                  <div className="space-y-3">
                    {currentTicket.timeline.map((event, idx) => (
                      <div key={idx} className="flex gap-3 text-xs">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">{event.title}</span>
                            <span className="text-slate-400 font-mono text-[11px]">{event.timestamp}</span>
                          </div>
                          <p className="text-slate-600 text-xs mt-0.5">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Cost Breakdown & Contact Direct */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Cost Card */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Cost Summary (NPR)</h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Inspection & Diagnostics:</span>
                      <span className="font-mono text-emerald-600 font-semibold">रू ० (FREE)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Hardware Parts / Sub-assembly:</span>
                      <span className="font-mono text-slate-800">रू {Math.max(0, currentTicket.estimatedCost - 800).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Precision Bench Labor:</span>
                      <span className="font-mono text-slate-800">रू ८००</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                      <span>Total Estimated Cost:</span>
                      <span className="font-mono text-blue-600 text-base">रू {currentTicket.estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    * Payment is due only after repair is completed and you have verified your device at our Shani Mandir Road counter.
                  </p>
                </div>

                {/* Direct Action with Shop */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Need instant update on this ticket?
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/${SHOP_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namaste,%20I%20am%20inquiring%20about%20my%20repair%20ticket%20${currentTicket.id}%20(${currentTicket.deviceModel})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp Shop
                    </a>
                    <a
                      href={`tel:${SHOP_INFO.primaryPhone}`}
                      className="px-3 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Tech Desk
                    </a>
                  </div>
                </div>

                {/* Service Center Address note */}
                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Hamro Mobile Repair Counter</p>
                  <p>Shani Mandir Road, Biratnagar-8 (Opposite Shani Mandir)</p>
                  <p className="text-slate-500 text-[11px] mt-1">Open: Sun–Fri 9am–8pm | Sat 10am–5pm</p>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-600">No active ticket selected.</p>
          </div>
        )}

      </div>
    </section>
  );
};
