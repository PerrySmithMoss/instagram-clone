import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IPost } from "../../types/post";

const mocks = vi.hoisted(() => ({
  getDocs: vi.fn(),
  update: vi.fn(),
  commit: vi.fn(),
  where: vi.fn(),
}));
vi.mock("../../firebase", () => ({ db: {} }));
vi.mock("firebase/firestore", () => ({
  collection: (_db: unknown, name: string) => name,
  doc: (_db: unknown, collection: string, uid: string) =>
    `${collection}/${uid}`,
  where: mocks.where,
  limit: (count: number) => ({ limit: count }),
  startAfter: (cursor: unknown) => ({ cursor }),
  query: (...constraints: unknown[]) => constraints,
  getDocs: mocks.getDocs,
  arrayRemove: (uid: string) => ({ remove: uid }),
  arrayUnion: (uid: string) => ({ add: uid }),
  writeBatch: () => ({ update: mocks.update, commit: mocks.commit }),
}));

import {
  getSuggestedUsers,
  groupFeedAuthors,
  mergeFeedPosts,
  toggleFollowing,
} from "../../lib/social";

describe("feed queries", () => {
  it("includes the viewer and followed users without duplicates", () => {
    expect(groupFeedAuthors("viewer", ["friend", "viewer", "friend"])).toEqual([
      ["viewer", "friend"],
    ]);
  });

  it("splits large follow lists into Firestore-supported queries", () => {
    const following = Array.from(
      { length: 75 },
      (_, index) => `friend-${index}`,
    );
    const groups = groupFeedAuthors("viewer", following);
    expect(groups.map((group) => group.length)).toEqual([30, 30, 16]);
    expect(groups.flat()).toEqual(["viewer", ...following]);
  });

  it("does not query for an anonymous viewer", () => {
    expect(groupFeedAuthors("", [])).toEqual([]);
  });

  it("merges query results in date order and removes duplicate posts", () => {
    const post = (id: string, milliseconds: number) =>
      ({ id, timestamp: { toMillis: () => milliseconds } }) as IPost;
    expect(
      mergeFeedPosts([
        [post("old", 1)],
        [post("new", 3), post("middle", 2), post("old", 1)],
      ]).map((post) => post.id),
    ).toEqual(["new", "middle", "old"]);
  });
});

describe("following", () => {
  beforeEach(() => mocks.commit.mockResolvedValue(undefined));

  it("updates both sides of the relationship atomically", async () => {
    await toggleFollowing("viewer", "friend", false);
    expect(mocks.update.mock.calls).toEqual([
      ["users/viewer", { following: { add: "friend" } }],
      ["users/friend", { followers: { add: "viewer" } }],
    ]);
    expect(mocks.commit).toHaveBeenCalledOnce();
  });

  it("removes both sides when unfollowing", async () => {
    await toggleFollowing("viewer", "friend", true);
    expect(mocks.update.mock.calls).toEqual([
      ["users/viewer", { following: { remove: "friend" } }],
      ["users/friend", { followers: { remove: "viewer" } }],
    ]);
  });

  it("does not write for missing identities or self-follow requests", async () => {
    await toggleFollowing("", "friend", false);
    await toggleFollowing("viewer", "viewer", false);
    expect(mocks.commit).not.toHaveBeenCalled();
  });
});

it("paginates suggestions without exceeding the not-in query limit", async () => {
  const followed = Array.from({ length: 50 }, (_, index) => `friend-${index}`);
  const snapshot = (uid: string) => ({ id: uid, data: () => ({ uid }) });
  mocks.getDocs
    .mockResolvedValueOnce({ size: 50, docs: followed.map(snapshot) })
    .mockResolvedValueOnce({
      size: 2,
      docs: [snapshot("candidate-1"), snapshot("candidate-2")],
    });
  const suggestions = await getSuggestedUsers("viewer", followed, 2);
  expect(suggestions.map((user) => user.uid)).toEqual([
    "candidate-1",
    "candidate-2",
  ]);
  expect(mocks.getDocs).toHaveBeenCalledTimes(2);
  expect(mocks.where).toHaveBeenCalledWith("uid", "!=", "viewer");
});
