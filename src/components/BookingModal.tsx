import React, { useState, useEffect } from 'react';
import { useRepair } from '../context/RepairContext';
import { X, CheckCircle, Smartphone, Calendar, User, MapPin, AlertCircle, ArrowRight, Printer } from 'lucide-react';
import { POPULAR_BRANDS, BRAND_MODELS, COMMON_ISSUES, SHOP_INFO } from '../data/mockData';
import { RepairTicket } from '../types/repair';

export const BookingModal: React.FC = () => {
  const { 
    isBookingOpen, 
    setIsBookingOpen, 
    addBooking, 
    lang, 
    selectedServiceForBooking, 
    setSelectedServiceForBooking,
    setActiveTrackId
  } = useRepair();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('Apple');
  const [deviceModel, setDeviceModel] = useState('');
  const [issueCategory, setIssueCategory] = useState(COMMON_ISSUES[0].label);
  const [issueDescription, setIssueDescription] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [serviceType, setServiceType] = useState<'walk-in' | 'pickup'>('walk-in');
  const [pickupAddress, setPickupAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('Today');
  const [preferredTime, setPreferredTime] = useState('11:00 AM - 01:00 PM');

  const [createdTicket, setCreatedTicket] = useState<RepairTicket | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Set defaults when opening or when selectedServiceForBooking changes
  useEffect(() => {
    if (selectedServiceForBooking) {
      setIssueDescription(`Booking for ${selectedServiceForBooking}`);
    }
  }, [selectedServiceForBooking]);

  useEffect(() => {
    if (BRAND_MODELS[deviceBrand]?.[0]) {
      setDeviceModel(BRAND_MODELS[deviceBrand][0]);
    }
  }, [deviceBrand]);

  if (!isBookingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!customerName.trim()) {
      setErrorMsg(lang === 'ne' ? 'कृपया आफ्नो पूरा नाम लेख्नुहोस्।' : 'Please enter your full name.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg(lang === 'ne' ? 'कृपया मान्य मोबाइल नम्बर राख्नुहोस्।' : 'Please enter a valid phone number (at least 8-10 digits).');
      return;
    }

    if (serviceType === 'pickup' && !pickupAddress.trim()) {
      setErrorMsg(lang === 'ne' ? 'कृपया पिकअप ठेगाना (जस्तै ट्राफिक चोक वा मेन रोड) लेख्नुहोस्।' : 'Please provide a pickup address in Biratnagar.');
      return;
    }

    const ticket = addBooking({
      customerName: customerName.trim(),
      phone: phone.trim(),
      deviceBrand,
      deviceModel: deviceModel || 'Smartphone',
      issueCategory,
      issueDescription: issueDescription.trim() || 'General diagnosis and repair request.',
      urgent,
      serviceType,
      pickupAddress: serviceType === 'pickup' ? pickupAddress.trim() : undefined,
      preferredDate,
      preferredTime,
    });

    setCreatedTicket(ticket);
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setCreatedTicket(null);
    setSelectedServiceForBooking(null);
    setErrorMsg(null);
  };

  const handleGoToTracking = () => {
    if (createdTicket) {
      setActiveTrackId(createdTicket.id);
    }
    handleClose();
    const trackElem = document.getElementById('track');
    if (trackElem) {
      trackElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {createdTicket 
                ? (lang === 'ne' ? 'बुकिङ रसिद तथा पुष्टिकरण' : 'Booking Confirmation & Voucher') 
                : (lang === 'ne' ? 'मोबाइल मर्मत बुकिङ फारम' : 'Book a Mobile Repair')}
            </h3>
            <p className="text-xs text-slate-400">
              Hamro Mobile Repair · Shani Mandir Road, Biratnagar
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If successfully booked: Show Confirmation Receipt */}
        {createdTicket ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">
                {lang === 'ne' ? 'बुकिङ सफलतापूर्वक सम्पन्न भयो!' : 'Repair Booked Successfully!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your repair ticket has been registered in our workshop queue. Please bring or keep this Ticket ID for tracking.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Your Ticket Number</span>
                  <span className="text-2xl font-extrabold text-blue-600 font-mono">{createdTicket.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Date</span>
                  <span className="text-xs font-mono text-slate-800">
                    {new Date(createdTicket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Customer:</span>
                  <strong className="text-slate-900">{createdTicket.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Contact Phone:</span>
                  <span className="font-mono text-slate-800">{createdTicket.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Device:</span>
                  <strong className="text-slate-900">{createdTicket.deviceBrand} {createdTicket.deviceModel}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Estimated Cost:</span>
                  <span className="font-mono font-bold text-emerald-600">रू {createdTicket.estimatedCost.toLocaleString()}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Service Method:</span>
                  <span className="text-slate-800">
                    {createdTicket.serviceType === 'pickup' 
                      ? `Doorstep Pickup at ${createdTicket.pickupAddress}` 
                      : 'Store Walk-in at Shani Mandir Road, Biratnagar'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Free Diagnostics · 90-Day Written Warranty</span>
                <span className="text-blue-600 font-medium">Hamro Mobile Repair</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoToTracking}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Track This Ticket Live</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-blue-600" />
                1. Customer Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9801234567"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Device Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                2. Device & Fault Description
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Brand</label>
                  <select
                    value={deviceBrand}
                    onChange={(e) => setDeviceBrand(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  >
                    {POPULAR_BRANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Specific Model</label>
                  <input
                    type="text"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="e.g. iPhone 13 / Redmi Note 12"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Problem</label>
                <select
                  value={issueCategory}
                  onChange={(e) => setIssueCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {COMMON_ISSUES.map((issue) => (
                    <option key={issue.id} value={issue.label}>
                      {issue.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Additional Notes / Symptoms
                </label>
                <textarea
                  rows={2}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Tell us what happened (e.g. dropped on floor, water spill, touchscreen unresponsive)..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Service Type & Schedule */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                3. Service Location & Schedule
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType('walk-in')}
                  className={`p-3 text-left rounded-xl border text-xs transition-all ${
                    serviceType === 'walk-in'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-600'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-slate-900">Store Walk-in</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Shani Mandir Road, Biratnagar</p>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('pickup')}
                  className={`p-3 text-left rounded-xl border text-xs transition-all ${
                    serviceType === 'pickup'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-600'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-slate-900">Doorstep Pickup</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Free inside Biratnagar city</p>
                </button>
              </div>

              {serviceType === 'pickup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Pickup Location / Landmark in Biratnagar *
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="e.g. Near Bargachhi Chowk / Behind Everest Bank"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Day</label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Day after tomorrow">Day after tomorrow</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="09:00 AM - 11:00 AM">Morning (9:00 AM – 11:00 AM)</option>
                    <option value="11:00 AM - 01:00 PM">Midday (11:00 AM – 1:00 PM)</option>
                    <option value="02:00 PM - 05:00 PM">Afternoon (2:00 PM – 5:00 PM)</option>
                    <option value="05:00 PM - 08:00 PM">Evening (5:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Urgent Priority Checkbox */}
              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-amber-200 bg-amber-50/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-amber-950 block">Mark as Urgent (Express Fast-Track)</span>
                  <span className="text-[11px] text-amber-800">Technician prioritizes your phone on bench for immediate 30-min turnaround.</span>
                </div>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
              >
                Confirm Booking
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
