
import { motion } from "framer-motion";
import Door3D from "./Door3D";

export default function EntranceScene({ onContinue }) {
  return (
    <motion.section
      className="entrance-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Door3D onContinue={onContinue} />

      <style>{`
        .entrance-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          min-height: 500px;
          overflow: hidden;
          background: #171510;
          isolation: isolate;
        }

        .entrance-scene > * {
          width: 100%;
          height: 100%;
        }

        @media (max-width: 600px) {
          .entrance-scene {
            min-height: 100vh;
            min-height: 100dvh;
          }
        }
      `}</style>
    </motion.section>
  );
}
