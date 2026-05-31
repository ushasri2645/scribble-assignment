import { beforeEach, describe, expect, it } from "vitest";
import { createRoom, getRoom, joinRoom, resetRooms, toRoomSnapshot } from "./roomStore.js";

describe("roomStore", () => {
  beforeEach(() => {
    resetRooms();
  });

  it("createRoom returns a host participant as the first room member", () => {
    const result = createRoom("Alice");

    expect(result.room.participants).toHaveLength(1);
    expect(result.room.participants[0]).toMatchObject({
      id: result.participantId,
      name: "Alice"
    });
    expect(result.room.status).toBe("lobby");
  });

  it("joinRoom keeps room membership isolated between rooms", () => {
    const firstRoom = createRoom("Alice");
    const secondRoom = createRoom("Bob");

    const joinedFirst = joinRoom(firstRoom.room.code, "Charlie");

    expect(joinedFirst).not.toBeNull();
    expect(joinedFirst?.room.participants).toHaveLength(2);
    expect(getRoom(secondRoom.room.code)?.participants).toHaveLength(1);
  });

  it("toRoomSnapshot includes the shared room state", () => {
    const created = createRoom("Alice");
    const snapshot = toRoomSnapshot(created.room, created.participantId);

    expect(snapshot.availableWords).toEqual(expect.arrayContaining(["rocket", "pizza"]));
    expect(snapshot.roles).toEqual(["drawer", "guesser"]);
  });

});
