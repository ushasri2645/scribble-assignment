import { beforeEach, describe, expect, it } from "vitest";
import {
  createRoom,
  getRoom,
  joinRoom,
  resetRooms,
  startRoom,
  toRoomSnapshot
} from "./roomStore.js";

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
    expect(snapshot.drawerParticipantId).toBeNull();
  });

  it("startRoom assigns the host as the drawer and stores a secret word", () => {
    const created = createRoom("Alice");
    joinRoom(created.room.code, "Bob");

    const started = startRoom(created.room.code, created.participantId, "pizza");

    expect(started?.status).toBe("game");
    expect(started?.round).toMatchObject({
      drawerParticipantId: created.participantId,
      secretWord: "pizza"
    });
  });

  it("toRoomSnapshot only reveals the secret word to the drawer", () => {
    const created = createRoom("Alice");
    const joined = joinRoom(created.room.code, "Bob");

    const started = startRoom(created.room.code, created.participantId, "rocket");

    expect(started).not.toBeNull();

    const drawerSnapshot = toRoomSnapshot(started as NonNullable<typeof started>, created.participantId);
    const guesserSnapshot = toRoomSnapshot(started as NonNullable<typeof started>, joined?.participantId);

    expect(drawerSnapshot.drawerParticipantId).toBe(created.participantId);
    expect(drawerSnapshot.secretWord).toBe("rocket");
    expect(guesserSnapshot.drawerParticipantId).toBe(created.participantId);
    expect(guesserSnapshot.secretWord).toBeUndefined();
  });

});
