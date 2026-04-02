"use client";

import { motion } from "framer-motion";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function CertificationsSection() {
  const { portfolio } = usePortfolio();

  return (
    <AnimatedSection className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Credentials"
        title={
          <>
            Credentials that reinforce
            {" "}
            <span className="text-gradient">practical depth</span>
          </>
        }
        description="Signals of continued learning, technical curiosity, and applied project engagement."
        align="center"
      />

      <motion.div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {portfolio.certifications.map((certification) => (
          <motion.article key={certification.title} variants={fadeUpItem} className="premium-panel soft-hover-card p-5 sm:p-6">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-accent">{certification.issuer}</p>
            <h3 className="mt-4 font-display text-[1.55rem] font-semibold leading-tight text-text">{certification.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{certification.note}</p>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
