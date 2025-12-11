import React, { createContext, useState, useContext } from "react";
// Import kamus kata yang sudah Anda buat
import { translations } from "../utils/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 1. Ambil dari LocalStorage, default 'id'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("turbiq_language") || "id";
  });

  // 2. Fungsi Ganti Bahasa (Tanpa Reload!)
  const toggleLanguage = () => {
    const newLang = language === "id" ? "en" : "id";
    setLanguage(newLang);
    localStorage.setItem("turbiq_language", newLang);
  };

  // 3. Fungsi Translate (t) yang Reaktif (Otomatis berubah)
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
