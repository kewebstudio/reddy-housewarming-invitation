
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function SceneTransition({
  children,
  sceneKey,
  duration = 0.9,
}) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
      scale: shouldReduceMotion ? 1 : 0.985,
      filter: shouldReduceMotion ? "none" : "blur(8px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.15 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -14,
      scale: shouldReduceMotion ? 1 : 1.015,
      filter: shouldReduceMotion ? "none" : "blur(5px)",
      transition: {
        duration: shouldReduceMotion ? 0.1 : duration * 0.65,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  return (
    <div className="scene-transition">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={sceneKey}
          className="scene-transition-content"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .scene-transition {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          isolation: isolate;
        }

        .scene-transition-content {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          transform-origin: center center;
          will-change: opacity, transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .scene-transition-content {
            will-change: auto;
          }
        }
      `}</style>
    </div>
  );
}
