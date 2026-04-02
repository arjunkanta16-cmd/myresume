"use client";

import { motion } from "framer-motion";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function AboutSection() {
  const { portfolio } = usePortfolio();

  return (
    <AnimatedSection id="about" className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              A story of
              {" "}
              <span className="text-gradient">discipline</span>, transition, and deliberate growth
            </>
          }
          description={
            <>
              Not a quick career switch, but a steady move from engineering fundamentals into
              {" "}
              <span className="highlight-word">software systems</span>,
              {" "}
              <span className="highlight-word">automation</span>, and
              {" "}
              <span className="highlight-word">digital product thinking</span>.
            </>
          }
        />

        <motion.div className="space-y-5">
          {portfolio.aboutStory.map((paragraph, index) => (
            <motion.article
              key={paragraph}
              variants={fadeUpItem}
              className="premium-panel soft-hover-card p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="soft-ring flex h-10 w-10 items-center justify-center rounded-full border border-accent/10 bg-accent-soft text-sm font-semibold text-accent">
                  0{index + 1}
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.28em] text-muted">
                  {index === 0 ? "Foundation" : index === 1 ? "Execution" : "Direction"}
                </span>
              </div>
              <p className="text-base leading-8 text-muted sm:text-[1.02rem]">{paragraph}</p>
            </motion.article>
          ))}

          <motion.div variants={fadeUpItem} className="premium-subpanel rounded-[1.4rem] p-6">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-accent">What defines my approach</p>
            <p className="mt-4 font-display text-[1.6rem] leading-[1.15] text-text">
              I care about building systems that feel
              {" "}
              <span className="text-gradient">clear, dependable, and purposeful</span>
              {" "}
              from the inside out.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
