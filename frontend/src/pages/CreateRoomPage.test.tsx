import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();
const createRoomMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock
}));

vi.mock("../state/roomStore", () => ({
  useRoomStore: () => ({
    createRoom: createRoomMock
  })
}));

import { CreateRoomPage } from "./CreateRoomPage";

describe("CreateRoomPage", () => {
  beforeEach(() => {
    document.body.innerHTML = "<div id=\"root\"></div>";
    navigateMock.mockReset();
    createRoomMock.mockReset();
  });

  it("creates a room from the submitted player name", async () => {
    createRoomMock.mockResolvedValue({
      participantId: "p1",
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
      root.render(<CreateRoomPage />);
    });

    const input = container.querySelector("input") as HTMLInputElement;
    const button = container.querySelector("button[type='submit']") as HTMLButtonElement;

    await act(async () => {
      input.value = "Alice";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      button.click();
    });

    expect(createRoomMock).toHaveBeenCalledWith("Alice");
    expect(navigateMock).toHaveBeenCalledWith("/lobby");
  });
});
