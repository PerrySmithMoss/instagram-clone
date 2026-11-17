import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
  writeBatch,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import type { IUserData } from "../types/userData";
import type { IPost } from "../types/post";

export function groupFeedAuthors(uid: string, following: string[]): string[][] {
  const authors = [...new Set([uid, ...following].filter(Boolean))];
  return Array.from({ length: Math.ceil(authors.length / 30) }, (_, index) =>
    authors.slice(index * 30, (index + 1) * 30),
  );
}

export function mergeFeedPosts(groups: IPost[][]): IPost[] {
  const posts = new Map(groups.flat().map((post) => [post.id, post]));
  return [...posts.values()].sort(
    (a, b) => (b.timestamp?.toMillis() ?? 0) - (a.timestamp?.toMillis() ?? 0),
  );
}

export async function getSuggestedUsers(
  uid: string,
  following: string[],
  count: number,
) {
  if (!uid) return [];
  const excluded = new Set([uid, ...following]);
  const users: IUserData[] = [];
  let cursor: QueryDocumentSnapshot | undefined;
  // Client-side filtering avoids Firestore's ten-value "not-in" limit.
  while (users.length < count) {
    const constraints = [where("uid", "!=", uid), limit(50)];
    const page = await getDocs(
      query(
        collection(db, "users"),
        ...constraints,
        ...(cursor ? [startAfter(cursor)] : []),
      ),
    );
    for (const snapshot of page.docs) {
      const data = { ...snapshot.data(), id: snapshot.id } as IUserData;
      if (!excluded.has(data.uid)) users.push(data);
    }
    if (page.size < 50) break;
    cursor = page.docs.at(-1);
  }
  return users.slice(0, count);
}

export async function toggleFollowing(
  uid: string,
  targetUid: string,
  isFollowing: boolean,
) {
  if (!uid || !targetUid || uid === targetUid) return;
  const change = isFollowing ? arrayRemove : arrayUnion;
  const batch = writeBatch(db);
  batch.update(doc(db, "users", uid), { following: change(targetUid) });
  batch.update(doc(db, "users", targetUid), { followers: change(uid) });
  await batch.commit();
}
