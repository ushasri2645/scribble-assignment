import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();
const enablePollingMock = vi.fn();
const disablePollingMock = vi.fn();

type GameRoomState = {
  room: {
    code: string;
    status: "game";
    participants: Array<{ id: string; name: string; joinedAt: string }>;
    availableWords: string[];
    roles: Array<"drawer" | "guesser">;
    drawerParticipantId: string;
    canvasEvents: Array<unknown>;
    guessHistory: Array<unknown>;
    scores: Record<string, number>;
    secretWord?: string;
  };
  participantId: string;
};

const roomState: GameRoomState = {
  room: {
    code: "ABCD",
    status: "game",
    participants: [
      { id: "p1", name: "Alice", joinedAt: "2026-05-31T00:00:00.000Z" },
      { id: "p2", name: "Bob", joinedAt: "2026-05-31T00:00:01.000Z" }
    ],
    availableWords: [],
    roles: [],
    drawerParticipantId: "p1",
    canvasEvents: [],
    guessHistory: [],
    scores: { p1: 0, p2: 0 },
    secretWord: "rocket"
  },
  participantId: "p2"
};

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock
}));

vi.mock("../state/roomStore", () => ({
  useRoomState: () => roomState,
  useRoomStore: () => ({
    enablePolling: enablePollingMock,
    disablePolling: disablePollingMock
  })
}));

import { GamePage } from "./GamePage";

describe("GamePage", () => {
  beforeEach(() => {
    document.body.innerHTML = "<div id=\"root\"></div>";
    navigateMock.mockReset();
    enablePollingMock.mockReset();
    disablePollingMock.mockReset();
  });

  it("hides the secret word from guessers", async () => {
    roomState.participantId = "p2";
    roomState.room.drawerParticipantId = "p1";
    roomState.room.secretWord = "rocket";

    const container = document.getElementById("root") as HTMLElement;
    const root = createRoot(container);

    await act(async () => {
      root.render(<GamePage />);
    });

    expect(container.textContent).toContain("Alice");
    expect(container.textContent).toContain("Playing");
    expect(container.textContent).toContain("Hidden from guessers");
    expect(container.textContent).toContain("Submit Guess");
  });

  it("shows the secret word to the drawer", async () => {
    roomState.participantId = "p1";
    roomState.room.drawerParticipantId = "p1";
    roomState.room.secretWord = "rocket";

    const container = document.getElementById("root") as HTMLElement;
    const root = createRoot(container);

    await act(async () => {
    root.render(<GamePage />);
    });

    expect(container.textContent).toContain("rocket");
    expect(container.textContent).not.toContain("Submit Guess");
  });
});
