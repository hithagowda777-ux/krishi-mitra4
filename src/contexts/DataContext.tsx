import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Crop, MarketPrice, GovernmentScheme } from '@/types/farmer';

interface DataContextType {
  crops: Crop[];
  marketPrices: MarketPrice[];
  schemes: GovernmentScheme[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (id: string, data: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample market prices data
const sampleMarketPrices: MarketPrice[] = [
  { id: '1', cropName: 'Rice (Paddy)', variety: 'Common', minPrice: 2200, maxPrice: 2800, modalPrice: 2500, market: 'Hubli', state: 'Karnataka', updatedAt: new Date() },
  { id: '2', cropName: 'Wheat', variety: 'Lok-1', minPrice: 2400, maxPrice: 2800, modalPrice: 2600, market: 'Bangalore', state: 'Karnataka', updatedAt: new Date() },
  { id: '3', cropName: 'Maize', variety: 'Yellow', minPrice: 1800, maxPrice: 2200, modalPrice: 2000, market: 'Mysore', state: 'Karnataka', updatedAt: new Date() },
  { id: '4', cropName: 'Cotton', variety: 'Long Staple', minPrice: 6500, maxPrice: 7500, modalPrice: 7000, market: 'Raichur', state: 'Karnataka', updatedAt: new Date() },
  { id: '5', cropName: 'Sugarcane', variety: 'CO-0238', minPrice: 350, maxPrice: 450, modalPrice: 400, market: 'Belgaum', state: 'Karnataka', updatedAt: new Date() },
  { id: '6', cropName: 'Groundnut', variety: 'Bold', minPrice: 5500, maxPrice: 6500, modalPrice: 6000, market: 'Davangere', state: 'Karnataka', updatedAt: new Date() },
  { id: '7', cropName: 'Soybean', variety: 'Yellow', minPrice: 4200, maxPrice: 4800, modalPrice: 4500, market: 'Gulbarga', state: 'Karnataka', updatedAt: new Date() },
  { id: '8', cropName: 'Jowar (Sorghum)', variety: 'Hybrid', minPrice: 2800, maxPrice: 3400, modalPrice: 3100, market: 'Bijapur', state: 'Karnataka', updatedAt: new Date() },
];

// Sample government schemes
const sampleSchemes: GovernmentScheme[] = [
  {
    id: '1',
    name: 'PM-KISAN',
    description: 'Direct income support of ₹6,000 per year to eligible farmer families',
    benefits: ['₹6,000 per year in 3 installments', 'Direct bank transfer', 'No intermediaries'],
    eligibility: ['Land-owning farmer families', 'Valid Aadhaar card', 'Bank account linked to Aadhaar'],
    category: 'subsidy',
    link: 'https://pmkisan.gov.in/',
  },
  {
    id: '2',
    name: 'PM Fasal Bima Yojana',
    description: 'Crop insurance scheme providing financial support in case of crop failure',
    benefits: ['Coverage against natural calamities', 'Low premium rates', 'Quick claim settlement'],
    eligibility: ['All farmers growing notified crops', 'Both loanee and non-loanee farmers', 'Land records required'],
    deadline: new Date('2025-03-31'),
    category: 'insurance',
    link: 'https://pmfby.gov.in/',
  },
  {
    id: '3',
    name: 'Kisan Credit Card',
    description: 'Easy access to credit for agricultural needs',
    benefits: ['Up to ₹3 lakh loan at 4% interest', 'Flexible repayment', 'Insurance coverage included'],
    eligibility: ['Farmers, sharecroppers, tenant farmers', 'Self-help groups', 'Joint liability groups'],
    category: 'loan',
  },
  {
    id: '4',
    name: 'Soil Health Card Scheme',
    description: 'Free soil testing and recommendations for better crop yield',
    benefits: ['Free soil analysis', 'Fertilizer recommendations', 'Improved crop productivity'],
    eligibility: ['All farmers', 'No cost involved'],
    category: 'other',
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [crops, setCrops] = useState<Crop[]>(() => {
    const stored = localStorage.getItem('krishi_crops');
    return stored ? JSON.parse(stored) : [];
  });

  const addCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: Date.now().toString(),
    };
    const updated = [...crops, newCrop];
    setCrops(updated);
    localStorage.setItem('krishi_crops', JSON.stringify(updated));
  };

  const updateCrop = (id: string, data: Partial<Crop>) => {
    const updated = crops.map(crop =>
      crop.id === id ? { ...crop, ...data } : crop
    );
    setCrops(updated);
    localStorage.setItem('krishi_crops', JSON.stringify(updated));
  };

  const deleteCrop = (id: string) => {
    const updated = crops.filter(crop => crop.id !== id);
    setCrops(updated);
    localStorage.setItem('krishi_crops', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider
      value={{
        crops,
        marketPrices: sampleMarketPrices,
        schemes: sampleSchemes,
        addCrop,
        updateCrop,
        deleteCrop,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
