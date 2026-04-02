"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Mail, Sparkles } from "lucide-react";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { ResumeDownloadButton } from "@/components/ui/resume-download-button";
import { fadeUpItem, staggerContainer, staggerSlow, softScaleIn } from "@/lib/motion";

export function HeroSection() {
  const { portfolio } = usePortfolio();

  return (
    <section className="relative overflow-hidden">
      <div className="ambient-shell">
        <div className="ambient-blob ambient-blob-blue left-[-8rem] top-14 h-72 w-72" />
        <div className="ambient-blob ambient-blob-warm right-[-5rem] top-24 h-60 w-60 [animation-delay:-4s]" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-12">
        <motion.div className="relative">
          <motion.div variants={fadeUpItem} className="section-label">
            Thoughtful systems. Calm execution. Real-world impact.
          </motion.div>

          <motion.p
            variants={fadeUpItem}
            className="mt-8 text-sm font-medium uppercase tracking-[0.28em] text-muted"
          >
            {portfolio.role}
          </motion.p>

          <motion.h1
            variants={fadeUpItem}
            className="mt-5 max-w-[52rem] font-display text-[clamp(2.9rem,5.6vw,4.9rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-text"
          >
            I build
            {" "}
            <span className="text-gradient">meaningful systems</span>
            <br />
            with engineering depth
            <br />
            and calm product thinking.
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="mt-6 max-w-3xl text-[1.02rem] leading-8 text-muted sm:text-[1.1rem] sm:leading-8"
          >
            <span className="highlight-word">{portfolio.fullName}</span>
            {" "}
            is an IT professional with an electronics and systems foundation, now building toward software, DevOps, automation, and intelligent digital platforms.
          </motion.p>

          <motion.p
            variants={fadeUpItem}
            className="text-gradient mt-6 max-w-3xl font-display text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-[1.08]"
          >
            {portfolio.tagline}
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 max-w-3xl space-y-4 text-base leading-8 text-muted sm:text-[1.02rem]">
            <motion.p variants={fadeUpItem}>{portfolio.shortIntro}</motion.p>
            <motion.p variants={fadeUpItem}>{portfolio.heroBlurb}</motion.p>
          </motion.div>

          <motion.div variants={staggerContainer} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.a
              variants={softScaleIn}
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="soft-ring inline-flex items-center justify-center gap-2 rounded-full bg-text px-6 py-3.5 text-sm font-semibold text-bg"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.div variants={softScaleIn} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <ResumeDownloadButton variant="secondary" />
            </motion.div>
            <motion.a
              variants={softScaleIn}
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="soft-ring inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-surface/90 px-6 py-3.5 text-sm font-semibold text-text"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="relative hero-float lg:pt-4">
          <div className="hero-orb absolute -left-8 top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="hero-orb-delay absolute -right-6 bottom-8 h-44 w-44 rounded-full bg-[#f5d7aa]/50 blur-3xl" />

          <div className="premium-panel relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
            <div className="premium-subpanel relative overflow-hidden p-6 sm:p-7">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/6 via-surface/50 to-[#fde8cf]/50" />
              <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

              <motion.div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.div
                      variants={fadeUpItem}
                      className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent-soft px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-accent"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Human-centered systems lens
                    </motion.div>
                    <motion.p variants={fadeUpItem} className="mt-5 text-xs uppercase tracking-[0.28em] text-muted">
                      Professional Identity
                    </motion.p>
                    <motion.h2
                      variants={fadeUpItem}
                      className="mt-3 max-w-md font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[0.96] text-text"
                    >
                      Serious engineering, expressed with clarity
                    </motion.h2>
                  </div>
                  <motion.div
                    variants={softScaleIn}
                    className="soft-ring rounded-[1.2rem] border border-border/80 bg-surface p-3 text-accent"
                  >
                    <BriefcaseBusiness className="h-6 w-6" />
                  </motion.div>
                </div>

                <motion.p variants={fadeUpItem} className="mt-6 text-base leading-8 text-muted">
                  {portfolio.professionalIdentity}
                </motion.p>

                <motion.div variants={staggerContainer} className="mt-8 grid gap-4">
                  {portfolio.stats.map((stat) => (
                    <motion.article
                      key={stat.label}
                      variants={softScaleIn}
                      whileHover={{ y: -6, boxShadow: "0 18px 42px rgba(15, 23, 42, 0.08)" }}
                      className="premium-subpanel soft-hover-card group p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">{stat.label}</p>
                          <p className="mt-2 font-display text-2xl font-semibold text-text">{stat.value}</p>
                        </div>
                        <span className="h-2.5 w-2.5 rounded-full bg-accent transition group-hover:scale-125" />
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted">{stat.detail}</p>
                    </motion.article>
                  ))}
                </motion.div>

                <motion.div variants={staggerContainer} className="mt-8 flex flex-wrap items-center gap-3">
                  <motion.div variants={fadeUpItem}>
                    <Link
                      href="/resume"
                      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface px-4 py-2.5 text-sm font-medium text-text transition hover:border-accent/35"
                    >
                      Resume Preview
                    </Link>
                  </motion.div>
                  <motion.span
                    variants={fadeUpItem}
                    className="rounded-full border border-accent/15 bg-accent-soft px-4 py-2.5 text-sm text-accent"
                  >
                    Thoughtful systems thinking is a core differentiator
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
