import { Card } from "./Card";

export function Scoreboard() {
  return (
    <Card title="Scoreboard">
      <p className="placeholder-note">Scoreboard placeholder</p>
      <div className="placeholder-block">
        <div className="placeholder-row">
          <span>Player one</span>
          <strong>0</strong>
        </div>
        <div className="placeholder-row">
          <span>Player two</span>
          <strong>0</strong>
        </div>
      </div>
    </Card>
  );
}
