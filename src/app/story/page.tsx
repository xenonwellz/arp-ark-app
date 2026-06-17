"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { YouTubeFrame } from "@/components/VideoEmbed";
import { TESTIMONY, MILESTONES } from "@/lib/config";

export default function StoryPage() {
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
                            <span className="chapter-mark">{TESTIMONY.eyebrow}</span>
                        </div>
                        <h1>{TESTIMONY.title}</h1>
                        <p className="page-hero-sub">{TESTIMONY.deck}</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-band section-dark">
                <ScrollReveal>
                    <article className="story-article">
                        <div className="article-body">
                            <p className="lead">{TESTIMONY.opening[0]}</p>
                            {TESTIMONY.opening.slice(1).map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            <hr className="article-break" />

                            <span className="article-section-label">The Years of Service</span>
                            {TESTIMONY.service.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            <hr className="article-break" />

                            <span className="article-section-label">The Encounter</span>
                            {TESTIMONY.encounter.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            <blockquote className="pullquote">
                                <p>&ldquo;{TESTIMONY.pullQuote}&rdquo;</p>
                                <cite>{TESTIMONY.pullQuoteAttribution}</cite>
                            </blockquote>

                            <span className="article-section-label">The Shift</span>
                            {TESTIMONY.shift.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            <hr className="article-break" />

                            <span className="article-section-label">Reflection</span>
                            {TESTIMONY.reflection.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            <aside className="scripture-aside">
                                <span className="scripture-aside-ref">{TESTIMONY.scripture.reference}</span>
                                <p className="scripture-aside-text">{TESTIMONY.scripture.text}</p>
                            </aside>

                            <span className="article-section-label">Gratitude</span>
                            {TESTIMONY.gratitude.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            <hr className="article-break" />

                            <span className="article-section-label">Encouragement</span>
                            {TESTIMONY.encouragement.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            <p className="article-signature">{TESTIMONY.signature}</p>
                        </div>
                    </article>
                </ScrollReveal>
            </section>

            <section className="how-we-met section-band">
                <ScrollReveal>
                    <div className="how-we-met-header">
                        <span className="chapter-mark">How We Met</span>
                        <h2>The Beginning</h2>
                    </div>
                </ScrollReveal>

                <div className="milestones">
                    {MILESTONES.map((m, i) => (
                        <ScrollReveal key={m.title} delay={i * 0.1}>
                            <div className="milestone">
                                <span className="milestone-number">{m.number}</span>
                                <div>
                                    <h3>{m.title}</h3>
                                    <p className="milestone-subtitle">{m.subtitle}</p>
                                    <p className="milestone-text">{m.text}</p>
                                    <details className="milestone-text" style={{ marginTop: 12 }}>
                                        <summary style={{ cursor: "pointer", color: "var(--gold)", fontSize: "0.82rem", fontWeight: 600 }}>
                                            Read more
                                        </summary>
                                        <p style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--line-soft)" }}>{m.detail}</p>
                                    </details>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            <section className="story-video-section section-band">
                <div className="container-wide">
                    <ScrollReveal>
                        <div style={{ maxWidth: 680, margin: "0 auto 40px", textAlign: "center" }}>
                            <span className="chapter-mark">Watch</span>
                            <h2 style={{ marginTop: 16, fontFamily: "var(--font-dm-serif), Georgia, serif", fontSize: "clamp(1.8rem, 6vw, 2.8rem)", fontWeight: 400 }}>
                                Their Love Story
                            </h2>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div className="video-frame">
                            <YouTubeFrame title="How We Met Video" videoId="ImlBCIp6mSw" />
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
