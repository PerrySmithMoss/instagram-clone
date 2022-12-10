import {
  query,
  collection,
  where,
  limit,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserContext";
import { db } from "../../firebase";

interface ISuggestedPeopleProps {}

export const SuggestedPeople: React.FC<ISuggestedPeopleProps> = ({}) => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<any>([]);
  const { userData, setUserData } = useUserData();

  async function getUsers() {
    const doc = query(
      collection(db, "users"),
      userData.following.length > 0
        ? where("uid", "not-in", [...userData.following, user.uid])
        : where("uid", "!=", user.uid),
      limit(20)
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
    <section className="flex justify-center h-screen">
      <main className="flex flex-1 flex-col">
        <div className="w-full relative px-3 max-w-[600px] my-0 mx-auto flex-grow flex-shrink-0 flex flex-col items-stretch py-0 sm:py-[40px]">
          <div className="my-3 px-1">
            <h1 className="text-lg font-medium">Suggested</h1>
          </div>
          <div className="py-1 flex flex-col items-stretch content-center justify-start relative bg-white">
            <div className="h-auto overflow-auto">
              <div className="flex flex-col relative">
                {suggestions.map((suggestion: any) => (
                  <div
                    key={suggestion.uid}
                    className="py-2 px-3 flex flex-row justify-start items-center relative"
                  >
                    <Link href={`/user/${suggestion.uid}`}>
                      <img
                        src={
                          user.profilePicture
                            ? user.profilePicture
                            : "/assets/image/Navbar/default_profile_pic.jpeg"
                        }
                        alt="Suggestions Profile Picture"
                        className="rounded-full w-10 h-10 cursor-pointer"
                      />
                    </Link>
                    <div className="flex-1 ml-4">
                      <Link href={`/user/${suggestion.uid}`}>
                        <h2 className="font-semibold cursor-pointer text-sm">
                          {suggestion.username}
                        </h2>
                      </Link>
                      <h3 className="text-xs text-gray-400">
                        {suggestion.fullName}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleFollowUser(suggestion.uid)}
                      className="text-xs bg-blue-500 cursor-pointer font-bold text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
