
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FamilyScene({ data, onContinue }) {
  const family = data?.family || {};
  const familyMessage = data?.familyMessage || {};

  return (
    <section className="family-scene">
      <img
        className="family-background-image"
        src={data?.images?.family || "/images/hosts.jpg"}
        alt="The Reddy Family"
      />

      <div className="family-soft-overlay" />

      <div className="family-atmosphere" aria-hidden="true">
        <motion.span
          className="family-glow glow-one"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="family-glow glow-two"
          animate={{
            opacity: [0.2, 0.45, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        className="family-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="family-top-decoration"
          variants={revealVariants}
        >
          <span />
          <Sparkles size={15} strokeWidth={1.5} />
          <span />
        </motion.div>

        <motion.p
          className="family-eyebrow"
          variants={revealVariants}
        >
          WITH LOVE AND JOY
        </motion.p>

        <motion.h1
          className="family-heading"
          variants={revealVariants}
        >
          {family.title || "The Reddy Family"}
        </motion.h1>

        <motion.div
          className="family-divider"
          variants={revealVariants}
        >
          <span />
          <Heart size={15} strokeWidth={1.7} />
          <span />
        </motion.div>

        <motion.h2
          className="family-subheading"
          variants={revealVariants}
        >
          {familyMessage.heading || "A Home Filled With Love"}
        </motion.h2>

        <motion.p
          className="family-message"
          variants={revealVariants}
        >
          {familyMessage.message ||
            "A new home, a new chapter, and countless beautiful memories waiting to be made."}
        </motion.p>

        <motion.p
          className="family-welcome-line"
          variants={revealVariants}
        >
          Your presence will make our celebration complete.
        </motion.p>

        <motion.div
          className="family-signature"
          variants={revealVariants}
        >
          <span>With love,</span>
          <strong>{family.title || "Our Family"}</strong>
        </motion.div>

        <motion.div
          className="family-button-wrap"
          variants={revealVariants}
        >
          <motion.button
            type="button"
            className="family-continue"
            onClick={onContinue}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            <CalendarDays size={15} />
            <span>LET'S REVEAL THE DATE</span>
            <ArrowRight size={15} />
          </motion.button>

          <p className="family-button-caption">
            A special day awaits
          </p>
        </motion.div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Italiana&family=Montserrat:wght@400;500;600;700&display=swap');

        .family-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          overflow: hidden;
          isolation: isolate;
          background: #f8eee1;
          display: flex;
          justify-content: center;
        }

        .family-background-image {
          position: absolute;
          inset: 0;
          z-index: -3;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          user-select: none;
        }

        .family-soft-overlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(255,249,239,0.01) 0%,
            rgba(255,249,239,0.03) 40%,
            rgba(255,249,239,0.15) 75%,
            rgba(255,249,239,0.04) 100%
          );
        }

        .family-atmosphere {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: -1;
        }

        .family-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(210,169,91,0.18),
            transparent 70%
          );
          filter: blur(12px);
        }

        .glow-one {
          top: 42%;
          left: 5%;
        }

        .glow-two {
          right: 5%;
          bottom: 12%;
        }

        .family-content {
          position: relative;
          z-index: 2;
          width: min(100%, 560px);
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          text-align: center;
          overflow: hidden;
          padding: 34vh 25px 7vh;
        }

        .family-top-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          color: #95651f;
          flex-shrink: 0;
        }

        .family-top-decoration span {
          width: 30px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #bd9148
          );
        }

        .family-eyebrow {
          margin: 0;
          color: #414c2d;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2.8px;
          flex-shrink: 0;
        }

        .family-heading {
          margin: 0;
          color: #263722;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 8vw, 45px);
          font-weight: 700;
          line-height: 1.04;
          letter-spacing: -0.4px;
          text-shadow: 0 1px 0 rgba(255,255,255,0.35);
          flex-shrink: 0;
        }

        .family-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          color: #9a6b24;
          flex-shrink: 0;
        }

        .family-divider span {
          width: 35px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #a77b37
          );
        }

        .family-subheading {
          max-width: 330px;
          margin: 0;
          color: #49351f;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(23px, 5.7vw, 28px);
          font-weight: 700;
          line-height: 1.12;
          flex-shrink: 0;
        }

        .family-message {
          max-width: 310px;
          margin: 0;
          color: #382d22;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.35;
          flex-shrink: 0;
        }

        .family-welcome-line {
          max-width: 310px;
          margin: 0;
          color: #35432b;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-style: italic;
          font-weight: 700;
          line-height: 1.25;
          flex-shrink: 0;
        }

        .family-signature {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin: 0;
          color: #543b24;
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 600;
          font-style: italic;
          flex-shrink: 0;
        }

        .family-signature strong {
          color: #293c25;
          font-family: 'Cormorant Garamond', serif;
          font-size: 23px;
          font-weight: 700;
          font-style: normal;
          line-height: 1.1;
        }

        .family-button-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          flex-shrink: 0;
        }

        .family-continue {
          width: min(100%, 235px);
          min-height: 40px;
          padding: 0 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          border: 1px solid #a77d3e;
          border-radius: 3px;
          background: linear-gradient(
            135deg,
            #35452d,
            #263522
          );
          color: #fff8e9;
          box-shadow:
            0 5px 14px rgba(45,48,30,0.2),
            inset 0 1px 0 rgba(255,255,255,0.14);
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.1px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .family-button-caption {
          margin: 5px 0 0;
          color: #503b24;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 600;
          font-style: italic;
        }

        @media (max-height: 700px) {
          .family-content {
            padding-top: 32vh;
            padding-bottom: 5vh;
          }

          .family-heading {
            font-size: 32px;
          }

          .family-subheading {
            font-size: 21px;
          }

          .family-message {
            font-size: 16px;
            line-height: 1.25;
          }

          .family-welcome-line {
            font-size: 15px;
          }

          .family-signature strong {
            font-size: 20px;
          }

          .family-continue {
            min-height: 36px;
          }
        }

        @media (min-width: 700px) {
          .family-content {
            padding-top: 35vh;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .family-glow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
