"use client";

import type { PropsWithChildren } from "react";

type AnimatedSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  return (
    <section id={id} className={["scroll-mt-32 sm:scroll-mt-36", className].filter(Boolean).join(" ")}>
      {children}
    </section>
  );
}
