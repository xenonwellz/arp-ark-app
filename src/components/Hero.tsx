import Image from "next/image";
import { YouTubeFrame } from "./YouTubeFrame";

export function Hero() {
  return (
    <section id="home" className="hero section-band">
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/royal-priesthood-preview.png"
          alt=""
          priority
          fill
          sizes="(max-width: 760px) 100vw, 48vw"
        />
      </div>

      <div className="hero-content reveal">
        <p className="eyebrow">The Royal Registry</p>
        <h1>A Royal Priesthood. A Chosen Generation. Our Prince is Here.</h1>
        <p className="hero-copy">
          With hearts full of wonder and thanksgiving, we welcome the son God has entrusted to us: a
          sign of covenant joy, answered prayers, and generational promise.
        </p>
      </div>

      <div className="hero-video reveal">
        <YouTubeFrame title="Gender Reveal Video" videoId="Lw7lLZIszRQ" />
      </div>
    </section>
  );
}
