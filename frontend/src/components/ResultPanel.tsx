import { Card } from "./Card";

export function ResultPanel() {
  return (
    <Card title="Results">
      <p className="placeholder-note">Result area placeholder</p>
      <div className="placeholder-block">
        <p>Winning word, final score, and guess history appear here in later phases.</p>
      </div>
    </Card>
  );
}
