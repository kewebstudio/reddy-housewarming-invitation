import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sparkles = Array.from({ length: 32 }, (_, i) => ({
  left: `${4 + ((i * 37) % 92)}%`,
  top: `${5 + ((i * 23) % 88)}%`,
  delay: (i % 10) * 0.16,
  size: i % 4 === 0 ? 5 : 3,
}));

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.32,
      delayChildren: 0.15,
    },
  },
};

const revealText = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealHeading = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealLine = {
  hidden: {
    opacity: 0,
    scaleX: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Door3D({ onOpened, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showInside, setShowInside] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const timers = useRef([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const openDoors = () => {
    if (isOpening) return;

    setIsOpening(true);

    timers.current.push(
      setTimeout(() => setShowInside(true), 900)
    );

    timers.current.push(
      setTimeout(() => setShowWelcome(true), 1700)
    );

    timers.current.push(
      setTimeout(() => setShowContinue(true), 6200)
    );
  };

  const continueToNextScene = () => {
    if (typeof onOpened === "function") {
      onOpened();
    } else if (typeof onOpen === "function") {
      onOpen();
    }
  };

  return (
    <>
      <section className="door3d-scene">

        {/* OPEN HOUSE IMAGE */}
        <motion.div
          className="door3d-interior"
          initial={{ opacity: 0 }}
          animate={{ opacity: showInside ? 1 : 0 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src="/images/open-doors.jpg"
            alt="Welcome to our new home"
            draggable="false"
          />
        </motion.div>

        {/* GOLDEN REVEAL LIGHT */}
        <motion.div
          className="door3d-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0.42 : 0 }}
          transition={{ duration: 2 }}
        />

        <motion.div
          className="door3d-glow"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: isOpening ? 0.55 : 0,
            scale: isOpening ? 1.5 : 0.7,
          }}
          transition={{ duration: 2.2 }}
        />

        {/* INVITATION TEXT — BEHIND THE DOORS */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              className="door3d-text-position"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div
                className="door3d-text-content"
                variants={textContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="door3d-text-top"
                  variants={revealText}
                >
                  <motion.span variants={revealLine} />
                  <i>✦</i>
                  <motion.span variants={revealLine} />
                </motion.div>

                <motion.div
                  className="door3d-text-eyebrow"
                  variants={revealText}
                >
                  YOU ARE CORDIALLY INVITED
                </motion.div>

                <motion.h1
                  className="door3d-heading"
                  variants={revealHeading}
                >
                  Housewarming
                </motion.h1>

                <motion.h1
                  className="door3d-heading door3d-heading-second"
                  variants={revealHeading}
                >
                  Ceremony
                </motion.h1>

                <motion.div
                  className="door3d-text-divider"
                  variants={revealText}
                >
                  <motion.span variants={revealLine} />
                  <i>❧</i>
                  <motion.span variants={revealLine} />
                </motion.div>

                <motion.p
                  className="door3d-text-message"
                  variants={revealText}
                >
                  A New Beginning
                </motion.p>

                {/* INVITATION PARAGRAPH */}
                <div className="door3d-description-group">
                  <motion.p variants={revealText}>
  We joyfully invite you
</motion.p>

                  <motion.p variants={revealText}>
                    to celebrate our new home,
                  </motion.p>

                  <motion.p variants={revealText}>
                    and share this beautiful beginning with us.
                  </motion.p>
                </div>

                <motion.div
                  className="door3d-text-flourish"
                  variants={revealText}
                >
                  ❦
                </motion.div>

                <motion.div
                  className="door3d-text-footer"
                  variants={revealText}
                >
                  WE WOULD LOVE TO CELEBRATE WITH YOU
                </motion.div>

                <motion.div
                  className="door3d-text-bottom"
                  variants={revealText}
                >
                  <span />
                  ✧
                  <span />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DOUBLE DOORS */}
        <div className="door3d-frame-doors">
          <motion.div
            className="door3d-panel door3d-left"
            initial={false}
            animate={{
              rotateY: isOpening ? 108 : 0,
            }}
            transition={{
              duration: 2.65,
              ease: [0.45, 0, 0.2, 1],
            }}
          />

          <motion.div
            className="door3d-panel door3d-right"
            initial={false}
            animate={{
              rotateY: isOpening ? -108 : 0,
            }}
            transition={{
              duration: 2.65,
              ease: [0.45, 0, 0.2, 1],
            }}
          />
        </div>

        {/* GOLDEN SPARKLES */}
        <div className="door3d-sparkles" aria-hidden="true">
          {sparkles.map((item, index) => (
            <motion.span
              key={index}
              className="door3d-sparkle"
              style={{
                left: item.left,
                top: item.top,
                width: item.size,
                height: item.size,
              }}
              animate={
                isOpening
                  ? {
                      opacity: [0, 1, 0.8, 0],
                      scale: [0.2, 1.7, 1, 0.2],
                      y: [0, -35, -65, -90],
                    }
                  : {
                      opacity: [0.12, 0.65, 0.12],
                      scale: [0.65, 1.2, 0.65],
                      y: [0, -12, 0],
                    }
              }
              transition={{
                duration: isOpening ? 2.3 : 4,
                delay: item.delay,
                repeat: isOpening ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* TAP TO OPEN */}
        <AnimatePresence>
          {!isOpening && (
            <div className="door3d-tap-position">
              <motion.button
                type="button"
                className="door3d-tap"
                onClick={openDoors}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="door3d-tap-line" />

                <span className="door3d-tap-label">
                  TAP TO OPEN
                </span>

                <motion.span
                  className="door3d-tap-arrow"
                  animate={{
                    y: [0, 5, 0],
                    opacity: [0.65, 1, 0.65],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  ↓
                </motion.span>

                <span className="door3d-tap-line" />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* CONTINUE BUTTON */}
        <AnimatePresence>
          {showContinue && (
            <div className="door3d-continue-position">
              <motion.button
                type="button"
                className="door3d-continue"
                onClick={continueToNextScene}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.15,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="door3d-continue-sparkle">
                  ✧
                </span>

                <span className="door3d-continue-label">
                  VIEW YOUR INVITATION
                </span>

                <motion.span
                  className="door3d-continue-arrow"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          )}
        </AnimatePresence>

      </section>

      <style>{`

        .door3d-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          height: 100svh;
          overflow: hidden;
          background: #302016;
          perspective: 1800px;
          isolation: isolate;
        }

        .door3d-interior {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .door3d-interior img {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
          object-fit: cover;
          object-position: center;
          margin: 0;
          padding: 0;
          border: 0;
          user-select: none;
          -webkit-user-drag: none;
        }

        .door3d-light {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 224, 170, 0.4),
            rgba(226, 181, 103, 0.1) 48%,
            transparent 75%
          );
        }

        .door3d-glow {
          position: absolute;
          z-index: 1;
          top: 20%;
          left: 17.5%;
          width: 65%;
          height: 55%;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(
            circle,
            rgba(255, 224, 165, 0.4),
            transparent 70%
          );
          filter: blur(35px);
        }

        /* TEXT — BEHIND THE DOOR PANELS */

        .door3d-text-position {
          position: absolute;
          z-index: 2;
          top: 12%;
          left: 50%;
          width: min(88%, 440px);
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          pointer-events: none;
        }

        .door3d-text-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          padding: 5px 8px;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .door3d-text-top {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 65%;
          margin-bottom: 14px;
        }

        .door3d-text-top span,
        .door3d-text-divider span {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #a78350,
            transparent
          );
          transform-origin: center;
        }

        .door3d-text-top i,
        .door3d-text-divider i {
          color: #8b673b;
          font-size: 17px;
          font-style: normal;
        }

        .door3d-text-eyebrow {
          color: #59432f;
          font-family: "Inter", sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.19em;
          margin-bottom: 12px;
          text-align: center;
        }

        .door3d-heading {
          display: block;
          margin: 0;
          color: #263b25;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(36px, 9.5vw, 59px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: 0.005em;
          text-align: center;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.35);
        }

        .door3d-heading-second {
          color: #9a6c2e;
          font-size: clamp(43px, 10.5vw, 68px);
          font-style: italic;
          font-weight: 600;
          margin-top: 2px;
        }

        .door3d-text-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 65%;
          margin: 15px 0 12px;
        }

        .door3d-text-message {
          margin: 0;
          color: #46543c;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(21px, 5.5vw, 27px);
          font-weight: 700;
          line-height: 1.3;
        }

        /* THICKER PARAGRAPH WITH SIDE SPACING */

        .door3d-description-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 84%;
          max-width: 340px;
          margin: 13px auto 0;
          padding: 0 5px;
          box-sizing: border-box;
          text-align: center;
        }

        .door3d-description-group p {
          width: 100%;
          margin: 0;
          color: #493522;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(16px, 4vw, 19px);
          font-weight: 700;
          line-height: 1.42;
          letter-spacing: 0.005em;
          text-align: center;
          text-shadow: 0 0.35px 0 rgba(73, 53, 34, 0.35);
        }

        .door3d-text-flourish {
          margin-top: 12px;
          color: #8b673b;
          font-size: 25px;
          line-height: 1;
        }

        .door3d-text-footer {
          margin-top: 9px;
          color: #46543c;
          font-family: "Inter", sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-align: center;
        }

        .door3d-text-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
          color: #8b673b;
          font-size: 13px;
        }

        .door3d-text-bottom span {
          width: 35px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #a78350,
            transparent
          );
        }

        /* DOUBLE DOORS — IN FRONT OF THE TEXT */

        .door3d-frame-doors {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          width: 100%;
          height: 100%;
          perspective: 1800px;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .door3d-panel {
          position: relative;
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-image: url("/images/closed-doors.jpg");
          background-repeat: no-repeat;
          background-size: 200% 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
        }

        .door3d-left {
          transform-origin: left center;
          background-position: left center;
        }

        .door3d-right {
          transform-origin: right center;
          background-position: right center;
        }

        /* SPARKLES */

        .door3d-sparkles {
          position: absolute;
          inset: 0;
          z-index: 4;
          overflow: hidden;
          pointer-events: none;
        }

        .door3d-sparkle {
          position: absolute;
          border-radius: 50%;
          background: #fff0c7;
          box-shadow:
            0 0 7px #e9c77e,
            0 0 16px rgba(233, 199, 126, 0.7);
        }

        /* TAP BUTTON */

        .door3d-tap-position {
          position: absolute;
          z-index: 10;
          left: 50%;
          bottom: 8%;
          width: max-content;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          pointer-events: none;
        }

        .door3d-tap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 30px;
          border: 1px solid rgba(239, 211, 164, 0.75);
          border-radius: 3px;
          background: linear-gradient(
            135deg,
            rgba(55, 35, 22, 0.92),
            rgba(89, 59, 35, 0.88)
          );
          color: #fff9ed;
          font-family: "Inter", sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.24em;
          white-space: nowrap;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          -webkit-appearance: none;
          appearance: none;
        }

        .door3d-tap-arrow {
          color: #efd3a4;
          font-size: 17px;
          line-height: 1;
        }

        .door3d-tap-line {
          width: 35px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #efd3a4,
            transparent
          );
        }

        /* CONTINUE BUTTON */

        .door3d-continue-position {
          position: absolute;
          z-index: 12;
          left: 50%;
          bottom: max(10%, env(safe-area-inset-bottom));
          width: max-content;
          max-width: 88%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          pointer-events: none;
        }

        .door3d-continue {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: auto;
          min-width: 0;
          max-width: 100%;
          padding: 13px 13px;
          border: 1px solid rgba(224, 190, 131, 0.95);
          outline: 1px solid rgba(255, 248, 229, 0.5);
          outline-offset: -5px;
          border-radius: 2px;
          background: linear-gradient(
            135deg,
            rgba(73, 51, 33, 0.96),
            rgba(112, 82, 48, 0.96)
          );
          color: #fff8e9;
          font-family: "Inter", sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.1em;
          white-space: nowrap;
          cursor: pointer;
          pointer-events: auto;
          box-shadow:
            0 8px 25px rgba(40, 24, 12, 0.3),
            0 0 20px rgba(239, 211, 164, 0.25);
          -webkit-appearance: none;
          appearance: none;
        }

        .door3d-continue-sparkle {
          color: #f1d39d;
          font-size: 14px;
        }

        .door3d-continue-arrow {
          color: #f1d39d;
          font-size: 14px;
          line-height: 1;
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .door3d-scene {
            width: 100%;
            height: 100vh;
            height: 100dvh;
            height: 100svh;
          }

          .door3d-interior img {
            object-fit: cover;
            object-position: center;
          }

          .door3d-text-position {
            top: 12%;
            width: 92%;
          }

          .door3d-text-content {
            padding: 4px 5px;
          }

          .door3d-text-top {
            margin-bottom: 10px;
          }

          .door3d-text-eyebrow {
            font-size: 8px;
            letter-spacing: 0.16em;
            margin-bottom: 10px;
          }

          .door3d-heading {
            font-size: clamp(34px, 9.8vw, 48px);
          }

          .door3d-heading-second {
            font-size: clamp(42px, 11.2vw, 56px);
          }

          .door3d-text-divider {
            margin: 13px 0 10px;
          }

          .door3d-text-message {
            font-size: 21px;
          }

          .door3d-description-group {
            width: 70.5%;
            max-width: 310px;
            margin-top: 10px;
            gap: 4px;
            padding: 0 4px;
          }

          .door3d-description-group p {
            font-size: 16px;
            font-weight: 700;
            line-height: 1.4;
          }

          .door3d-text-flourish {
            margin-top: 9px;
            font-size: 23px;
          }

          .door3d-text-footer {
            margin-top: 7px;
            font-size: 7px;
            letter-spacing: 0.12em;
          }

          .door3d-text-bottom {
            margin-top: 8px;
          }

          .door3d-tap-position {
            bottom: 8%;
          }

          .door3d-tap {
            padding: 12px 26px;
            gap: 7px;
            font-size: 9px;
          }

          .door3d-continue-position {
            bottom: max(10%, env(safe-area-inset-bottom));
            max-width: 76%;
          }

          .door3d-continue {
            gap: 7px;
            padding: 12px 9px;
            font-size: 7px;
            letter-spacing: 0.07em;
          }

          .door3d-continue-sparkle,
          .door3d-continue-arrow {
            font-size: 12px;
          }
        }

        /* SHORT SCREENS */

        @media (max-height: 600px) {
          .door3d-text-position {
            top: 8%;
            width: min(88%, 390px);
          }

          .door3d-text-content {
            padding: 2px 5px;
          }

          .door3d-text-top {
            margin-bottom: 6px;
          }

          .door3d-text-eyebrow {
            margin-bottom: 6px;
          }

          .door3d-heading {
            font-size: 33px;
            line-height: 0.98;
          }

          .door3d-heading-second {
            font-size: 38px;
          }

          .door3d-text-divider {
            margin: 8px 0 6px;
          }

          .door3d-description-group {
            width: 84%;
            margin-top: 5px;
            gap: 3px;
          }

          .door3d-description-group p {
            font-size: 13px;
            font-weight: 700;
          }

          .door3d-text-flourish {
            margin-top: 5px;
          }

          .door3d-text-footer {
            margin-top: 4px;
          }

          .door3d-text-bottom {
            margin-top: 5px;
          }

          .door3d-continue-position {
            bottom: 8%;
          }
        }

      `}</style>
    </>
  );
}