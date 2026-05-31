import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "../services/api";
import { RoomStore } from "./roomStore";

vi.mock("../services/api", () => ({
  api: {
    createRoom: vi.fn(),
    joinRoom: vi.fn(),
    fetchRoom: vi.fn()
  }
}));

const mockedApi = vi.mocked(api);

describe("RoomStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedApi.createRoom.mockReset();
    mockedApi.joinRoom.mockReset();
    mockedApi.fetchRoom.mockReset();
  });

  it("creates a room session and polls for room updates", async () => {
    mockedApi.createRoom.mockResolvedValue({
      participantId: "p1",
      room: {
        code: "ABCD",
        status: "lobby",
        participants: [{ id: "p1", name: "Alice", joinedAt: "2026-05-31T00:00:00.000Z" }],
        availableWords: ["rocket"],
        roles: ["drawer", "guesser"]
      }
    });
    mockedApi.fetchRoom.mockResolvedValue({
      room: {
        code: "ABCD",
        status: "lobby",
        participants: [{ id: "p1", name: "Alice", joinedAt: "2026-05-31T00:00:00.000Z" }],
        availableWords: ["rocket"],
        roles: ["drawer", "guesser"]
      }
    });

    const store = new RoomStore();
    await store.createRoom("Alice");
    store.enablePolling();

    expect(store.getSnapshot().participantId).toBe("p1");
    expect(store.getSnapshot().room?.participants[0]?.id).toBe("p1");

    await vi.advanceTimersByTimeAsync(2000);

    expect(mockedApi.fetchRoom).toHaveBeenCalledWith("ABCD", "p1");
  });

  it("joins an existing room and keeps the returned snapshot", async () => {
    mockedApi.joinRoom.mockResolvedValue({
      participantId: "p2",
      room: {
        code: "ABCD",
        status: "lobby",
        participants: [
          { id: "p1", name: "Alice", joinedAt: "2026-05-31T00:00:00.000Z" },
          { id: "p2", name: "Bob", joinedAt: "2026-05-31T00:00:01.000Z" }
        ],
        availableWords: ["rocket"],
        roles: ["drawer", "guesser"]
      }
    });

    const store = new RoomStore();
    await store.joinRoom("ABCD", "Bob");

    expect(store.getSnapshot().participantId).toBe("p2");
    expect(store.getSnapshot().room?.participants).toHaveLength(2);
  });

  it("starts the current room locally when the host requests it", async () => {
    mockedApi.createRoom.mockResolvedValue({
      participantId: "p1",
      room: {
        code: "ABCD",
        status: "lobby",
        participants: [
          { id: "p1", name: "Alice", joinedAt: "2026-05-31T00:00:00.000Z" },
          { id: "p2", name: "Bob", joinedAt: "2026-05-31T00:00:01.000Z" }
        ],
        availableWords: ["rocket"],
        roles: ["drawer", "guesser"]
      }
    });

    const store = new RoomStore();
    await store.createRoom("Alice");

    const started = await store.startRoom();

    expect(started?.status).toBe("game");
    expect(store.getSnapshot().room?.status).toBe("game");
  });
});
