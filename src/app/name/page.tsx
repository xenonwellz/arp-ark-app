"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SCRIPTURE } from "@/lib/config";
import { Send, Sparkles, Star, User } from "lucide-react";

interface Suggestion {
    name: string;
    suggester: string;
    timestamp: number;
}

const STORAGE_KEY = "aroyalpriesthood-name-suggestions";

function useSuggestions() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setSuggestions(JSON.parse(stored));
        } catch {}
    }, []);

    const addSuggestion = useCallback((name: string, suggester: string) => {
        const entry: Suggestion = {
            name: name.trim(),
            suggester: suggester.trim() || "Anonymous",
            timestamp: Date.now()
        };
        setSuggestions(prev => {
            const next = [entry, ...prev];
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
            return next;
        });
    }, []);

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
        try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }, []);

    return { suggestions, addSuggestion, clearSuggestions };
}

export default function NamePage() {
    const { suggestions, addSuggestion, clearSuggestions } = useSuggestions();
    const [nameInput, setNameInput] = useState("");
    const [whoInput, setWhoInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nameInput.trim()) return;
        addSuggestion(nameInput, whoInput);
        setNameInput("");
        setWhoInput("");
    };

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
                            <span className="chapter-mark">The Prophetic Reveal</span>
                        </div>
                        <h1>Baby&apos;s Name</h1>
                        <p className="page-hero-sub">
                            A name is being prayerfully chosen. Suggest a name for the little prince below.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-band section-dark name-section">
                <ScrollReveal>
                    <div className="name-prompt-wrap">
                        <span className="chapter-mark"><Star size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />Suggest a Name</span>
                        <h2>What shall we call him?</h2>
                        <p>
                            Drop a name suggestion for the baby. Your suggestion will appear below for everyone to see.
                        </p>

                        <form className="suggest-form" onSubmit={handleSubmit}>
                            <div className="suggest-field">
                                <User size={16} />
                                <input
                                    className="suggest-input"
                                    type="text"
                                    placeholder="Your name (optional)"
                                    value={whoInput}
                                    onChange={e => setWhoInput(e.target.value)}
                                    maxLength={40}
                                    aria-label="Your name"
                                />
                            </div>
                            <div className="suggest-field">
                                <Sparkles size={16} />
                                <input
                                    className="suggest-input"
                                    type="text"
                                    placeholder="Enter a name..."
                                    value={nameInput}
                                    onChange={e => setNameInput(e.target.value)}
                                    maxLength={60}
                                    aria-label="Name suggestion"
                                />
                            </div>
                            <motion.button
                                className="gold-button suggest-submit"
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!nameInput.trim()}
                            >
                                <Send size={16} />
                                <span>Suggest</span>
                            </motion.button>
                        </form>
                    </div>
                </ScrollReveal>

                <AnimatePresence mode="popLayout">
                    {suggestions.length > 0 && (
                        <ScrollReveal>
                            <div className="suggestions-area">
                                <div className="suggestions-label">
                                    <span className="chapter-mark">Suggestions So Far</span>
                                </div>
                                <motion.div
                                    className="suggestions-grid"
                                    layout
                                >
                                    {suggestions.map((s) => (
                                        <motion.div
                                            key={`${s.name}-${s.timestamp}`}
                                            className="suggestion-tag"
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ type: "spring", damping: 16, stiffness: 200 }}
                                        >
                                            <span>
                                                {s.suggester !== "Anonymous" && (
                                                    <span className="suggestion-by">{s.suggester} suggests</span>
                                                )}{" "}
                                                <span className="suggestion-name">{s.name}</span>
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <button className="suggest-clear" onClick={clearSuggestions}>
                                    Clear all
                                </button>
                            </div>
                        </ScrollReveal>
                    )}
                </AnimatePresence>

                <ScrollReveal>
                    <div className="name-scripture">
                        <div className="name-scripture-divider" />
                        <span className="chapter-mark">The Promise</span>
                        <p style={{ marginTop: 16 }}>{SCRIPTURE.name}</p>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
}
