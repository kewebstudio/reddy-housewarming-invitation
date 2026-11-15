
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.35;

    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setHasError(false);
    } catch (error) {
      console.error("Unable to play background music:", error);
      setIsPlaying(false);
      setHasError(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/music.mp3"
        preload="none"
        loop
      />

      <motion.button
        type="button"
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isPlaying}
        title={isPlaying ? "Pause music" : "Play music"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Playing pulse */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              className="music-pulse"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: [0.3, 0, 0.3],
                scale: [1, 1.55, 1],
              }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </AnimatePresence>

        <motion.span
          className="music-icon"
          animate={{
            rotate: isPlaying ? [0, 12, -12, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {isPlaying ? (
            <Music2 size={19} strokeWidth={1.7} />
          ) : (
            <VolumeX size={19} strokeWidth={1.7} />
          )}
        </motion.span>
      </motion.button>

      {hasError && (
        <span className="music-error-message" role="status">
          Music couldn't be played. Check your audio file.
        </span>
      )}
    </>
  );
}
