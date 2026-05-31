import { describe, expect, it } from "vitest";
import {
  createRoomSchema,
  joinRoomSchema,
  roomCodeParamsSchema,
  startRoomSchema
} from "./schemas.js";

describe("schemas", () => {
  it("createRoomSchema accepts a valid body with playerName", () => {
    const result = createRoomSchema.parse({ playerName: "Alice" });

    expect(result.playerName).toBe("Alice");
  });

  it("createRoomSchema rejects whitespace-only player names", () => {
    expect(() => createRoomSchema.parse({ playerName: "   " })).toThrow("Player name is required");
  });

  it("joinRoomSchema rejects missing player names", () => {
    expect(() => joinRoomSchema.parse({})).toThrow("Required");
  });

  it("roomCodeParamsSchema rejects missing code", () => {
    expect(() => roomCodeParamsSchema.parse({})).toThrow();
  });

  it("roomCodeParamsSchema rejects non-4-character codes", () => {
    expect(() => roomCodeParamsSchema.parse({ code: "ABC" })).toThrow("Room code must be 4 characters");
  });

  it("startRoomSchema accepts a participantId", () => {
    const result = startRoomSchema.parse({ participantId: "p1", secretWord: "rocket" });

    expect(result.participantId).toBe("p1");
    expect(result.secretWord).toBe("rocket");
  });

  it("startRoomSchema rejects empty participant ids", () => {
    expect(() => startRoomSchema.parse({ participantId: "   ", secretWord: "rocket" })).toThrow("Participant id is required");
  });

  it("startRoomSchema rejects words outside the starter list", () => {
    expect(() => startRoomSchema.parse({ participantId: "p1", secretWord: "banana" })).toThrow();
  });
});
