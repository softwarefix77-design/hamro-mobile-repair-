/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RepairProvider, useRepair } from './context/RepairContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RepairTracker } from './components/RepairTracker';
import { ServicesShowcase } from './components/ServicesShowcase';
import { PriceEstimator } from './components/PriceEstimator';
import { ContactSection } from './components/ContactSection';
import { CustomerReviews } from './components/CustomerReviews';
import { BookingModal } from './components/BookingModal';
import { TechnicianAdminDrawer } from './components/TechnicianAdminDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toast } = useRepair();
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <p className="text-xs font-medium leading-relaxed">{toast}</p>
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <RepairTracker />
        <ServicesShowcase />
        <PriceEstimator />
        <ContactSection />
        <CustomerReviews />
      </main>

      <Footer />

      {/* Interactive Modals & Drawers */}
      <BookingModal />
      <TechnicianAdminDrawer />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <RepairProvider>
      <MainContent />
    </RepairProvider>
  );
}
