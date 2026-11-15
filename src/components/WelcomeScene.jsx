
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.35,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WelcomeScene({ data, onContinue }) {
  const welcome = data?.welcome || {};

  return (
    <section className="welcome-scene">

      {/* Open doors / empty home background */}
      <motion.div
        className="welcome-background"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src="/images/open-doors.jpg"
          alt="Welcome to our new home"
          className="welcome-background-image"
        />
      </motion.div>

      {/* Soft overlay for text readability */}
      <div className="welcome-overlay" />

      {/* Ambient glow */}
      <motion.div
        className="welcome-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Welcome typography */}
      <motion.div
        className="welcome-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="welcome-emblem"
          variants={revealVariants}
        >
          <span />
          <Sparkles size={19} strokeWidth={1.5} />
          <span />
        </motion.div>

        <motion.p
          className="welcome-eyebrow"
          variants={revealVariants}
        >
          WITH JOY IN OUR HEARTS
        </motion.p>

        <motion.h1
          className="welcome-heading"
          variants={revealVariants}
        >
          {welcome.heading || "Welcome to Our Home"}
        </motion.h1>

        <motion.p
          className="welcome-subtitle"
          variants={revealVariants}
        >
          {welcome.subtitle || "A beautiful new beginning"}
        </motion.p>

        <motion.div
          className="welcome-divider"
          variants={revealVariants}
        />

        <motion.p
          className="welcome-message"
          variants={revealVariants}
        >
          {welcome.message ||
            "A home is built with love, filled with laughter and made beautiful by the people we share it with."}
        </motion.p>

        <motion.button
          type="button"
          className="welcome-continue"
          variants={revealVariants}
          onClick={onContinue}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <span>Discover Our Celebration</span>
          <ArrowDown size={16} />
        </motion.button>
      </motion.div>

      {/* Bottom decorative detail */}
      <motion.div
        className="welcome-bottom-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        A NEW CHAPTER BEGINS
      </motion.div>

    </section>
  );
}
