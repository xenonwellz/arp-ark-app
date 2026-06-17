import { Baby, Gift, HeartHandshake } from "lucide-react";
import { CONTACT, GIFTS } from "@/lib/config";

const icons = [Baby, Gift, HeartHandshake];

export function Treasury() {
  return (
    <section id="treasury" className="section-band treasury">
      <div className="section-heading reveal">
        <p className="eyebrow">The Royal Treasury</p>
        <h2>Gifts</h2>
        <p>
          For loved ones asking how to celebrate with the family, here are three thoughtful ways to
          sow into this new chapter.
        </p>
      </div>

      <div className="gift-grid">
        {GIFTS.map((gift, index) => {
          const Icon = icons[index];
          return (
            <article className="gift-card reveal" key={gift.title}>
              <Icon aria-hidden="true" />
              <h3>{gift.title}</h3>
              <p>{gift.description}</p>
              <a href={`mailto:${CONTACT.email}`} className="outline-button">
                {gift.action}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
