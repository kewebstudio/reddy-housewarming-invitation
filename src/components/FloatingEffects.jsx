
import { motion, useReducedMotion } from "framer-motion";

const goldenParticles = [
  { x: "5%", y: "18%", size: 3, duration: 13, delay: 0 },
  { x: "12%", y: "72%", size: 2, duration: 17, delay: 2 },
  { x: "20%", y: "42%", size: 4, duration: 15, delay: 4 },
  { x: "28%", y: "85%", size: 2, duration: 19, delay: 1 },
  { x: "36%", y: "15%", size: 3, duration: 14, delay: 5 },
  { x: "45%", y: "62%", size: 2, duration: 18, delay: 3 },
  { x: "53%", y: "30%", size: 4, duration: 16, delay: 6 },
  { x: "61%", y: "88%", size: 2, duration: 20, delay: 2 },
  { x: "70%", y: "48%", size: 3, duration: 15, delay: 4 },
  { x: "78%", y: "12%", size: 2, duration: 17, delay: 1 },
  { x: "86%", y: "70%", size: 4, duration: 19, delay: 5 },
  { x: "94%", y: "35%", size: 2, duration: 14, delay: 3 },
  { x: "16%", y: "28%", size: 2, duration: 21, delay: 7 },
  { x: "40%", y: "92%", size: 3, duration: 16, delay: 8 },
  { x: "74%", y: "83%", size: 2, duration: 18, delay: 6 },
  { x: "90%", y: "55%", size: 3, duration: 20, delay: 9 },
];

const sparklePositions = [
  { x: "9%", y: "25%", size: 15, delay: 0 },
  { x: "25%", y: "65%", size: 12, delay: 1.8 },
  { x: "42%", y: "12%", size: 17, delay: 3.2 },
  { x: "57%", y: "78%", size: 13, delay: 2.4 },
  { x: "72%", y: "28%", size: 16, delay: 4.1 },
  { x: "91%", y: "62%", size: 14, delay: 1.2 },
  { x: "82%", y: "90%", size: 11, delay: 5 },
];

const lightOrbs = [
  {
    x: "8%",
    y: "35%",
    size: 100,
    duration: 12,
    delay: 0,
  },
  {
    x: "82%",
    y: "18%",
    size: 130,
    duration: 16,
    delay: 3,
  },
  {
    x: "68%",
    y: "78%",
    size: 110,
    duration: 14,
    delay: 2,
  },
];

export default function FloatingEffects({
  intensity = "normal",
}) {
  const shouldReduceMotion = useReducedMotion();

  const isSubtle = intensity === "subtle";
  const isRich = intensity === "rich";

  const particleCount = isSubtle
    ? 8
    : isRich
      ? goldenParticles.length
      : 12;

  const sparkleCount = isSubtle
    ? 3
    : isRich
      ? sparklePositions.length
      : 5;

  return (
    <div
      className={`floating-effects ${isRich ? "effects-rich" : ""}`}
      aria-hidden="true"
    >
      {/* Ambient golden light */}
      <div className="effects-ambient" />

      {/* Soft glowing orbs */}
      <div className="effects-orbs">
        {lightOrbs.map((orb, index) => (
          <motion.span
            key={`orb-${index}`}
            className="effects-orb"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, 22, -12, 0],
                    y: [0, -25, 14, 0],
                    scale: [1, 1.18, 0.92, 1],
                    opacity: [0.2, 0.48, 0.25, 0.2],
                  }
            }
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating golden dust */}
      <div className="effects-particles">
        {goldenParticles.slice(0, particleCount).map((particle, index) => (
          <motion.span
            key={`particle-${index}`}
            className="effects-particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, 16, -12, 0],
                    y: [0, -45, -85, -115],
                    opacity: [0, 0.8, 0.55, 0],
                    scale: [0.5, 1.2, 0.8, 0.4],
                  }
            }
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="effects-sparkles">
        {sparklePositions.slice(0, sparkleCount).map((sparkle, index) => (
          <motion.span
            key={`sparkle-${index}`}
            className="effects-sparkle"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.35 }
                : {
                    opacity: [0, 1, 0.2, 0.9, 0],
                    scale: [0.35, 1.25, 0.65, 1.1, 0.35],
                    rotate: [0, 45, 90, 135, 180],
                  }
            }
            transition={{
              duration: 3.8,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill="none"
            >
              <path
                d="M12 1.5L14.8 9.2L22.5 12L14.8 14.8L12 22.5L9.2 14.8L1.5 12L9.2 9.2L12 1.5Z"
                fill="#D7B46A"
                fillOpacity="0.85"
              />
            </svg>
          </motion.span>
        ))}
      </div>

      {/* Fine shimmering light */}
      <div className="effects-shimmer" />
      
      <style>{`
        .floating-effects {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 5;
          isolation: isolate;
          contain: strict;
        }

        .effects-ambient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(232, 213, 181, 0.09),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 75%,
              rgba(198, 154, 69, 0.08),
              transparent 35%
            );
          pointer-events: none;
        }

        .effects-orbs {
          position: absolute;
          inset: 0;
        }

        .effects-orb {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 239, 195, 0.34) 0%,
            rgba(225, 188, 113, 0.13) 35%,
            transparent 72%
          );
          filter: blur(13px);
          will-change: transform, opacity;
        }

        .effects-particles {
          position: absolute;
          inset: 0;
        }

        .effects-particle {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            #fff9dc 0%,
            #d9b76c 55%,
            rgba(198, 154, 69, 0.1) 100%
          );
          box-shadow:
            0 0 5px rgba(226, 190, 113, 0.7),
            0 0 12px rgba(226, 190, 113, 0.25);
          will-change: transform, opacity;
        }

        .effects-sparkles {
          position: absolute;
          inset: 0;
        }

        .effects-sparkle {
          position: absolute;
          display: block;
          filter: drop-shadow(
            0 0 5px rgba(213, 174, 99, 0.65)
          );
          will-change: transform, opacity;
        }

        .effects-shimmer {
          position: absolute;
          inset: -50%;
          background: linear-gradient(
            115deg,
            transparent 43%,
            rgba(255, 246, 220, 0.035) 49%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 246, 220, 0.035) 51%,
            transparent 57%
          );
          animation: effectsShimmer 18s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes effectsShimmer {
          0% {
            transform: translate3d(-35%, -20%, 0);
          }
          50% {
            transform: translate3d(20%, 15%, 0);
          }
          100% {
            transform: translate3d(-35%, -20%, 0);
          }
        }

        .effects-rich .effects-particle {
          box-shadow:
            0 0 7px rgba(226, 190, 113, 0.8),
            0 0 17px rgba(226, 190, 113, 0.35);
        }

        @media (max-width: 600px) {
          .effects-orb {
            filter: blur(17px);
          }

          .effects-sparkle {
            filter: drop-shadow(
              0 0 4px rgba(213, 174, 99, 0.5)
            );
          }

          .effects-shimmer {
            animation-duration: 24s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .effects-shimmer {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
