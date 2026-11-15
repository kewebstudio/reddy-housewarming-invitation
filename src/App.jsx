
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Door3D from "./components/Door3D";
import FamilyScene from "./components/FamilyScene";
import CountdownScene from "./components/CountdownScene";
import VenueScene from "./components/VenueScene";
import ClosingScene from "./components/ClosingScene";

import FloatingEffects from "./components/FloatingEffects";
import housewarmingData from "./data/housewarmingData";

const scenes = [
  "entrance",
  "family",
  "countdown",
  "venue",
  "closing",
];

export default function App() {
  const [currentScene, setCurrentScene] = useState("entrance");

  const nextScene = () => {
    setCurrentScene((current) => {
      const currentIndex = scenes.indexOf(current);
      const nextIndex = Math.min(currentIndex + 1, scenes.length - 1);

      return scenes[nextIndex];
    });
  };

  const restartInvitation = () => {
    setCurrentScene("entrance");
  };

  const renderScene = () => {
    switch (currentScene) {
      case "entrance":
        return <Door3D onOpened={nextScene} />;

      case "family":
        return (
          <FamilyScene
            data={housewarmingData}
            onContinue={nextScene}
          />
        );

      case "countdown":
        return (
          <CountdownScene
            data={housewarmingData}
            onContinue={nextScene}
          />
        );

      case "venue":
        return (
          <VenueScene
            data={housewarmingData}
            onContinue={nextScene}
          />
        );

      case "closing":
        return (
          <ClosingScene
            data={housewarmingData}
            onRestart={restartInvitation}
          />
        );

      default:
        return <Door3D onOpened={nextScene} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#FFF9EF]">
      <FloatingEffects />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentScene}
          className="min-h-screen w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
