import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();
const joinRoomMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock
}));

vi.mock("../state/roomStore", () => ({
  useRoomStore: () => ({
    joinRoom: joinRoomMock
  })
}));

import { JoinRoomPage } from "./JoinRoomPage";

describe("JoinRoomPage", () => {
  beforeEach(() => {
    document.body.innerHTML = "<div id=\"root\"></div>";
    navigateMock.mockReset();
    joinRoomMock.mockReset();
  });

  it("submits an uppercased room code when joining a room", async () => {
    joinRoomMock.mockResolvedValue({
      participantId: "p2",
      room: {
        code: "ABCD",
        status: "lobby",
        participants: [],
        availableWords: [],
        roles: []
      }
    });

    const container = document.getElementById("root") as HTMLElement;
    const root = createRoot(container);

    await act(async () => {
      root.render(<JoinRoomPage />);
    });

    const inputs = container.querySelectorAll("input");
    const playerNameInput = inputs[0] as HTMLInputElement;
    const roomCodeInput = inputs[1] as HTMLInputElement;
    const button = container.querySelector("button[type='submit']") as HTMLButtonElement;

    await act(async () => {
      playerNameInput.value = "Bob";
      playerNameInput.dispatchEvent(new Event("input", { bubbles: true }));
      roomCodeInput.value = "abcd";
      roomCodeInput.dispatchEvent(new Event("input", { bubbles: true }));
      button.click();
    });

    expect(joinRoomMock).toHaveBeenCalledWith("ABCD", "Bob");
    expect(navigateMock).toHaveBeenCalledWith("/lobby");
  });
});
