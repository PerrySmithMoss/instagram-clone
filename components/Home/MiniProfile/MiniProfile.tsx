import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useUserData } from "../../../context/UserContext";

export const MiniProfile: React.FC = () => {
  const { user } = useAuth();
  const { userData } = useUserData();

  return (
    <div className="flex items-center justify-between mt-5 ml-10 w-full">
      <div>
        <Link href={`/user/${user?.uid}`} className="contents">
          <Image
            unoptimized
            width={1024}
            height={1024}
            className="rounded-full cursor-pointer w-12 h-12"
            alt="Profile Picture"
            src={
              user?.photoURL
                ? user?.photoURL
                : userData?.profilePicture
                  ? userData?.profilePicture
                  : "/assets/image/Navbar/default_profile_pic.jpeg"
            }
          />
        </Link>
      </div>
      <Link href={`/user/${user?.uid}`} className="contents">
        <div className="flex-1 mx-2 cursor-pointer">
          <h2 className="font-medium">{user?.displayName}</h2>
        </div>
      </Link>
    </div>
  );
};
