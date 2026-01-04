export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  village: string;
  district: string;
  state: string;
  totalAcreage: number;
  cropsThisYear: number;
  cropTypes: string[];
  cropReclamationHistory?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Crop {
  id: string;
  farmerId: string;
  name: string;
  variety?: string;
  sowingDate: Date;
  expectedHarvestDate: Date;
  acreage: number;
  yieldEstimate?: number;
  status: 'sown' | 'growing' | 'harvested' | 'failed';
  notes?: string;
}

export interface MarketPrice {
  id: string;
  cropName: string;
  variety?: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  market: string;
  state: string;
  updatedAt: Date;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  deadline?: Date;
  link?: string;
  category: 'subsidy' | 'insurance' | 'loan' | 'other';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
