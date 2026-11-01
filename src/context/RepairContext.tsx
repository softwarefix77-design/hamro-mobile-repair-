import React, { createContext, useContext, useState, useEffect } from 'react';
import { RepairTicket, RepairStatus } from '../types/repair';
import { INITIAL_TICKETS } from '../data/mockData';

interface BookingPayload {
  customerName: string;
  phone: string;
  deviceBrand: string;
  deviceModel: string;
  issueCategory: string;
  issueDescription: string;
  urgent: boolean;
  serviceType: 'walk-in' | 'pickup';
  pickupAddress?: string;
  preferredDate?: string;
  preferredTime?: string;
}

interface RepairContextType {
  tickets: RepairTicket[];
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
  lang: 'en' | 'ne';
  setLang: (lang: 'en' | 'ne') => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedServiceForBooking: string | null;
  setSelectedServiceForBooking: (service: string | null) => void;
  addBooking: (payload: BookingPayload) => RepairTicket;
  updateTicket: (id: string, updates: Partial<RepairTicket>) => void;
  advanceTicketStatus: (id: string, newStatus: RepairStatus, note?: string) => void;
  resetToDefaultData: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'hamro_mobile_repair_tickets_v1';
const LANG_KEY = 'hamro_mobile_repair_lang_v1';

const RepairContext = createContext<RepairContextType | undefined>(undefined);

export const RepairProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<RepairTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_TICKETS;
  });

  const [activeTrackId, setActiveTrackId] = useState<string | null>('HMR-8421');
  const [lang, setLangState] = useState<'en' | 'ne'>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_KEY);
      return (savedLang === 'ne' ? 'ne' : 'en');
    } catch {
      return 'en';
    }
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to localStorage', e);
    }
  }, [tickets]);

  const setLang = (newLang: 'en' | 'ne') => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_KEY, newLang);
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const addBooking = (payload: BookingPayload): RepairTicket => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `HMR-${randomNum}`;

    // Base estimated cost based on issue
    let estCost = 2500;
    if (payload.issueCategory.toLowerCase().includes('screen')) estCost = 4500;
    else if (payload.issueCategory.toLowerCase().includes('battery')) estCost = 2200;
    else if (payload.issueCategory.toLowerCase().includes('board') || payload.issueCategory.toLowerCase().includes('chip')) estCost = 3500;
    else if (payload.issueCategory.toLowerCase().includes('port') || payload.issueCategory.toLowerCase().includes('sound')) estCost = 1200;

    const newTicket: RepairTicket = {
      id: newId,
      customerName: payload.customerName,
      phone: payload.phone,
      deviceBrand: payload.deviceBrand,
      deviceModel: payload.deviceModel,
      issueCategory: payload.issueCategory,
      issueDescription: payload.issueDescription || 'Repair booking submitted via online portal.',
      status: 'received',
      technicianName: 'Sanjay Thapa / Bikash Shrestha (Bench Queue)',
      technicianNotes: payload.urgent
        ? 'MARKED URGENT. Scheduled for immediate bench intake upon customer arrival.'
        : 'Ticket booked online. Waiting for device handover at Shani Mandir Road branch.',
      estimatedCost: estCost,
      warrantyDays: payload.issueCategory.toLowerCase().includes('battery') ? 180 : 90,
      urgent: payload.urgent,
      serviceType: payload.serviceType,
      pickupAddress: payload.pickupAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedCompletion: 'Today (Within 2–4 hours)',
      timeline: [
        {
          status: 'received',
          title: payload.serviceType === 'pickup' ? 'Pickup Scheduled' : 'Online Appointment Booked',
          description: payload.serviceType === 'pickup'
            ? `Pickup requested at ${payload.pickupAddress || 'Biratnagar'}. Our rider will contact you.`
            : `Booking confirmed for ${payload.preferredDate || 'Today'} at Shani Mandir Road service center.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);
    setActiveTrackId(newId);
    showToast(lang === 'ne' 
      ? `बुकिङ सफल भयो! तपाईंको टिकट नम्बर ${newId} हो।` 
      : `Booking Confirmed! Your Ticket ID is ${newId}.`);
    return newTicket;
  };

  const updateTicket = (id: string, updates: Partial<RepairTicket>) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t))
    );
  };

  const advanceTicketStatus = (id: string, newStatus: RepairStatus, note?: string) => {
    const statusTitles: Record<RepairStatus, { title: string; description: string }> = {
      received: {
        title: 'Device Checked In',
        description: 'Physical inspection completed at Shani Mandir Road desk.',
      },
      diagnosing: {
        title: 'Diagnostic Bench Inspection',
        description: 'Component diagnostics & microscope inspection in progress.',
      },
      repairing: {
        title: 'Repair & Parts Replacement',
        description: 'Precision hardware replacement / micro-soldering currently active.',
      },
      testing: {
        title: '18-Point Quality Bench Check',
        description: 'Testing touch calibration, sensors, battery drain, and thermal safety.',
      },
      ready: {
        title: 'Ready for Pickup / Delivery',
        description: 'Repair completed successfully. Device cleaned and ready for collection.',
      },
      delivered: {
        title: 'Delivered / Handed Over',
        description: 'Device returned to customer with warranty certificate and invoice.',
      },
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const info = statusTitles[newStatus];
        const newTimelineEvent = {
          status: newStatus,
          title: info.title,
          description: note || info.description,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
        };

        return {
          ...t,
          status: newStatus,
          technicianNotes: note || t.technicianNotes,
          updatedAt: new Date().toISOString(),
          timeline: [...t.timeline, newTimelineEvent],
        };
      })
    );

    showToast(`Status updated to ${newStatus.toUpperCase()} for ticket ${id}`);
  };

  const resetToDefaultData = () => {
    setTickets(INITIAL_TICKETS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Demo tickets reset to factory default.');
  };

  return (
    <RepairContext.Provider
      value={{
        tickets,
        activeTrackId,
        setActiveTrackId,
        lang,
        setLang,
        isBookingOpen,
        setIsBookingOpen,
        isAdminOpen,
        setIsAdminOpen,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        addBooking,
        updateTicket,
        advanceTicketStatus,
        resetToDefaultData,
        toast,
        showToast,
      }}
    >
      {children}
    </RepairContext.Provider>
  );
};

export const useRepair = () => {
  const context = useContext(RepairContext);
  if (!context) throw new Error('useRepair must be used within RepairProvider');
  return context;
};
