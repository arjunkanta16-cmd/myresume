"use client";

import { motion } from "framer-motion";
import { Binary, Orbit, PenSquare } from "lucide-react";

import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUpItem } from "@/lib/motion";

const principles = [
  {
    title: "Systems Before Surfaces",
    description:
      "I like understanding how inputs, dependencies, feedback, and failure points connect before deciding how a solution should look.",
    icon: Orbit
  },
  {
    title: "Human Clarity Matters",
    description:
      "Whether it is UI, documentation, or code structure, I try to make complexity feel understandable for the next person using or maintaining it.",
    icon: PenSquare
  },
  {
    title: "Engineering With Context",
    description:
      "I think in terms of reliability, process, and scale so digital products are not only functional, but meaningful inside real operating environments.",
    icon: Binary
  }
];

export function ThinkingSection() {
  return (
    <AnimatedSection id="thinking" className="section-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <SectionHeading
          eyebrow="Thinking"
          title={
            <>
              The way I think is as important as the
              {" "}
              <span className="text-gradient">tools</span>
              {" "}
              I use
            </>
          }
          description={
            <>
              I am drawn to work where <span className="highlight-word">systems thinking</span>,
              {" "}
              <span className="highlight-word">clear communication</span>, and
              {" "}
              <span className="highlight-word">careful execution</span> shape the final outcome.
            </>
          }
        />

        <div className="grid gap-5">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={fadeUpItem}
                className="premium-panel soft-hover-card relative overflow-hidden p-6 sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="soft-ring rounded-[1.15rem] border border-border/70 bg-accent-soft p-3 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.55rem] font-semibold text-text">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
