"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";

import { defaultPortfolioData, portfolioStorageKey, type PortfolioData } from "@/data/portfolio";

type PortfolioContextValue = {
  portfolio: PortfolioData;
  savePortfolio: (nextPortfolio: PortfolioData) => void;
  resetPortfolio: () => void;
  hydrated: boolean;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

function normalizePortfolio(rawPortfolio: PortfolioData) {
  const nextPortfolio: PortfolioData = {
    ...defaultPortfolioData,
    ...rawPortfolio,
    aboutStory: rawPortfolio.aboutStory ?? defaultPortfolioData.aboutStory,
    stats: rawPortfolio.stats ?? defaultPortfolioData.stats,
    skills: rawPortfolio.skills ?? defaultPortfolioData.skills,
    experience: rawPortfolio.experience ?? defaultPortfolioData.experience,
    projects: rawPortfolio.projects ?? defaultPortfolioData.projects,
    certifications: rawPortfolio.certifications ?? defaultPortfolioData.certifications,
    contact: {
      ...defaultPortfolioData.contact,
      ...rawPortfolio.contact
    }
  };

  if (nextPortfolio.contact.emails.some((email) => email.includes("example.com"))) {
    nextPortfolio.contact.emails = defaultPortfolioData.contact.emails;
  }

  if (nextPortfolio.name === "Arjun K") {
    nextPortfolio.name = defaultPortfolioData.name;
  }

  if (nextPortfolio.fullName === "Kanta Leela Trilok Arjun") {
    nextPortfolio.fullName = defaultPortfolioData.fullName;
  }

  if (nextPortfolio.contact.phone === "+91 90000 00000") {
    nextPortfolio.contact.phone = defaultPortfolioData.contact.phone;
  }

  if (nextPortfolio.contact.location === "India") {
    nextPortfolio.contact.location = defaultPortfolioData.contact.location;
  }

  if (nextPortfolio.contact.github?.includes("your-github")) {
    delete nextPortfolio.contact.github;
  }

  if (nextPortfolio.contact.linkedin?.includes("your-linkedin")) {
    delete nextPortfolio.contact.linkedin;
  }

  return nextPortfolio;
}

export function PortfolioProvider({ children }: PropsWithChildren) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolioData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(portfolioStorageKey);
      if (raw) {
        setPortfolio(normalizePortfolio(JSON.parse(raw) as PortfolioData));
      }
    } catch (error) {
      console.error("Failed to load portfolio content", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  const savePortfolio = useCallback((nextPortfolio: PortfolioData) => {
    const normalized = normalizePortfolio(nextPortfolio);
    setPortfolio(normalized);
    window.localStorage.setItem(portfolioStorageKey, JSON.stringify(normalized));
  }, []);

  const resetPortfolio = useCallback(() => {
    setPortfolio(defaultPortfolioData);
    window.localStorage.removeItem(portfolioStorageKey);
  }, []);

  const value = useMemo(
    () => ({ portfolio, savePortfolio, resetPortfolio, hydrated }),
    [hydrated, portfolio, resetPortfolio, savePortfolio]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }

  return context;
}
