"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "bn" | "en";

type LangContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: (bn: string, en: string) => string;
};

const LangContext = createContext<LangContextType>({
  lang: "bn",
  toggleLang: () => {},
  t: (bn) => bn,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("bn");

  const toggleLang = () => setLang((prev) => (prev === "bn" ? "en" : "bn"));
  const t = (bn: string, en: string) => (lang === "bn" ? bn : en);

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
