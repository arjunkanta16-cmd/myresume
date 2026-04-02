"use client";

import { Download } from "lucide-react";
import { useState } from "react";

import { usePortfolio } from "@/components/providers/portfolio-provider";
import { cn } from "@/lib/utils";

type ResumeDownloadButtonProps = {
  className?: string;
  variant?: "primary" | "secondary";
};

export function ResumeDownloadButton({
  className,
  variant = "primary"
}: ResumeDownloadButtonProps) {
  const { portfolio } = usePortfolio();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(portfolio)
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${portfolio.name.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error(error);
      window.alert("Resume generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className={cn(
        "soft-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition duration-300",
        variant === "primary"
          ? "bg-text text-bg shadow-glow hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-95"
          : "border border-border/80 bg-surface/90 text-text backdrop-blur hover:-translate-y-0.5 hover:scale-[1.02] hover:border-accent/40 hover:shadow-card",
        isLoading && "cursor-wait opacity-70",
        className
      )}
    >
      <Download className="h-4 w-4" />
      {isLoading ? "Preparing Resume..." : "Download Resume"}
    </button>
  );
}
