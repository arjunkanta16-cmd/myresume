"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function SkillsSection() {
  const { portfolio } = usePortfolio();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedSection id="skills" className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Skills"
        title={
          <>
            Structured skills that support
            {" "}
            <span className="text-gradient">real product work</span>
          </>
        }
        description="Organized around how I think and build in practice: code, infrastructure, tooling, and operational awareness working together."
        align="center"
      />

      <motion.div className="mt-14 grid gap-6 lg:grid-cols-2">
        {portfolio.skills.map((category, categoryIndex) => (
          <motion.article key={category.title} variants={fadeUpItem} className="premium-panel soft-hover-card p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-accent">{category.title}</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{category.description}</p>
              </div>
              <span className="font-display text-4xl font-semibold text-text/10">{String(categoryIndex + 1).padStart(2, "0")}</span>
            </div>

            <div className="mt-7 space-y-5">
              {category.items.map((skill) => (
                <motion.div key={skill.name} variants={fadeUpItem} className="premium-subpanel p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-text">{skill.name}</p>
                      <p className="mt-1 text-xs leading-6 text-muted">{skill.note}</p>
                    </div>
                    <span className="font-display text-xl font-semibold text-text">{skill.level}%</span>
                  </div>
                  <div className="mt-4 h-2.5 rounded-full bg-border/60">
                    <motion.div
                      className="h-2.5 origin-left rounded-full bg-gradient-to-r from-accent via-[#7db6ff] to-[#f0c37d]"
                      initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
