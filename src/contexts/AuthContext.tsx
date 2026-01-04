import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FarmerProfile } from '@/types/farmer';

interface User {
  id: string;
  phone: string;
  email?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  profile: FarmerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, otp: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<FarmerProfile>) => void;
}

interface SignupData {
  phone: string;
  name: string;
  email?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('krishi_user');
    const storedProfile = localStorage.getItem('krishi_profile');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, otp: string): Promise<boolean> => {
    // Simulate OTP verification
    if (otp === '123456') {
      const storedProfile = localStorage.getItem('krishi_profile');
      if (storedProfile) {
        const profileData = JSON.parse(storedProfile);
        if (profileData.phone === phone) {
          const userData: User = {
            id: profileData.id,
            phone: profileData.phone,
            name: profileData.name,
            email: profileData.email,
          };
          setUser(userData);
          setProfile(profileData);
          localStorage.setItem('krishi_user', JSON.stringify(userData));
          return true;
        }
      }
      // New user login
      const newUser: User = {
        id: Date.now().toString(),
        phone,
      };
      setUser(newUser);
      localStorage.setItem('krishi_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      phone: data.phone,
      name: data.name,
      email: data.email,
    };

    const newProfile: FarmerProfile = {
      id: newUser.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      village: '',
      district: '',
      state: '',
      totalAcreage: 0,
      cropsThisYear: 0,
      cropTypes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setUser(newUser);
    setProfile(newProfile);
    localStorage.setItem('krishi_user', JSON.stringify(newUser));
    localStorage.setItem('krishi_profile', JSON.stringify(newProfile));
    return true;
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('krishi_user');
  };

  const updateProfile = (data: Partial<FarmerProfile>) => {
    if (profile) {
      const updated = { ...profile, ...data, updatedAt: new Date() };
      setProfile(updated);
      localStorage.setItem('krishi_profile', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
