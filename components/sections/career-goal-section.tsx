"use client";

import { motion } from "framer-motion";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function CareerGoalSection() {
  const { portfolio } = usePortfolio();

  return (
    <AnimatedSection id="vision" className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div className="premium-panel relative overflow-hidden p-8 sm:p-10 lg:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/6 via-surface/50 to-[#fde8cf]/45" />
        <div className="ambient-shell">
          <div className="ambient-blob ambient-blob-blue -left-20 top-8 h-52 w-52" />
          <div className="ambient-blob ambient-blob-warm right-0 top-0 h-48 w-48 [animation-delay:-3s]" />
        </div>
        <div className="relative">
          <motion.div variants={fadeUpItem} className="section-label">
            Vision
          </motion.div>
          <motion.h2 variants={fadeUpItem} className="mt-5 max-w-4xl font-display text-[clamp(2.35rem,4vw,4.1rem)] font-semibold leading-[0.96] text-text">
            {portfolio.careerGoal}
          </motion.h2>
          <motion.p variants={fadeUpItem} className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            I am especially interested in roles where <span className="highlight-word">software engineering</span>,
            {" "}
            <span className="highlight-word">operational thinking</span>, and
            {" "}
            <span className="highlight-word">system design</span> come together to solve practical business problems at scale.
          </motion.p>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
