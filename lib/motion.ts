import type { Transition, Variants } from "framer-motion";

export const easeInOut = [0.22, 1, 0.36, 1] as const;

export const smoothTransition: Transition = {
  duration: 0.68,
  ease: easeInOut
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1
    }
  }
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: easeInOut
    }
  }
};

export const softScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: easeInOut
    }
  }
};
