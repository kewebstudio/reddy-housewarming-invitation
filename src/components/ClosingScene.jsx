
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  RotateCcw,
  X,
  Download,
  ArrowUpRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export default function ClosingScene({ data, onRestart }) {
  const closing = data?.closingMessage || {};
  const [showCard, setShowCard] = useState(false);

  return (
    <section className="closing-scene">
      {/* Full-screen original template */}
      <motion.img
        src={data?.images?.closing || "/images/final-note.jpg"}
        alt="Housewarming closing invitation"
        className="closing-background-image"
        initial={{ opacity: 0, scale: 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease }}
      />

      <div className="closing-soft-overlay" />

      {/* Floating golden sparkles */}
      <div className="closing-sparkles" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.span
            key={index}
            className={`closing-sparkle sparkle-${index + 1}`}
            animate={{
              opacity: [0.15, 0.75, 0.15],
              scale: [0.8, 1.15, 0.8],
              y: [0, -7, 0],
            }}
            transition={{
              duration: 3 + (index % 3),
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* Upper greeting area */}
      <motion.div
        className="closing-main-content"
        initial="hidden"
        animate="visible"
      >
        <motion.p className="closing-eyebrow" variants={reveal}>
          WITH LOVE & GRATITUDE
        </motion.p>

        <motion.h1 className="closing-heading" variants={reveal}>
          {closing.heading || "With Love & Warm Wishes"}
        </motion.h1>

        <motion.div className="closing-heart" variants={reveal}>
          <motion.span
            animate={{ scale: [1, 1.12, 1] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart
              size={27}
              strokeWidth={1.5}
              fill="rgba(190, 137, 49, 0.13)"
            />
          </motion.span>
        </motion.div>

        <motion.p className="closing-message" variants={reveal}>
          {closing.message ||
            "Our new home feels complete with you by our side. We would be delighted to have you celebrate this special beginning with us."}
        </motion.p>

        <motion.p className="closing-signature" variants={reveal}>
          {closing.signature || "With love, The Reddy Family"}
        </motion.p>
      </motion.div>

      {/* Buttons — positioned clearly above the ribbon */}
      <motion.div
        className="closing-actions"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          delay: 1.15,
          ease,
        }}
      >
        <motion.button
          type="button"
          className="closing-card-button"
          onClick={() => setShowCard(true)}
          whileHover={{ y: -2, scale: 1.025 }}
          whileTap={{ scale: 0.96 }}
        >
          <Sparkles size={14} />
          <span>VIEW INVITATION CARD</span>
          <ArrowUpRight size={13} />
        </motion.button>

        <motion.button
          type="button"
          className="closing-replay-button"
          onClick={onRestart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <RotateCcw size={13} />
          <span>
            {closing.buttonText || "Replay Invitation"}
          </span>
        </motion.button>
      </motion.div>

      {/* Final message — below the ribbon and bow */}
      <motion.p
        className="closing-final-note"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.7,
          ease,
        }}
      >
        We can't wait to celebrate with you!
      </motion.p>

      {/* Invitation card popup */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            className="invitation-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowCard(false);
              }
            }}
          >
            <motion.div
              className="invitation-popup"
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 15,
              }}
              transition={{ duration: 0.4, ease }}
            >
              <button
                type="button"
                className="invitation-close-button"
                onClick={() => setShowCard(false)}
                aria-label="Close invitation"
              >
                <X size={20} />
              </button>

              <img
                src="/images/invite.jpg"
                alt="Housewarming Invitation"
                className="invitation-popup-image"
              />

              <a
                href="/images/invitation.jpg"
                download="Housewarming-Invitation.jpg"
                className="invitation-download-button"
              >
                <Download size={16} />
                <span>Download Invitation</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Italiana&family=Montserrat:wght@500;600;700&display=swap');

        .closing-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          overflow: hidden;
          isolation: isolate;
          background: #f9eee0;
          color: #39452f;
        }

        .closing-background-image {
          position: absolute;
          inset: 0;
          z-index: -3;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          user-select: none;
        }

        .closing-soft-overlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          background: rgba(255, 249, 239, 0.025);
          pointer-events: none;
        }

        /* Greeting */
        .closing-main-content {
          position: absolute;
          top: 21%;
          left: 9%;
          width: 82%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .closing-eyebrow {
          margin: 0 0 7px;
          color: #68764b;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.8px;
          line-height: 1.4;
        }

        .closing-heading {
          width: 100%;
          max-width: 310px;
          margin: 0;
          color: #394b35;
          font-family: 'Italiana', serif;
          font-size: clamp(29px, 7.5vw, 36px);
          font-weight: 700;
          line-height: 1.12;
          text-align: center;
          text-wrap: balance;
        }

        .closing-heart {
          margin: 9px 0 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bd893b;
        }

        .closing-message {
          width: 100%;
          max-width: 290px;
          margin: 0;
          color: #65472f;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.35;
          text-align: center;
          text-wrap: pretty;
        }

        .closing-signature {
          width: 100%;
          margin: 10px 0 0;
          color: #435239;
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.2;
          text-align: center;
        }

        /* Button group — moved UP to 58% */
        .closing-actions {
          position: absolute;
          top: 58%;
          left: 0;
          z-index: 4;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .closing-card-button {
          width: 178px;
          min-height: 34px;
          padding: 0 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #b58a45;
          border-radius: 3px;
          background: rgba(63, 77, 49, 0.97);
          color: #fff8e9;
          box-shadow: 0 4px 12px rgba(72, 54, 27, 0.13);
          font-family: 'Montserrat', sans-serif;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 1px;
          white-space: nowrap;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .closing-replay-button {
          min-height: 25px;
          padding: 1px 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          background: transparent;
          color: #715333;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        /* Message below the bow */
        .closing-final-note {
          position: absolute;
          top: 90%;
          left: 5%;
          z-index: 3;
          width: 90%;
          margin: 0;
          color: #8b693b;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          font-weight: 700;
          line-height: 1.3;
          text-align: center;
          text-shadow: 0 1px 4px rgba(255, 249, 239, 0.8);
        }

        /* Floating sparkles */
        .closing-sparkles {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .closing-sparkle {
          position: absolute;
          color: #c69a45;
          font-size: 10px;
        }

        .sparkle-1 { top: 23%; left: 17%; }
        .sparkle-2 { top: 29%; right: 18%; }
        .sparkle-3 { top: 38%; left: 24%; }
        .sparkle-4 { top: 42%; right: 22%; }
        .sparkle-5 { top: 20%; right: 31%; }
        .sparkle-6 { top: 45%; left: 15%; }
        .sparkle-7 { top: 34%; right: 11%; }
        .sparkle-8 { top: 25%; left: 10%; }
        .sparkle-9 { top: 47%; right: 14%; }
        .sparkle-10 { top: 31%; left: 38%; }

        /* Popup */
        .invitation-modal {
          position: fixed;
          inset: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(32, 36, 25, 0.76);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .invitation-popup {
          position: relative;
          width: min(100%, 390px);
          max-height: 94%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          border: 1px solid #c6a46b;
          border-radius: 7px;
          background: #fff8ed;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
        }

        .invitation-close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 2;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(185, 145, 75, 0.7);
          border-radius: 50%;
          background: rgba(255, 249, 239, 0.94);
          color: #46543a;
          cursor: pointer;
        }

        .invitation-popup-image {
          display: block;
          width: 100%;
          max-height: calc(94svh - 95px);
          object-fit: contain;
          border-radius: 3px;
        }

        .invitation-download-button {
          width: 100%;
          min-height: 40px;
          margin-top: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 3px;
          background: #435239;
          color: #fff8e9;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          text-decoration: none;
        }

        /* Short mobile screens */
        @media (max-height: 700px) {
          .closing-main-content {
            top: 19%;
          }

          .closing-heading {
            font-size: 28px;
          }

          .closing-heart {
            margin: 6px 0 5px;
          }

          .closing-message {
            font-size: 14px;
            line-height: 1.3;
          }

          .closing-signature {
            margin-top: 7px;
            font-size: 17px;
          }

          .closing-actions {
            top: 58%;
            gap: 3px;
          }

          .closing-card-button {
            min-height: 31px;
          }

          .closing-final-note {
            top: 85%;
            font-size: 12px;
          }
        }

        @media (min-width: 700px) {
          .closing-main-content {
            top: 20%;
            left: 50%;
            width: min(440px, 72%);
            transform: translateX(-50%);
          }

          .closing-heading {
            font-size: 42px;
          }

          .closing-message {
            font-size: 19px;
          }

          .closing-signature {
            font-size: 23px;
          }

          .closing-actions {
            top: 58%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .closing-scene * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
