"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUpItem, staggerContainer } from "@/lib/motion";

export function ProjectsSection() {
  const { portfolio } = usePortfolio();

  return (
    <AnimatedSection id="projects" className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Projects"
        title={
          <>
            Work that connects
            {" "}
            <span className="text-gradient">product clarity</span>
            {" "}
            with system thinking
          </>
        }
        description="Presented the way product teams and engineering leaders evaluate work: purpose, implementation logic, and real-world value."
        align="center"
      />

      <motion.div className="mt-14 grid gap-6 xl:grid-cols-2">
        {portfolio.projects.map((project, index) => (
          <motion.article
            key={project.title}
            variants={fadeUpItem}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="premium-panel soft-hover-card group relative overflow-hidden p-6 sm:p-7"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-[#fde8cf]/55 opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent">Case Study {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-[1.8rem] font-semibold leading-tight text-text">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{project.strapline}</p>
                </div>
                <div className="soft-ring rounded-2xl border border-border/70 bg-surface p-3 text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">Problem</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{project.problem}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">Solution</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{project.solution}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">Outcome</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{project.outcome}</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium text-text">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
