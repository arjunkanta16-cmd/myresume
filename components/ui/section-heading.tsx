import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div className={cn("section-label", align === "center" && "justify-center")}>{eyebrow}</div>
      <h2 className="mt-4 font-display text-[clamp(2.35rem,4vw,3.9rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-text">
        {title}
      </h2>
      <p className="mt-5 max-w-[42rem] text-base leading-8 text-muted sm:text-[1.05rem]">{description}</p>
    </div>
  );
}
