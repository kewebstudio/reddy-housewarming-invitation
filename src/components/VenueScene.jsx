
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 14, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

export default function VenueScene({ data, onContinue }) {
  const venue = data?.venue || {};
  const timings = data?.timings || {};

  return (
    <section className="venue-scene">
      <img
        src="/images/venue-template.jpg"
        alt="Our new home"
        className="venue-template"
      />

      <div className="venue-overlay" />

      {/* HEADING */}
      <motion.div
        className="venue-heading"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.16, delayChildren: 0.3 },
          },
        }}
      >
        <motion.span variants={reveal} className="venue-eyebrow">
          A NEW CHAPTER BEGINS
        </motion.span>

        <motion.h1 variants={reveal}>
          A Place to Gather
        </motion.h1>

        <motion.p variants={reveal}>
          A beautiful home, a special occasion,
          and the joy of celebrating together.
        </motion.p>
      </motion.div>

      {/* VENUE DETAILS */}
      <motion.div
        className="venue-address"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.13, delayChildren: 0.95 },
          },
        }}
      >
        <motion.div className="venue-map-icon" variants={reveal}>
          <MapPin size={17} strokeWidth={1.7} />
        </motion.div>

        <motion.h2 variants={reveal}>
          {venue.name || "The Reddy Residence"}
        </motion.h2>

        <motion.p variants={reveal}>
          {venue.address ||
            "Gachibowli, Hyderabad, Telangana, India"}
        </motion.p>
      </motion.div>

      {/* CELEBRATION TIME */}
      <motion.div
        className="venue-time venue-celebration"
        initial="hidden"
        animate="visible"
        variants={reveal}
        transition={{ delay: 1.45 }}
      >
        <span>Celebration Begins</span>
        <strong>
          {timings.celebration || "10:30 AM onwards"}
        </strong>
      </motion.div>

      {/* LUNCH - MOVED CLEARLY BELOW THE DECORATIVE DIVIDER */}
      <motion.div
        className="venue-time venue-lunch"
        initial="hidden"
        animate="visible"
        variants={reveal}
        transition={{ delay: 1.75 }}
      >
        <span>Lunch</span>
        <strong>
          {timings.lunch || "12:30 PM onwards"}
        </strong>
      </motion.div>

      {/* BOTTOM-CENTRED BUTTON */}
      <div className="venue-button-position">
        <motion.button
          type="button"
          className="venue-next-button"
          onClick={onContinue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease }}
          whileHover={{ y: -2, scale: 1.025 }}
          whileTap={{ scale: 0.96 }}
        >
          <span>A NOTE OF THANKS</span>
          <ArrowRight size={13} />
        </motion.button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@500;600;700&display=swap');

        .venue-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          overflow: hidden;
          isolation: isolate;
          background: #fbf0e2;
        }

        .venue-template {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          user-select: none;
        }

        .venue-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: rgba(255, 249, 239, 0.015);
        }

        /* HEADING */

        .venue-heading {
          position: absolute;
          top: 18.5%;
          left: 8%;
          width: 84%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .venue-eyebrow {
          color: #647047;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.8px;
        }

        .venue-heading h1 {
          margin: 6px 0 0;
          color: #35432e;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(29px, 7.8vw, 38px);
          font-weight: 700;
          line-height: 1.04;
        }

        .venue-heading p {
          max-width: 245px;
          margin: 6px 0 0;
          color: #704c30;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.22;
        }

        /* ADDRESS */

        .venue-address {
          position: absolute;
          top: 42%;
          left: 9%;
          width: 82%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .venue-map-icon {
          margin-bottom: 3px;
          color: #ad792f;
        }

        .venue-address h2 {
          margin: 3px 0 0;
          color: #39472f;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(23px, 6.5vw, 29px);
          font-weight: 700;
          line-height: 1.08;
        }

        .venue-address p {
          max-width: 290px;
          margin: 4px 0 0;
          color: #704c30;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
        }

        /* CELEBRATION TIME */

        .venue-time {
          position: absolute;
          left: 8%;
          width: 84%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2px;
        }

        .venue-celebration {
          top: 52.5%;
        }

        /* LUNCH MOVED DOWN 35PX APPROXIMATELY */

        .venue-lunch {
          top: calc(52.5% + 76px);
          margin-top: 0;
        }

        .venue-time span {
          color: #704c30;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.1;
        }

        .venue-time strong {
          color: #39472f;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(19px, 5.5vw, 23px);
          font-weight: 700;
          line-height: 1.1;
        }

        /* BUTTON */

        .venue-button-position {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 2.2%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 5;
          pointer-events: none;
        }

        .venue-next-button {
          width: 164px;
          min-height: 30px;
          padding: 0 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #b89558;
          border-radius: 3px;
          background: rgba(57, 69, 47, 0.96);
          color: #fff8e9;
          box-shadow: 0 3px 10px rgba(48, 56, 37, 0.15);
          font-family: 'Montserrat', sans-serif;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 1px;
          white-space: nowrap;
          cursor: pointer;
          pointer-events: auto;
          -webkit-tap-highlight-color: transparent;
        }

        @media (max-height: 700px) {
          .venue-heading {
            top: 18%;
          }

          .venue-heading h1 {
            font-size: 29px;
          }

          .venue-heading p {
            font-size: 12px;
          }

          .venue-address {
            top: 41%;
          }

          .venue-address h2 {
            font-size: 22px;
          }

          .venue-address p {
            font-size: 12px;
          }

          .venue-celebration {
            top: 52%;
          }

          .venue-lunch {
            top: calc(52% + 72px);
          }

          .venue-time strong {
            font-size: 19px;
          }

          .venue-button-position {
            bottom: 2%;
          }

          .venue-next-button {
            min-height: 29px;
          }
        }

        @media (min-width: 700px) {
          .venue-heading h1 {
            font-size: 42px;
          }

          .venue-address h2 {
            font-size: 31px;
          }

          .venue-time strong {
            font-size: 25px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .venue-scene * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
