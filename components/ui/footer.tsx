"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

type FooterProps = {
  onAdminOpen: () => void;
};

export function Footer({ onAdminOpen }: FooterProps) {
  const { portfolio } = usePortfolio();
  const year = new Date().getFullYear();
  const socialLinks = [
    portfolio.contact.github ? { href: portfolio.contact.github, label: "GitHub" } : null,
    portfolio.contact.linkedin ? { href: portfolio.contact.linkedin, label: "LinkedIn" } : null
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <footer className="border-t border-border/70 bg-surface/70 backdrop-blur-xl">
      <motion.div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <motion.div variants={fadeUpItem} className="max-w-2xl">
          <p className="font-display text-[1.45rem] font-semibold uppercase tracking-[0.06em] text-text">{portfolio.name}</p>
          <p className="mt-2 leading-7">
            System-driven IT engineer focused on software, DevOps, and intelligent product building.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted/80">© {year} All rights reserved.</p>
        </motion.div>

        <motion.div variants={fadeUpItem} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          <Link href="/resume" className="transition hover:text-text">
            Resume Preview
          </Link>
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-text">
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onAdminOpen}
            className="text-left text-xs uppercase tracking-[0.24em] text-muted/70 transition hover:text-accent"
          >
            System Console
          </button>
        </motion.div>
      </motion.div>
    </footer>
  );
}
