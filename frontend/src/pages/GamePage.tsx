import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { GuessForm } from "../components/GuessForm";
import { PageHeader } from "../components/PageHeader";
import { ResultPanel } from "../components/ResultPanel";
import { Scoreboard } from "../components/Scoreboard";
import { useRoomState } from "../state/roomStore";

export function GamePage() {
  const navigate = useNavigate();
  const { room, participantId } = useRoomState();

  useEffect(() => {
    if (!room) {
      navigate("/", { replace: true });
    }
  }, [navigate, room]);

  if (!room) {
    return null;
  }

  const viewer = room.participants.find((participant) => participant.id === participantId) ?? null;

  return (
    <section className="panel placeholder-page">
      <PageHeader
        kicker={`Room ${room.code}`}
        title="Game Scaffold"
        description="This screen shows the placeholder canvas, guess input, scoreboard, and result areas."
      />

      <div className="summary-grid">
        <Card title="Canvas">
          <div className="canvas-placeholder">Drawing canvas placeholder</div>
          <p>The canvas region is intentionally non-interactive in this starter.</p>
        </Card>

        <Card title="Session">
          <dl className="detail-list">
            <div>
              <dt>Viewer</dt>
              <dd>{viewer?.name ?? "Unknown player"}</dd>
            </div>
            <div>
              <dt>Roles</dt>
              <dd>{room.roles.join(", ")}</dd>
            </div>
            <div>
              <dt>Words</dt>
              <dd>{room.availableWords.join(", ")}</dd>
            </div>
          </dl>
        </Card>

        <Scoreboard />
        <ResultPanel />
      </div>

      <div className="single-column-grid">
        <Card
          title="Guess Input"
          footer={
            <div className="button-row">
              <button className="button button--secondary" onClick={() => navigate("/lobby")}>
                Back to Lobby
              </button>
            </div>
          }
        >
          <p>This input is a placeholder and does not submit gameplay guesses.</p>
          <GuessForm />
        </Card>
      </div>
    </section>
  );
}
