import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock
}));

vi.mock("../state/roomStore", () => ({
  useRoomState: () => ({
    room: {
      code: "ABCD",
      status: "game",
      participants: [
        { id: "p1", name: "Alice", joinedAt: "2026-05-31T00:00:00.000Z" },
        { id: "p2", name: "Bob", joinedAt: "2026-05-31T00:00:01.000Z" }
      ],
      availableWords: [],
      roles: []
    },
    participantId: "p2"
  })
}));

import { GamePage } from "./GamePage";

describe("GamePage", () => {
  beforeEach(() => {
    document.body.innerHTML = "<div id=\"root\"></div>";
    navigateMock.mockReset();
  });

  it("renders the host and current game status", async () => {
    const container = document.getElementById("root") as HTMLElement;
    const root = createRoot(container);

    await act(async () => {
      root.render(<GamePage />);
    });

    expect(container.textContent).toContain("Alice");
    expect(container.textContent).toContain("Playing");
    expect(container.textContent).toContain("Host");
  });
});
