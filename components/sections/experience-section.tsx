"use client";

import { motion } from "framer-motion";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function ExperienceSection() {
  const { portfolio } = usePortfolio();

  return (
    <AnimatedSection id="experience" className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Experience"
        title="Reliability, validation, and practical execution"
        description="Experience that blends engineering discipline with hands-on learning in software and AI-oriented problem solving."
      />

      <motion.div className="mt-14 space-y-6">
        {portfolio.experience.map((item) => (
          <motion.article
            key={`${item.role}-${item.company}`}
            variants={fadeUpItem}
            whileHover={{ y: -6 }}
            className="premium-panel soft-hover-card grid gap-6 p-6 sm:p-7 lg:grid-cols-[0.32fr_0.68fr]"
          >
            <div className="border-b border-border/60 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-accent">{item.duration}</p>
              <h3 className="mt-4 font-display text-[2rem] font-semibold leading-[1.02] text-text">{item.role}</h3>
              <p className="mt-2 text-base font-medium text-text/80">{item.company}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">{item.location}</p>
            </div>
            <div>
              <p className="text-base leading-8 text-muted sm:text-[1.02rem]">{item.summary}</p>
              <motion.ul className="mt-6 grid gap-3">
                {item.highlights.map((highlight) => (
                  <motion.li key={highlight} variants={fadeUpItem} className="premium-subpanel px-4 py-3 text-sm leading-7 text-muted">
                    {highlight}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
