import { getSuggestedUsers, toggleFollowing } from "../../../lib/social";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useUserData } from "../../../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { IUserData } from "../../../types/userData";

export const Suggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<IUserData[]>([]);
  const { user } = useAuth();
  const { userData, setUserData } = useUserData();
  const router = useRouter();

  const uid = user?.uid ?? "";
  const following = userData.following;

  useEffect(() => {
    let active = true;
    getSuggestedUsers(uid, following, 5)
      .then((users) => {
        if (active) setSuggestions(users);
      })
      .catch(() => {
        if (active) setSuggestions([]);
      });
    return () => {
      active = false;
    };
  }, [uid, following]);

  const handleFollowUser = async (userId: string) => {
    const isFollowing = following.includes(userId);
    await toggleFollowing(uid, userId, isFollowing);
    setUserData((previous) => ({
      ...previous,
      following: isFollowing
        ? previous.following.filter((id) => id !== userId)
        : [...new Set([...previous.following, userId])],
    }));
  };

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

          {suggestions.map((user) => (
            <div
              key={user.uid}
              className="flex items-center justify-between mt-3"
            >
              <Link href={`/user/${user.uid}`} className="contents">
                <Image
                  unoptimized
                  width={1024}
                  height={1024}
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "/assets/image/Navbar/default_profile_pic.jpeg"
                  }
                  alt="Suggestions Profile Picture"
                  className="rounded-full w-9 h-9 cursor-pointer"
                />
              </Link>
              <div className="flex-1 ml-4">
                <Link href={`/user/${user.uid}`} className="contents">
                  <h2 className="font-semibold text-sm cursor-pointer">
                    {user.username}
                  </h2>
                </Link>
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
