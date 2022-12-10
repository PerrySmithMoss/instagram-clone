import Link from "next/link";
import React from "react";
import { useAuth } from "../../../context/AuthContext";

interface IMiniProfileProps {}

export const MiniProfile: React.FC<IMiniProfileProps> = ({}) => {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between mt-5 ml-10 w-full">
      <div>
        <Link href={`/users/${user.uid}`}>
          <img
            className="rounded-full cursor-pointer w-14 h-14"
            alt="Profile Picture"
            src={
              (user?.photoUrl as string)
                ? (user?.photoUrl as string)
                : "/assets/image/Navbar/default_profile_pic.jpeg"
            }
          />
        </Link>
      </div>
      <Link href={`/users/${user.uid}`}>
        <div className="flex-1 mx-2 cursor-pointer">
          <h2 className="font-medium">{user.displayName}</h2>
        </div>
      </Link>

      {/* <div>
        <button className="text-blue-400 text-sm font-semibold">Switch</button>
      </div> */}
    </div>
  );
};
