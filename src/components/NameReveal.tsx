"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { BABY } from "@/lib/config";

export function NameReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="name" className="section-band name-section">
      <div className="name-card reveal">
        <p className="eyebrow">The Prophetic Reveal</p>
        <h2>Baby&apos;s Name</h2>
        <button className="gold-button" onClick={() => setRevealed(true)}>
          <Sparkles aria-hidden="true" />
          <span>Reveal the Prince&apos;s Name</span>
        </button>

        <div className={`name-reveal ${revealed ? "is-revealed" : ""}`} aria-live="polite">
          <div className="confetti" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="script-name">{BABY.name}</p>
          <p>
            Zion speaks of the dwelling place of God and a people set apart for His glory. Nathaniel
            means gift of God: a testimony that this son is received with reverence, joy, and
            prophetic gratitude. Together, his name declares belonging, favor, and kingdom purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
