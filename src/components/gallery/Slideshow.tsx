"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export function Slideshow({ onImageClick }: { onImageClick?: (id: number) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const item = GALLERY_ITEMS[activeIndex];

  const goNext = useCallback(() => {
    setActiveIndex(i => (i + 1) % GALLERY_ITEMS.length);
    setLoaded(false);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex(i => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    setLoaded(false);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setLoaded(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, goNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div
      className="slideshow"
      onContextMenu={e => e.preventDefault()}
      onDragStart={e => e.preventDefault()}
    >
      <div className="slideshow-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            className="slideshow-slide"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <div className="slideshow-img-wrap" onClick={() => onImageClick?.(item.id)}>
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 760px) 100vw, 1120px"
                className={`slideshow-img img-protected ${loaded ? "loaded" : ""}`}
                onLoad={() => setLoaded(true)}
                priority
                draggable={false}
              />
              <div className="slideshow-shield" />
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="slideshow-nav slideshow-prev" onClick={goPrev} aria-label="Previous">
          <ChevronLeft size={24} />
        </button>

        <button className="slideshow-nav slideshow-next" onClick={goNext} aria-label="Next">
          <ChevronRight size={24} />
        </button>

        <div className="slideshow-controls">
          <span className="slideshow-counter">
            {String(activeIndex + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}
          </span>
          <button
            className="slideshow-play-toggle"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        <motion.div
          className="slideshow-caption"
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <span className="slideshow-caption-text">{item.caption}</span>
          <span className="slideshow-caption-cat">{item.category}</span>
        </motion.div>
      </div>

      <div className="slideshow-thumbs">
        {GALLERY_ITEMS.map((thumb, i) => (
          <button
            key={thumb.id}
            className={`slideshow-thumb ${i === activeIndex ? "is-active" : ""}`}
            onClick={() => goToSlide(i)}
            aria-label={thumb.caption}
          >
            <Image
              src={thumb.src}
              alt=""
              fill
              sizes="80px"
              className="img-protected"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
