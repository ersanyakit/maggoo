"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Global state tipi
interface GlobalState {
  postData: any;
  setPostData: React.Dispatch<React.SetStateAction<any>>;
}

// Başlangıç değeriyle context oluştur
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// Provider bileşeni
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [postData, setPostData] = useState<any>(null); // Post edilen veri için state

  return (
    <GlobalStateContext.Provider value={{ postData, setPostData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook ile context'e erişim
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};