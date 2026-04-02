"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

import { useThemeMode } from "@/components/providers/theme-provider";
import { SceneErrorBoundary } from "@/components/space/scene-error-boundary";

const SpaceScene = dynamic(() => import("@/components/space/Scene").then((module) => module.Scene), {
  ssr: false
});

export function DarkModeScene() {
  const { theme } = useThemeMode();

  if (theme !== "dark") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="dark-space-scene"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.12),transparent_18%),radial-gradient(circle_at_85%_8%,rgba(37,99,235,0.16),transparent_16%),linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.48))]" />
        <SceneErrorBoundary>
          <SpaceScene />
        </SceneErrorBoundary>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.62),rgba(2,6,23,0.08)_18%,rgba(2,6,23,0.18)_40%,rgba(2,6,23,0.34)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(90deg,rgba(2,6,23,0.52),rgba(2,6,23,0.18),transparent)]" />
      </motion.div>
    </AnimatePresence>
  );
}
