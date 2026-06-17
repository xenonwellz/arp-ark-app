"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export function Lightbox({
  imageId,
  onClose
}: {
  imageId: number | null;
  onClose: () => void;
}) {
  const startIndex = imageId !== null
    ? GALLERY_ITEMS.findIndex(i => i.id === imageId)
    : 0;
  const [viewIndex, setViewIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setViewIndex(i => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setViewIndex(i => Math.min(GALLERY_ITEMS.length - 1, i + 1));
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const currentItem = GALLERY_ITEMS[viewIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onContextMenu={e => e.preventDefault()}
        onDragStart={e => e.preventDefault()}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="lightbox-image">
            <Image
              src={currentItem.src}
              alt={currentItem.caption}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className={`lightbox-img img-protected ${loaded ? "loaded" : ""}`}
              onLoad={() => setLoaded(true)}
              priority
              draggable={false}
            />
            <div className="img-shield" />
            {!loaded && (
              <div className="lightbox-placeholder">
                <span className="lightbox-caption">{currentItem.caption}</span>
              </div>
            )}
            <div className="lightbox-info">
              <span className="lightbox-caption-label">{currentItem.caption}</span>
              <span className="lightbox-category-label">{currentItem.category}</span>
            </div>
          </div>

          <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
            <X size={28} />
          </button>

          {viewIndex > 0 && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => { setViewIndex(i => i - 1); setLoaded(false); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {viewIndex < GALLERY_ITEMS.length - 1 && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={() => { setViewIndex(i => i + 1); setLoaded(false); }}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <div className="lightbox-counter">
            {viewIndex + 1} / {GALLERY_ITEMS.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
