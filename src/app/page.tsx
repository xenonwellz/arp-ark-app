"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { YouTubeFrame } from "@/components/VideoEmbed";
import { EXPLORE_SECTIONS, SCRIPTURE } from "@/lib/config";

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="hero-media" aria-hidden="true">
                    <Image
                        src="/royal-priesthood-preview.png"
                        alt=""
                        priority
                        fill
                        sizes="100vw"
                        className="hero-media-img"
                    />
                    <div className="hero-overlay" />
                </div>

                <motion.div
                    className="hero-inner"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="hero-content">
                        <motion.p
                            className="hero-eyebrow"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            A Royal Declaration
                        </motion.p>

                        <h1 className="hero-title">
                            Our Prince<br />
                            <em>is Here.</em>
                        </h1>

                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            With hearts full of wonder and thanksgiving, we welcome the son
                            God has entrusted to us. A sign of covenant joy and generational promise.
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <span className="hero-scroll-text">Scroll</span>
                    <div className="hero-scroll-line" />
                </motion.div>
            </section>

            <section className="home-video-section section-band">
                <div className="container-wide">
                    <ScrollReveal>
                        <div>
                            <span className="chapter-mark">The Revelation</span>
                            <h2 style={{ marginTop: 16, fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 400 }}>
                                It&apos;s a Boy
                            </h2>
                            <p style={{ marginTop: 14, color: "var(--muted)", maxWidth: 480 }}>
                                Watch the moment we discovered our prince was on his way.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div className="video-frame">
                            <YouTubeFrame title="Gender Reveal Video" videoId="Lw7lLZIszRQ" />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="explore-section section-band">
                <div className="container-wide">
                    <ScrollReveal>
                        <div className="explore-header">
                            <span className="chapter-mark">Chapters</span>
                            <h2>Explore the Celebration</h2>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="explore-list">
                            {EXPLORE_SECTIONS.map((item, i) => (
                                <Link key={item.href} href={item.href} className="explore-item">
                                    <span className="explore-number">{String(i + 1).padStart(2, "0")}</span>
                                    <div className="explore-body">
                                        <h3 className="explore-title">{item.label}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <ArrowRight size={22} className="explore-arrow" />
                                </Link>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="home-closing">
                <ScrollReveal>
                    <span className="chapter-mark">The Promise</span>
                    <p className="closing-scripture">
                        &ldquo;But you are a chosen generation, a royal priesthood, a holy nation, His own special people.&rdquo;
                    </p>
                    <p style={{ fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginTop: 12 }}>
                        1 Peter 2:9
                    </p>
                    <Link href="/story" className="text-link" style={{ marginTop: 32 }}>
                        Read Our Story <ArrowRight size={16} />
                    </Link>
                </ScrollReveal>
            </section>
        </>
    );
}
