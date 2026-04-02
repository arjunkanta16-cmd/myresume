"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { ResumeDownloadButton } from "@/components/ui/resume-download-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#thinking", label: "Thinking" },
  { href: "#experience", label: "Experience" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" }
];

type NavBarProps = {
  onAdminOpen: () => void;
};

export function NavBar({ onAdminOpen }: NavBarProps) {
  const { portfolio } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#about");
  const mobileBrand = useMemo(() => {
    const parts = portfolio.fullName.split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).join(" ");
  }, [portfolio.fullName]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 18);

      const activeSection = navItems.findLast((item) => {
        const target = document.querySelector(item.href);
        if (!target) {
          return false;
        }

        const rect = target.getBoundingClientRect();
        return rect.top <= 140;
      });

      if (activeSection) {
        setActiveHref(activeSection.href);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-500",
        isScrolled
          ? "border-border/80 bg-surface/88 shadow-[0_10px_32px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          : "border-border/50 bg-surface/78 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:hidden">
        <Link href="/" className="min-w-0 flex-1" title={portfolio.fullName}>
          <div className="min-w-0 leading-none">
            <p className="truncate whitespace-nowrap font-display text-[0.92rem] font-semibold uppercase tracking-[0.05em] text-text sm:text-[0.98rem]">
              {mobileBrand}
            </p>
            <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-muted sm:text-[0.66rem]">Systems Portfolio</p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle compact />
          <button
            type="button"
            className="soft-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-text"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[90rem] xl:grid xl:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)_auto] xl:items-center xl:gap-4 xl:px-8 xl:py-4">
        <Link href="/" className="min-w-0 pr-1" title={portfolio.fullName}>
          <div className="min-w-0 leading-none">
            <p className="truncate whitespace-nowrap font-display text-[0.88rem] font-semibold uppercase tracking-[0.04em] text-text 2xl:text-[0.94rem]">
              {portfolio.fullName}
            </p>
            <p className="mt-2 text-[0.66rem] uppercase tracking-[0.32em] text-muted">Systems Portfolio</p>
          </div>
        </Link>

        <div className="min-w-0">
          <div className="nav-capsule soft-ring relative flex w-full items-center justify-center px-2 py-2">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <nav className="flex items-center justify-center gap-0.5 whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveHref(item.href)}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-2.5 py-2.5 text-[0.88rem] font-medium transition duration-300 2xl:px-3 2xl:text-[0.94rem]",
                      isActive ? "text-text" : "text-muted hover:bg-accent/5 hover:text-text"
                    )}
                  >
                    {isActive ? (
                      <span className="absolute inset-0 rounded-full bg-accent/10 shadow-[0_10px_24px_rgba(56,189,248,0.12)] ring-1 ring-accent/20" />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-self-end gap-2.5">
          <ThemeToggle className="min-w-[10.5rem]" />
          <ResumeDownloadButton />
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 bg-surface/95 transition-[max-height] duration-500 xl:hidden",
          isOpen ? "pointer-events-auto max-h-[34rem]" : "pointer-events-none max-h-0"
        )}
      >
        <div className="space-y-2 px-4 py-5 sm:px-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                activeHref === item.href ? "bg-accent/8 text-text" : "text-muted hover:bg-surface/80 hover:text-text"
              )}
              onClick={() => {
                setActiveHref(item.href);
                setIsOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="premium-divider my-2" />
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onAdminOpen();
            }}
            className="rounded-full border border-border/80 bg-surface px-4 py-2.5 text-sm font-medium text-text"
          >
            Open Admin
          </button>
          <ResumeDownloadButton className="w-full" />
        </div>
      </div>
    </header>
  );
}
