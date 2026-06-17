import { MILESTONES } from "@/lib/config";
import { YouTubeFrame } from "./YouTubeFrame";

export function Testimony() {
  return (
    <section id="testimony" className="section-band testimony">
      <div className="section-heading reveal">
        <p className="eyebrow">Our Testimony</p>
        <h2>The Power Couple Story</h2>
        <p>
          Before the announcement, there was a journey marked by obedience, courage, prayer, and
          sovereign timing.
        </p>
      </div>

      <div className="timeline">
        {MILESTONES.map((milestone, index) => (
          <article className="milestone reveal" key={milestone.title}>
            <span className="milestone-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{milestone.title}</h3>
              <p>{milestone.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="testimony-video reveal">
        <YouTubeFrame title="How We Met Video" videoId="ImlBCIp6mSw" />
      </div>
    </section>
  );
}
