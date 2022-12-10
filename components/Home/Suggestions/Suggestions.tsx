import React, { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  FieldValue,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { useUserData } from "../../../context/UserContext";
import { useRouter } from "next/router";

interface ISuggestionsProps {}

export const Suggestions: React.FC<ISuggestionsProps> = ({}) => {
  const [suggestions, setSuggestions] = useState<any>([]);
  const { user } = useAuth();
  const { userData, setUserData } = useUserData();
  const router = useRouter();

  async function getUsers() {
    const doc = query(
      collection(db, "users"),
      userData.following.length > 0
        ? where("uid", "not-in", [...userData.following, user.uid])
        : where("uid", "!=", user.uid),
      limit(5)
    );

    getDocs(doc).then((querySnapshot) => {
      let values: any = [];
      querySnapshot.forEach((doc) => {
        let data = {
          ...doc.data(),
          id: doc.id,
        };
        values.push(data);
      });
      setSuggestions(values);
    });
  }

  async function updateLoggedInUserFollowing(userToFolllowId: string) {
    await updateDoc(doc(db, "users", user.uid), {
      following: userData.following.includes(userToFolllowId)
        ? arrayRemove(userToFolllowId)
        : arrayUnion(userToFolllowId),
    });
  }

  async function updateFollowedUserFollowers(userFolllowedId: string) {
    await updateDoc(doc(db, "users", userFolllowedId), {
      followers: userData.following.includes(userFolllowedId)
        ? arrayRemove(user.uid)
        : arrayUnion(user.uid),
    });
  }

  const handleFollowUser = async (userId: string) => {
    await updateLoggedInUserFollowing(userId);

    await updateFollowedUserFollowers(userId);

    setUserData((prev: any) => ({
      ...prev,
      following: [...prev.following, userId],
    }));
  };

  useEffect(() => {
    getUsers();
  }, [userData]);

  return (
    <>
      {suggestions.length > 0 ? (
        <div className="mt-5 ml-10 w-full">
          <div className="flex justify-between text-sm mb-5">
            <div>
              <h3 className="text-sm font-medium text-gray-400">
                Suggestions for you
              </h3>
            </div>
            <div>
              <a
                onClick={() => router.push("/suggested-people")}
                className="text-xs text-blue-400 hover:text-blue-500 font-medium cursor-pointer"
              >
                See all
              </a>
            </div>
          </div>

          {suggestions.map((user: any) => (
            <div
              key={user.uid}
              className="flex items-center justify-between mt-3"
            >
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/image/Navbar/default_profile_pic.jpeg"
                }
                alt="Suggestions Profile Picture"
                className="rounded-full w-9 h-9"
              />
              <div className="flex-1 ml-4">
                <h2 className="font-semibold text-sm">{user.username}</h2>
                <h3 className="text-xs text-gray-400">{user.fullName}</h3>
              </div>
              <button
                onClick={() => handleFollowUser(user.uid)}
                className="text-xs text-blue-400 font-medium"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
