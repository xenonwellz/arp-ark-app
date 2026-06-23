"use client";

import { useEffect, useRef } from "react";

const GRATITUDE_AUDIO_SRC = "/audio/gratitude-brandon-lake.mp3";

export function OpeningMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const playAudio = () => {
      audio.play().catch(() => {
        // Browsers can block audible autoplay until the first visitor interaction.
      });
    };

    playAudio();

    window.addEventListener("pointerdown", playAudio, { once: true });
    window.addEventListener("keydown", playAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("keydown", playAudio);
    };
  }, []);

  return (
    <div className="opening-music" aria-hidden="true">
      <audio ref={audioRef} src={GRATITUDE_AUDIO_SRC} autoPlay loop preload="auto" />
    </div>
  );
}
