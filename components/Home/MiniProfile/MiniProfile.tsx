import Link from "next/link";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useUserData } from "../../../context/UserContext";

interface IMiniProfileProps {}

export const MiniProfile: React.FC<IMiniProfileProps> = ({}) => {
  const { user } = useAuth();
  const { userData } = useUserData();

  return (
    <div className="flex items-center justify-between mt-5 ml-10 w-full">
      <div>
        <Link href={`/user/${user.uid}`}>
          <img
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
      <Link href={`/user/${user.uid}`}>
        <div className="flex-1 mx-2 cursor-pointer">
          <h2 className="font-medium">{user.displayName}</h2>
        </div>
      </Link>
    </div>
  );
};
