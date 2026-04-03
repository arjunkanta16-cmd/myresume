"use client";

import type { PropsWithChildren } from "react";

type AnimatedSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  return (
    <section className={["relative", className].filter(Boolean).join(" ")}>
      {id ? <span id={id} aria-hidden="true" className="pointer-events-none absolute -top-24 sm:-top-28" /> : null}
      {children}
    </section>
  );
}
