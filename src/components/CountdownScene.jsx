
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  CalendarDays,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

/* =====================================
   COUNTDOWN CALCULATION
===================================== */

function getTimeRemaining(targetDate) {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (!Number.isFinite(difference) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/* =====================================
   INTERACTIVE SCRATCH CARD
===================================== */

function ScratchCard({ date, revealed, onReveal }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const revealedRef = useRef(false);
  const scratchCount = useRef(0);
  const lastCheck = useRef(0);

  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || revealed) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;

    // Champagne metallic scratch finish
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#D8BD87");
    gradient.addColorStop(0.22, "#F7E9CC");
    gradient.addColorStop(0.5, "#E7D1A7");
    gradient.addColorStop(0.78, "#F8EBD2");
    gradient.addColorStop(1, "#D5B77D");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Fine shimmer texture
    for (let x = 5; x < w; x += 12) {
      for (let y = 5; y < h; y += 12) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.arc(x, y, 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Inset gold border
    ctx.strokeStyle = "rgba(120,83,30,0.65)";
    ctx.lineWidth = 1;
    ctx.strokeRect(5, 5, w - 10, h - 10);

    // Scratch wording
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#46543A";
    ctx.font = "700 8px Montserrat, sans-serif";
    ctx.fillText("A LITTLE SURPRISE AWAITS", w / 2, h * 0.35);

    ctx.fillStyle = "#49351F";
    ctx.font = "600 22px Cormorant Garamond, Georgia, serif";
    ctx.fillText("Scratch to reveal", w / 2, h * 0.62);

    // Decorative stars
    ctx.fillStyle = "#926B2F";
    ctx.font = "bold 12px serif";
    ctx.fillText("✦", w * 0.12, h * 0.5);
    ctx.fillText("✦", w * 0.88, h * 0.5);

    scratchCount.current = 0;
    lastCheck.current = 0;
  }, [revealed]);

  useEffect(() => {
    initializeCanvas();

    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    let observer;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(initializeCanvas);
      observer.observe(canvas);
    }

    return () => observer?.disconnect();
  }, [initializeCanvas, revealed]);

  const checkProgress = () => {
    const canvas = canvasRef.current;

    if (!canvas || revealedRef.current) return;

    const now = Date.now();
    if (now - lastCheck.current < 150) return;

    lastCheck.current = now;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 20) {
      total++;
      if (pixels[i] < 100) transparent++;
    }

    if (total > 0 && transparent / total > 0.35) {
      revealedRef.current = true;
      onReveal();
    }
  };

  const scratch = (event) => {
    const canvas = canvasRef.current;

    if (!canvas || revealedRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 21, 0, Math.PI * 2);
    ctx.fill();

    scratchCount.current++;

    if (scratchCount.current % 4 === 0) {
      checkProgress();
    }
  };

  const handleDown = (event) => {
    if (revealedRef.current) return;

    event.preventDefault();
    drawing.current = true;

    canvasRef.current?.setPointerCapture?.(event.pointerId);
    scratch(event);
  };

  const handleMove = (event) => {
    if (!drawing.current || revealedRef.current) return;

    event.preventDefault();
    scratch(event);
  };

  const handleUp = (event) => {
    drawing.current = false;

    try {
      canvasRef.current?.releasePointerCapture?.(event.pointerId);
    } catch {
      // Pointer capture may already have been released.
    }

    checkProgress();
  };

  return (
    <div className="date-scratch-card">
      <div className="date-hidden-content">
        <span className="date-hidden-day">
          {date.day || "Sunday"}
        </span>

        <div className="date-hidden-main">
          <strong>{date.date || "20"}</strong>
          <span>
            {date.month || "December"} {date.year || "2026"}
          </span>
        </div>
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          className="date-scratch-canvas"
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerCancel={handleUp}
          aria-label="Scratch to reveal the special date"
        />
      )}
    </div>
  );
}

/* =====================================
   COUNTDOWN BOX
===================================== */

function CountdownBox({ value, label }) {
  return (
    <div className="date-countdown-box">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          className="date-countdown-number"
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.2 }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>

      <span className="date-countdown-label">{label}</span>
    </div>
  );
}

/* =====================================
   GOLDEN CELEBRATION BURST
===================================== */

function CelebrationBurst({ active }) {
  if (!active) return null;

  return (
    <div className="date-celebration-burst">
      {Array.from({ length: 34 }).map((_, index) => {
        const angle = (index / 34) * Math.PI * 2;
        const distance = 65 + (index % 5) * 15;

        return (
          <motion.span
            key={index}
            className="date-burst-particle"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [0, 1, 0.8, 0],
              scale: [0.3, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: (index % 6) * 0.025,
            }}
          >
            {index % 2 === 0 ? "✦" : "✧"}
          </motion.span>
        );
      })}
    </div>
  );
}

/* =====================================
   MAIN SCENE
===================================== */

export default function CountdownScene({ data, onContinue }) {
  const date = data?.date || {};

  const targetDate =
    date.iso || "2026-12-20T10:30:00+05:30";

  const [time, setTime] = useState(() =>
    getTimeRemaining(targetDate)
  );

  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const update = () => setTime(getTimeRemaining(targetDate));

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleReveal = () => {
    setIsRevealed(true);

    const colors = [
      "#C69A45",
      "#E8D5B5",
      "#A4AC8C",
      "#FFF4D9",
      "#59684D",
    ];

    confetti({
      particleCount: 100,
      spread: 90,
      startVelocity: 34,
      origin: { x: 0.5, y: 0.49 },
      colors,
      scalar: 1,
      ticks: 180,
    });

    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 65,
        origin: { x: 0.12, y: 0.56 },
        colors,
      });

      confetti({
        particleCount: 35,
        angle: 120,
        spread: 65,
        origin: { x: 0.88, y: 0.56 },
        colors,
      });
    }, 250);
  };

  const handleScratchAgain = () => {
    setIsRevealed(false);
  };

  return (
    <section className="countdown-scene">

      {/* ORIGINAL FULL-SCREEN TEMPLATE */}
      <motion.img
        src="/images/date.jpg"
        alt=""
        className="countdown-template-image"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1 }}
      />

      {/* HEADING */}
      <motion.div
        className="countdown-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="countdown-eyebrow">
          A MOMENT TO REMEMBER
        </span>

        <h1>{date.heading || "Save The Date"}</h1>

        <p>
          {date.message ||
            "A special day. A beautiful new beginning."}
        </p>
      </motion.div>

      {/* INVITATION MESSAGE */}
      <motion.div
        className="countdown-invitation-message"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55 }}
      >
        <div className="countdown-message-ornament">
          <span />
          <Sparkles size={13} strokeWidth={1.5} />
          <span />
        </div>

        <h2>A New Chapter Begins</h2>
      </motion.div>

      {/* SCRATCH PLAQUE */}
      <motion.div
        className="countdown-scratch-position"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.7 }}
      >
        <div className="scratch-plaque-decoration">
          <span className="scratch-plaque-corner top-left" />
          <span className="scratch-plaque-corner top-right" />
          <span className="scratch-plaque-corner bottom-left" />
          <span className="scratch-plaque-corner bottom-right" />
          <span className="scratch-plaque-shimmer" />
        </div>

        <ScratchCard
          date={date}
          revealed={isRevealed}
          onReveal={handleReveal}
        />

        <CelebrationBurst active={isRevealed} />
      </motion.div>

      {/* COUNTDOWN */}
      <div className="countdown-timer-position">
        <div className="countdown-timer-grid">
          <CountdownBox
            value={isRevealed ? time.days : 0}
            label="DAYS"
          />

          <CountdownBox
            value={isRevealed ? time.hours : 0}
            label="HOURS"
          />

          <CountdownBox
            value={isRevealed ? time.minutes : 0}
            label="MINS"
          />

          <CountdownBox
            value={isRevealed ? time.seconds : 0}
            label="SECS"
          />
        </div>
      </div>

      {/* BOTTOM ACTION */}
      <AnimatePresence mode="wait">
        {isRevealed ? (
          <motion.div
            key="revealed-actions"
            className="countdown-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <motion.button
              type="button"
              className="countdown-continue"
              onClick={onContinue}
              whileHover={{ y: -2, scale: 1.025 }}
              whileTap={{ scale: 0.96 }}
            >
              <CalendarDays size={14} />
              <span>EXPLORE THE VENUE</span>
              <ArrowRight size={14} />
            </motion.button>

            <button
              type="button"
              className="countdown-retry"
              onClick={handleScratchAgain}
            >
              <RotateCcw size={11} />
              Scratch again
            </button>
          </motion.div>
        ) : (
          <motion.p
            key="waiting-note"
            className="countdown-bottom-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            A BEAUTIFUL BEGINNING AWAITS
          </motion.p>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Italiana&family=Montserrat:wght@400;500;600;700&display=swap');

        .countdown-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          overflow: hidden;
          isolation: isolate;
          background: #f8eee1;
        }

        /* FULL-SCREEN IMAGE */

        .countdown-template-image {
          position: absolute;
          inset: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          user-select: none;
        }

        /* MAIN HEADING */

        .countdown-header {
          position: absolute;
          top: 22.5%;
          left: 7%;
          width: 86%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .countdown-eyebrow {
          color: #46543A;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2.2px;
        }

        .countdown-header h1 {
          margin: 7px 0 4px;
          color: #293B27;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 8vw, 45px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.3px;
          text-shadow: 0 1px 0 rgba(255,255,255,0.3);
        }

        .countdown-header p {
          max-width: 280px;
          margin: 4px 0 0;
          color: #49351F;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.3;
        }

        /* INVITATION MESSAGE */

        .countdown-invitation-message {
          position: absolute;
          top: 37.3%;
          left: 10%;
          width: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .countdown-message-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #926B2F;
          margin-bottom: 5px;
        }

        .countdown-message-ornament span {
          width: 28px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #926B2F
          );
        }

        .countdown-invitation-message h2 {
          margin: 0;
          color: #35452D;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(23px, 5.8vw, 29px);
          font-weight: 700;
          line-height: 1.15;
        }

        /* SCRATCH PLAQUE */

        .countdown-scratch-position {
          position: absolute;
          top: 48%;
          left: 17%;
          width: 66%;
          height: 10%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }

        .scratch-plaque-decoration {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          border: 1px solid rgba(154, 111, 43, 0.65);
          border-radius: 20px;
          box-shadow:
            inset 0 0 0 3px rgba(255, 250, 236, 0.48),
            0 2px 8px rgba(137, 101, 44, 0.10);
        }

        .scratch-plaque-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: #a77B37;
          border-style: solid;
        }

        .scratch-plaque-corner.top-left {
          top: 3px;
          left: 3px;
          border-width: 1px 0 0 1px;
        }

        .scratch-plaque-corner.top-right {
          top: 3px;
          right: 3px;
          border-width: 1px 1px 0 0;
        }

        .scratch-plaque-corner.bottom-left {
          bottom: 3px;
          left: 3px;
          border-width: 0 0 1px 1px;
        }

        .scratch-plaque-corner.bottom-right {
          bottom: 3px;
          right: 3px;
          border-width: 0 1px 1px 0;
        }

        .scratch-plaque-shimmer {
          position: absolute;
          top: 0;
          left: -45%;
          width: 25%;
          height: 100%;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.35),
            transparent
          );
          animation: plaqueShimmer 4.5s ease-in-out infinite;
        }

        @keyframes plaqueShimmer {
          0%, 65% {
            transform: translateX(0);
            opacity: 0;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateX(570%);
            opacity: 0;
          }
        }

        /* SCRATCH CARD */

        .date-scratch-card {
          position: absolute;
          inset: 5px;
          z-index: 2;
          overflow: hidden;
          border-radius: 16px;
          background: rgba(255, 249, 239, 0.1);
          touch-action: none;
        }

        .date-hidden-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1px;
          background: rgba(255, 249, 239, 0.12);
          color: #293B27;
        }

        .date-hidden-day {
          color: #46543A;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .date-hidden-main {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
        }

        .date-hidden-main strong {
          color: #293B27;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(29px, 7vw, 39px);
          font-weight: 700;
          line-height: 1;
        }

        .date-hidden-main span {
          color: #49351F;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(15px, 3.8vw, 20px);
          font-weight: 700;
        }

        .date-scratch-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          cursor: crosshair;
          touch-action: none;
        }

        /* SPARKLE BURST */

        .date-celebration-burst {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          z-index: 5;
          pointer-events: none;
        }

        .date-burst-particle {
          position: absolute;
          top: 0;
          left: 0;
          color: #A77D35;
          font-size: 15px;
          text-shadow: 0 0 8px rgba(198,154,69,0.6);
        }

        /* COUNTDOWN */

        .countdown-timer-position {
          position: absolute;
          top: 65.5%;
          left: 10%;
          width: 80%;
          height: 8.8%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .countdown-timer-grid {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: center;
          gap: 8px;
        }

        .date-countdown-box {
          min-width: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          text-align: center;
        }

        .date-countdown-number {
          color: #293B27;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(25px, 6.2vw, 35px);
          font-weight: 700;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .date-countdown-label {
          color: #493B27;
          font-family: 'Montserrat', sans-serif;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.9px;
        }

        /* NEXT BUTTON */

        .countdown-actions {
          position: absolute;
          top: 79%;
          left: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .countdown-continue {
          width: min(74%, 235px);
          min-height: 38px;
          padding: 0 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          border: 1px solid #A77D3E;
          border-radius: 3px;
          background: linear-gradient(
            135deg,
            #35452D,
            #263522
          );
          color: #FFF8E9;
          box-shadow: 0 5px 15px rgba(65,56,35,0.16);
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .countdown-retry {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border: 0;
          background: transparent;
          color: #60452F;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 700;
          font-style: italic;
          cursor: pointer;
        }

        .countdown-bottom-note {
          position: absolute;
          top: 79%;
          left: 8%;
          width: 84%;
          margin: 0;
          text-align: center;
          color: #493B27;
          font-family: 'Montserrat', sans-serif;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        /* SHORT MOBILE SCREENS */

        @media (max-height: 700px) {
          .countdown-header {
            top: 21%;
          }

          .countdown-header h1 {
            font-size: 32px;
          }

          .countdown-invitation-message {
            top: 36.5%;
          }

          .countdown-invitation-message h2 {
            font-size: 22px;
          }

          .countdown-scratch-position {
            top: 48%;
            height: 9.5%;
          }

          .countdown-timer-position {
            top: 65%;
          }

          .countdown-actions,
          .countdown-bottom-note {
            top: 79%;
          }

          .countdown-continue {
            min-height: 35px;
          }
        }

        /* TABLET AND DESKTOP */

        @media (min-width: 700px) {
          .countdown-header {
            top: 22.5%;
          }

          .countdown-invitation-message {
            left: 50%;
            width: min(80%, 440px);
            transform: translateX(-50%);
          }

          .countdown-scratch-position {
            left: 50%;
            width: min(66%, 420px);
            transform: translateX(-50%);
          }

          .countdown-timer-position {
            left: 50%;
            width: min(80%, 500px);
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scratch-plaque-shimmer {
            animation: none;
          }

          .date-celebration-burst {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
