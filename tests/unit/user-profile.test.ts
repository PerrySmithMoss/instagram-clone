import { beforeEach, describe, expect, it, vi } from "vitest";
import type { User } from "firebase/auth";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  set: vi.fn(),
  transaction: vi.fn(),
}));
vi.mock("../../firebase", () => ({ db: {} }));
vi.mock("firebase/firestore", () => ({
  doc: (_db: unknown, collection: string, uid: string) =>
    `${collection}/${uid}`,
  runTransaction: mocks.transaction,
}));

import { ensureUserProfile } from "../../lib/user-profile";

const user = {
  uid: "alice",
  displayName: "Alice",
  email: "alice@example.com",
  photoURL: null,
} as User;

describe("profile creation", () => {
  beforeEach(() => {
    mocks.transaction.mockImplementation((_db, callback) =>
      callback({ get: mocks.get, set: mocks.set }),
    );
  });

  it("does not overwrite an existing profile when a user signs in again", async () => {
    mocks.get.mockResolvedValue({ exists: () => true });
    await ensureUserProfile(user);
    expect(mocks.get).toHaveBeenCalledWith("users/alice");
    expect(mocks.set).not.toHaveBeenCalled();
  });

  it("creates a new profile without automatically following someone", async () => {
    mocks.get.mockResolvedValue({ exists: () => false });
    await ensureUserProfile(user, {
      fullName: "Alice Example",
      username: "alice",
    });
    expect(mocks.set).toHaveBeenCalledWith("users/alice", {
      uid: "alice",
      displayName: "alice",
      email: "alice@example.com",
      profilePicture: "",
      fullName: "Alice Example",
      username: "alice",
      following: [],
      followers: [],
    });
  });
});
