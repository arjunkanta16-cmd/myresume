"use client";
import { useEffect, useState } from "react";

import { AdminPanel } from "@/components/admin/admin-panel";
import { DarkModeScene } from "@/components/space/dark-mode-scene";
import { AboutSection } from "@/components/sections/about-section";
import { CareerGoalSection } from "@/components/sections/career-goal-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ThinkingSection } from "@/components/sections/thinking-section";
import { Footer } from "@/components/ui/footer";
import { NavBar } from "@/components/ui/nav-bar";

export function PortfolioShell() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.shiftKey && event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setIsAdminOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <DarkModeScene />
      <div className="relative z-10">
        <NavBar onAdminOpen={() => setIsAdminOpen(true)} />
        <main className="pt-32 sm:pt-36">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ThinkingSection />
          <ExperienceSection />
          <CertificationsSection />
          <CareerGoalSection />
          <ContactSection />
        </main>
        <Footer onAdminOpen={() => setIsAdminOpen(true)} />
        <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </div>
  );
}
