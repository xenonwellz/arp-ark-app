"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GalleryGrid, Lightbox, Slideshow } from "@/components/gallery";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function GalleryPage() {
    const [lightboxId, setLightboxId] = useState<number | null>(null);

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-overlay" />
                <div className="page-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="page-hero-eyebrow">
                            <span className="chapter-mark">Moments to Treasure</span>
                        </div>
                        <h1>Our Journey<br />in Pictures</h1>
                        <p className="page-hero-sub">
                            A collection of sacred moments from this journey of faith and love.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="moments-section section-band">
                <ScrollReveal>
                    <Slideshow onImageClick={id => setLightboxId(id)} />
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                    <GalleryGrid onImageClick={id => setLightboxId(id)} />
                </ScrollReveal>
            </section>

            {lightboxId !== null && <Lightbox key={lightboxId} imageId={lightboxId} onClose={() => setLightboxId(null)} />}
        </>
    );
}
