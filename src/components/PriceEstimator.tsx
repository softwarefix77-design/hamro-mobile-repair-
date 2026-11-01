import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import { POPULAR_BRANDS, BRAND_MODELS, COMMON_ISSUES } from '../data/mockData';
import { Calculator, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const PriceEstimator: React.FC = () => {
  const { lang, setIsBookingOpen, setSelectedServiceForBooking } = useRepair();

  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [selectedModel, setSelectedModel] = useState(BRAND_MODELS['Apple'][0]);
  const [selectedIssue, setSelectedIssue] = useState('screen');

  const modelsForBrand = BRAND_MODELS[selectedBrand] || ['Standard Model'];

  // Calculate dynamic price range based on model tier and issue
  const calculateEstimate = () => {
    let baseMin = 1500;
    let baseMax = 2500;
    let time = '30–45 Mins';
    let warranty = '90 Days Written Warranty';

    const isFlagship = selectedModel.includes('Pro') || selectedModel.includes('Ultra') || selectedBrand === 'Apple';

    switch (selectedIssue) {
      case 'screen':
        baseMin = isFlagship ? 9500 : 3200;
        baseMax = isFlagship ? 16500 : 5800;
        time = '45–60 Mins';
        warranty = '90 Days OLED / Touch Warranty';
        break;
      case 'battery':
        baseMin = isFlagship ? 3500 : 1800;
        baseMax = isFlagship ? 5500 : 2600;
        time = '20–30 Mins';
        warranty = '180 Days (6 Months) Replacement Warranty';
        break;
      case 'port':
        baseMin = 900;
        baseMax = 1800;
        time = '20–30 Mins';
        warranty = '90 Days Warranty';
        break;
      case 'water':
        baseMin = 1800;
        baseMax = 4500;
        time = '2–4 Hours';
        warranty = '30 Days Clean Bench Guarantee';
        break;
      case 'board':
        baseMin = isFlagship ? 4500 : 2500;
        baseMax = isFlagship ? 9500 : 5000;
        time = 'Same Day (3–6 Hours)';
        warranty = '60 Days Chip-Level Warranty';
        break;
      case 'speaker':
        baseMin = 800;
        baseMax = 1600;
        time = '20–30 Mins';
        warranty = '90 Days Warranty';
        break;
      case 'camera':
        baseMin = isFlagship ? 3800 : 1600;
        baseMax = isFlagship ? 7200 : 3200;
        time = '30–45 Mins';
        warranty = '90 Days Warranty';
        break;
      case 'software':
        baseMin = 700;
        baseMax = 1500;
        time = '30–45 Mins';
        warranty = 'Official OS Verification';
        break;
    }

    return { min: baseMin, max: baseMax, time, warranty };
  };

  const estimate = calculateEstimate();

  const handleBookNow = () => {
    setSelectedServiceForBooking(`${selectedBrand} ${selectedModel} - ${COMMON_ISSUES.find(i => i.id === selectedIssue)?.label}`);
    setIsBookingOpen(true);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
            <span>03. Transparent Pricing Engine</span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span>No Hidden Surcharges</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ne' ? 'अनलाइन मूल्य अनुमान क्यालकुलेटर' : 'Instant Repair Cost Estimator'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {lang === 'ne'
              ? 'आफ्नो मोबाइलको ब्रान्ड, मोडल र समस्या छान्नुहोस् र तत्काल अनुमानित शुल्क तथा लाग्ने समय हेर्नुहोस्।'
              : 'Select your smartphone brand, model, and the issue to check typical repair costs in Nepali Rupees (NPR / रू) before visiting our Shani Mandir Road lab.'}
          </p>
        </div>

        {/* Interactive Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls: Brand, Model, Issue */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Step 1: Brand Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                1. Select Smartphone Brand
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {POPULAR_BRANDS.slice(0, 8).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedModel(BRAND_MODELS[brand]?.[0] || 'Standard Model');
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                      selectedBrand === brand
                        ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-bold shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Model Dropdown / Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                2. Select Specific Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {modelsForBrand.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Issue Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                3. Select Phone Issue
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COMMON_ISSUES.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue.id)}
                    className={`p-3 text-left rounded-lg border text-xs transition-all ${
                      selectedIssue === issue.id
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-medium ring-1 ring-blue-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-900">
                      {lang === 'ne' ? issue.labelNe : issue.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                  Estimated Repair Quote
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedBrand} {selectedModel}
                </h3>
                <p className="text-xs text-slate-400">
                  {COMMON_ISSUES.find(i => i.id === selectedIssue)?.label}
                </p>
              </div>

              {/* Price Range Display */}
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400">Estimated Price Range:</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  रू {estimate.min.toLocaleString()} – रू {estimate.max.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-400">
                  ✓ Includes Free Diagnostic Bench Check
                </p>
              </div>

              {/* Turnaround & Warranty details */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Turnaround Time: <strong className="text-white font-mono">{estimate.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Coverage: <strong className="text-white">{estimate.warranty}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Original Grade OEM Parts & Factory Adhesives</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleBookNow}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <span>{lang === 'ne' ? 'यो मूल्यमा बुकिङ गर्नुहोस्' : 'Book with this Estimate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-tight">
                No upfront payment required. Bring your phone to our Shani Mandir Road branch or request doorstep pickup.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
