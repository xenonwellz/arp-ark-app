"use client";

import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/config";
import { motion } from "framer-motion";

export function GalleryGrid({
  onImageClick
}: {
  onImageClick: (id: number) => void;
}) {
  return (
    <div
      className="gallery-grid-bento"
      onContextMenu={e => e.preventDefault()}
      onDragStart={e => e.preventDefault()}
    >
      {GALLERY_ITEMS.map((item, i) => {
        const cs = item.colSpan || 1;
        const rs = item.rowSpan || 1;
        return (
          <motion.button
            key={item.id}
            className="gallery-card-bento"
            data-cols={cs}
            data-rows={rs}
            onClick={() => onImageClick(item.id)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="gallery-card-img img-protected"
              draggable={false}
            />
            <div className="gallery-card-overlay">
              <span className="gallery-card-caption">{item.caption}</span>
              <span className="gallery-card-category">{item.category}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
