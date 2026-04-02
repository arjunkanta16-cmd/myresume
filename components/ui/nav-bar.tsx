"use client";

import Link from "next/link";
import { Menu, ShieldEllipsis } from "lucide-react";
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
  const brandShort = useMemo(() => {
    const parts = portfolio.fullName.split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).join(" ");
  }, [portfolio.fullName]);
  const initials = useMemo(
    () =>
      portfolio.fullName
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2),
    [portfolio.fullName]
  );

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0 flex items-center gap-3" title={portfolio.fullName}>
          <div className="soft-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-surface/90">
            <span className="font-display text-lg font-semibold uppercase tracking-[0.14em] text-text">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-text sm:text-base 2xl:text-lg">
              <span className="2xl:hidden">{brandShort}</span>
              <span className="hidden 2xl:inline">{portfolio.name}</span>
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-muted sm:text-[0.72rem]">Systems Portfolio</p>
          </div>
        </Link>

        <div className="hidden xl:flex xl:flex-1 xl:justify-center">
          <div className="nav-capsule soft-ring relative flex items-center gap-2 px-2 py-2">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveHref(item.href)}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-4 py-2.5 text-sm font-medium transition duration-300",
                      isActive ? "text-text" : "text-muted hover:bg-accent/5 hover:text-text"
                    )}
                  >
                    {isActive ? (
                      <span
                        className="absolute inset-0 rounded-full bg-accent/10 shadow-[0_10px_24px_rgba(56,189,248,0.12)] ring-1 ring-accent/20"
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <button
            type="button"
            onClick={onAdminOpen}
            className="soft-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-text transition duration-300 hover:-translate-y-0.5 hover:border-accent/40"
            aria-label="Open admin panel"
          >
            <ShieldEllipsis className="h-4 w-4" />
          </button>
          <ResumeDownloadButton />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
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
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-2.5 text-sm font-medium text-text"
          >
            <ShieldEllipsis className="h-4 w-4" />
            Admin
          </button>
          <ResumeDownloadButton className="w-full" />
        </div>
      </div>
    </header>
  );
}
