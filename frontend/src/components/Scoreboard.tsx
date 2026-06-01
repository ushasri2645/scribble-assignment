import { Card } from "./Card";

export function Scoreboard() {
  return (
    <Card title="Scoreboard">
      <div className="placeholder-block" style={{ backgroundColor: '#f9fafb' }}>
        <div className="placeholder-row">
          <span>Waiting for players...</span>
          <strong>0</strong>
        </div>
      </div>
    </Card>
  );
}
