"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { useState, useTransition } from "react";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ResumeDownloadButton } from "@/components/ui/resume-download-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUpItem, staggerContainer, softScaleIn } from "@/lib/motion";

export function ContactSection() {
  const { portfolio } = usePortfolio();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("");
  const socialLinks = [
    portfolio.contact.github ? { href: portfolio.contact.github, label: "GitHub", icon: Github } : null,
    portfolio.contact.linkedin ? { href: portfolio.contact.linkedin, label: "LinkedIn", icon: Linkedin } : null
  ].filter(Boolean) as Array<{ href: string; label: string; icon: LucideIcon }>;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    startTransition(() => {
      setStatus("Demo form submitted. The UI is ready to connect to email or CRM automation.");
      form.reset();
    });
  }

  return (
    <AnimatedSection id="contact" className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let’s build
                {" "}
                <span className="text-gradient">dependable digital systems</span>
              </>
            }
            description="Available for opportunities in software development, DevOps, and engineering-led product environments where thoughtful execution matters."
          />

          <motion.div className="mt-10 space-y-4">
            <motion.a
              variants={fadeUpItem}
              href={`mailto:${portfolio.contact.emails[0]}`}
              className="premium-panel soft-hover-card flex items-start gap-4 p-5 sm:p-6"
            >
              <span className="soft-ring rounded-2xl bg-accent-soft p-3 text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-muted">Email</span>
                <span className="mt-2 block text-sm font-medium text-text">{portfolio.contact.emails[0]}</span>
                <span className="mt-1 block text-sm text-muted">{portfolio.contact.emails[1]}</span>
              </span>
            </motion.a>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div variants={fadeUpItem} className="premium-panel soft-hover-card p-5">
                <div className="flex items-center gap-3">
                  <span className="soft-ring rounded-2xl bg-accent-soft p-3 text-accent">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">Phone</p>
                    <p className="mt-2 text-sm font-medium text-text">{portfolio.contact.phone}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeUpItem} className="premium-panel soft-hover-card p-5">
                <div className="flex items-center gap-3">
                  <span className="soft-ring rounded-2xl bg-accent-soft p-3 text-accent">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">Location</p>
                    <p className="mt-2 text-sm font-medium text-text">{portfolio.contact.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div className="flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    variants={softScaleIn}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-2.5 text-sm font-medium text-text"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </motion.a>
                );
              })}
              <motion.div variants={softScaleIn}>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-2.5 text-sm font-medium text-text"
                >
                  Resume Preview
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={softScaleIn} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <ResumeDownloadButton className="mt-2" variant="secondary" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="premium-panel relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-white/70 to-[#fde8cf]/45" />
          <div className="flex items-center justify-between gap-4">
            <div className="relative">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-accent">Contact Form</p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-text">Start a conversation</h3>
            </div>
            <span className="rounded-full border border-accent/15 bg-accent-soft px-3 py-1 text-xs text-accent">
              Frontend-ready
            </span>
          </div>

          <form onSubmit={handleSubmit} className="relative mt-7 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                placeholder="Your name"
                className="premium-subpanel w-full px-4 py-3 text-sm text-text outline-none transition focus:border-accent/35"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                className="premium-subpanel w-full px-4 py-3 text-sm text-text outline-none transition focus:border-accent/35"
                required
              />
            </div>
            <input
              name="subject"
              placeholder="Role or project topic"
              className="premium-subpanel w-full px-4 py-3 text-sm text-text outline-none transition focus:border-accent/35"
              required
            />
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about the opportunity"
              className="premium-subpanel w-full px-4 py-3 text-sm text-text outline-none transition focus:border-accent/35"
              required
            />
            <button
              type="submit"
              disabled={isPending}
              className="soft-ring w-full rounded-full bg-text px-5 py-3.5 text-sm font-semibold text-bg transition duration-300 hover:scale-[1.01]"
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>
            {status ? <p className="text-sm text-accent">{status}</p> : null}
          </form>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
