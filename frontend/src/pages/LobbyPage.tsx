import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";
import { useRoomState, useRoomStore } from "../state/roomStore";

export function LobbyPage() {
  const navigate = useNavigate();
  const roomStore = useRoomStore();
  const { room, error, isLoading } = useRoomState();
  const [refreshError, setRefreshError] = useState<string | null>(null);

  useEffect(() => {
    if (!room) {
      navigate("/", { replace: true });
    }
  }, [navigate, room]);

  async function handleRefresh() {
    try {
      setRefreshError(null);
      await roomStore.fetchRoom();
    } catch (caughtError) {
      setRefreshError(caughtError instanceof Error ? caughtError.message : "Unable to refresh room");
    }
  }

  if (!room) {
    return null;
  }

  return (
    <section className="panel placeholder-page">
      <PageHeader
        kicker={`Room ${room.code}`}
        title="Lobby"
        description="This room is available for the scaffolded flow. Open the game screen to inspect the placeholder gameplay areas."
      />

      <div className="summary-grid">
        <Card title="Participants">
          {room.participants.length === 0 ? (
            <p>No participants are connected to this room yet.</p>
          ) : (
            <ul className="player-list">
              {room.participants.map((participant) => (
                <li key={participant.id}>
                  <span>{participant.name}</span>
                  <span className="player-list__meta">joined</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Status">
          <p className="status-line">{isLoading ? "Refreshing room state..." : "Room endpoint connected"}</p>
          <p>{error ?? refreshError ?? "Game behavior remains scaffolded in this starter."}</p>
        </Card>
      </div>

      <div className="button-row button-row--spread">
        <button className="button button--secondary" disabled={isLoading} onClick={handleRefresh}>
          {isLoading ? "Refreshing..." : "Refresh Room"}
        </button>
        <button className="button button--primary" onClick={() => navigate("/game")}>
          Open Game Scaffold
        </button>
      </div>
    </section>
  );
}
