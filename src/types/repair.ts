export type RepairStatus = 
  | 'received'
  | 'diagnosing'
  | 'repairing'
  | 'testing'
  | 'ready'
  | 'delivered';

export interface RepairTicket {
  id: string; // e.g. HMR-8421
  customerName: string;
  phone: string;
  deviceBrand: string;
  deviceModel: string;
  issueCategory: string;
  issueDescription: string;
  status: RepairStatus;
  technicianName: string;
  technicianNotes: string;
  estimatedCost: number; // in NPR (रू)
  finalCost?: number;
  partsUsed?: string[];
  warrantyDays: number;
  urgent: boolean;
  serviceType: 'walk-in' | 'pickup';
  pickupAddress?: string;
  createdAt: string; // ISO date
  updatedAt: string;
  estimatedCompletion: string;
  timeline: {
    status: RepairStatus;
    title: string;
    description: string;
    timestamp: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  titleNe: string;
  shortDesc: string;
  shortDescNe: string;
  fullDesc: string;
  fullDescNe: string;
  duration: string;
  startingPriceNPR: number;
  warranty: string;
  image?: string;
  features: string[];
  featuresNe: string[];
  highlightTag?: string;
}

export interface PriceEstimate {
  brand: string;
  model: string;
  issue: string;
  priceMin: number;
  priceMax: number;
  timeEstimate: string;
  warranty: string;
}
