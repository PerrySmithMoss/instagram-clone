import type { User } from "firebase/auth";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase";

// Signing in again must preserve the user's existing profile and social graph.
export async function ensureUserProfile(
  user: User,
  details?: { fullName: string; username: string },
) {
  const reference = doc(db, "users", user.uid);
  await runTransaction(db, async (transaction) => {
    const existing = await transaction.get(reference);
    if (existing.exists()) return;

    transaction.set(reference, {
      uid: user.uid,
      displayName: details?.username ?? user.displayName ?? "",
      email: user.email ?? "",
      profilePicture: user.photoURL ?? "",
      fullName: details?.fullName ?? user.displayName ?? "",
      username: details?.username ?? user.displayName ?? "",
      following: [],
      followers: [],
    });
  });
}
