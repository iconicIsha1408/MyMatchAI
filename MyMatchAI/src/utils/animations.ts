
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const slideInTop = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const slideInBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Hover animations
export const hoverScale = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

export const hoverLift = {
  initial: { y: 0 },
  hover: { y: -5, transition: { duration: 0.2 } }
};

export const hoverGlow = {
  initial: { boxShadow: "0 0 0 rgba(59, 130, 246, 0)" },
  hover: { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)", transition: { duration: 0.3 } }
};

// Page transition
export const pageTransition = {
  in: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  out: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.5, ease: "easeIn" }
  }
};
