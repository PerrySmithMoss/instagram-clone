import { getSuggestedUsers, toggleFollowing } from "../../lib/social";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserContext";
import { IUserData } from "../../types/userData";

export const SuggestedPeople: React.FC = () => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<IUserData[]>([]);
  const { userData, setUserData } = useUserData();

  const uid = user?.uid ?? "";
  const following = userData.following;

  useEffect(() => {
    let active = true;
    getSuggestedUsers(uid, following, 20)
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
    <section className="flex justify-center h-screen">
      <main className="flex flex-1 flex-col">
        <div className="w-full relative px-3 max-w-[600px] my-0 mx-auto grow shrink-0 flex flex-col items-stretch py-0 sm:py-[40px]">
          <div className="my-3 px-1">
            <h1 className="text-lg font-medium">Suggested</h1>
          </div>
          <div className="py-1 flex flex-col items-stretch content-center justify-start relative bg-white">
            <div className="h-auto overflow-auto">
              <div className="flex flex-col relative">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.uid}
                    className="py-2 px-3 flex flex-row justify-start items-center relative"
                  >
                    <Link href={`/user/${suggestion.uid}`} className="contents">
                      <Image
                        unoptimized
                        width={1024}
                        height={1024}
                        src={
                          suggestion?.profilePicture
                            ? suggestion?.profilePicture
                            : "/assets/image/Navbar/default_profile_pic.jpeg"
                        }
                        alt="Suggestions Profile Picture"
                        className="rounded-full w-10 h-10 cursor-pointer"
                      />
                    </Link>
                    <div className="flex-1 ml-4">
                      <Link
                        href={`/user/${suggestion.uid}`}
                        className="contents"
                      >
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
                      className="text-xs bg-blue-500 cursor-pointer font-bold text-white px-4 py-2 rounded-sm hover:bg-blue-600"
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
