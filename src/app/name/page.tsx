"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SCRIPTURE } from "@/lib/config";
import { Send, Sparkles, Star, X } from "lucide-react";

interface Guess {
  id: string;
  name: string;
  timestamp: number;
  isOwn: boolean;
}

const EMPTY: Guess[] = [];

export default function NamePage() {
  const [guesses, setGuesses] = useState<Guess[]>(EMPTY);
  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ownGuess = guesses.find((g) => g.isOwn);
  const hasGuessed = !!ownGuess;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/guesses")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setGuesses(data.guesses ?? EMPTY);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const refetch = useCallback(async () => {
    try {
      const res = await fetch("/api/guesses");
      const data = await res.json();
      setGuesses(data.guesses ?? EMPTY);
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || hasGuessed) return;
    setError("");

    const res = await fetch("/api/guesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameInput.trim() }),
    });

    if (res.status === 409) {
      setError("You can only guess once!");
      return;
    }

    if (res.ok) {
      setNameInput("");
      await refetch();
    }
  };

  const handleRemove = async () => {
    if (!ownGuess) return;
    await fetch("/api/guesses", { method: "DELETE" });
    await refetch();
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
              <span className="chapter-mark">Can You Guess?</span>
            </div>
            <h1>Guess the Baby&apos;s Name</h1>
            <p className="page-hero-sub">
              The name has been chosen. Think you know what it is? Drop your guess below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-band section-dark name-section">
        <ScrollReveal>
          <div className="name-prompt-wrap">
            <span className="chapter-mark">
              <Star size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
              Guess the Name
            </span>
            <h2>What do you think he&apos;s called?</h2>
            <p>
              Guess the baby&apos;s name. Everyone&apos;s guesses appear below. One guess per person.
            </p>

            {hasGuessed ? (
              <div className="guess-status">
                <p>
                  You guessed: <strong>{ownGuess.name}</strong>
                </p>
                <button className="guess-remove" onClick={handleRemove}>
                  <X size={14} /> Remove my guess
                </button>
              </div>
            ) : (
              <form className="guess-form" onSubmit={handleSubmit}>
                <div className="guess-field">
                  <Sparkles size={16} />
                  <input
                    className="guess-input"
                    type="text"
                    placeholder="Enter your guess..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    maxLength={60}
                    aria-label="Name guess"
                  />
                </div>
                {error && <p className="guess-error">{error}</p>}
                <motion.button
                  className="gold-button guess-submit"
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!nameInput.trim()}
                >
                  <Send size={16} />
                  <span>Guess</span>
                </motion.button>
              </form>
            )}
          </div>
        </ScrollReveal>

        {!loading && (
          <AnimatePresence mode="popLayout">
            {guesses.length > 0 && (
              <ScrollReveal>
                <div className="guesses-area">
                  <div className="guesses-label">
                    <span className="chapter-mark">Guesses So Far</span>
                  </div>
                  <motion.div className="guesses-grid" layout>
                    {guesses.map((g) => (
                      <motion.div
                        key={g.id}
                        className={`guess-tag${g.isOwn ? " is-own" : ""}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 16, stiffness: 200 }}
                      >
                        <span>
                          <span className="guess-by">{g.isOwn ? "You guessed" : "Anonymous guessed"}</span>{" "}
                          <span className="guess-name">{g.name}</span>
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </ScrollReveal>
            )}
          </AnimatePresence>
        )}

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
