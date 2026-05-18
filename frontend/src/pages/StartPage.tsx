import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";

const starterWords = ["rocket", "pizza", "castle", "guitar", "sunflower"];

const starterSummary = [
  { label: "Frontend screens", value: "5" },
  { label: "REST endpoints", value: "3" },
  { label: "Seed words", value: String(starterWords.length) },
  { label: "Next learner phases", value: "4" }
] as const;

export function StartPage() {
  return (
    <section className="panel hero">
      <div className="start-hero">
        <div className="start-hero__content">
          <PageHeader
            kicker="Clean clone ready"
            title="Room flow starter for the drawing game lab"
            description="Use this scaffold to create or join a room, inspect the lobby state, and hand the project to learners for the required gameplay phases."
          />

          <div className="button-row button-row--hero">
            <Link className="button button--primary" to="/create-room">
              Create Room
            </Link>
            <Link className="button button--secondary" to="/join-room">
              Join Room
            </Link>
          </div>

          <div className="start-hero__meta">
            <div className="start-hero__meta-item">
              <strong>Current scope</strong>
              <span>Room creation, join flow, lobby snapshot, and game placeholders</span>
            </div>
            <div className="start-hero__meta-item">
              <strong>Future work</strong>
              <span>Host controls, gameplay rules, scoring, and restart flow</span>
            </div>
          </div>
        </div>

        <aside className="start-summary">
          <span className="start-summary__label">Starter snapshot</span>
          {starterSummary.map((item) => (
            <div className="start-summary__row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </aside>
      </div>

      <div className="hero__grid">
        <Card title="Starter words" badge="01">
          <ul className="pill-list">
            {starterWords.map((word) => (
              <li className="pill" key={word}>
                {word}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Flow" badge="02">
          <p>Start, create or join, lobby review, and game scaffold inspection.</p>
        </Card>

        <Card title="Roles" badge="03">
          <p>Starter data includes drawer and guesser labels for later gameplay implementation.</p>
        </Card>
      </div>
    </section>
  );
}
