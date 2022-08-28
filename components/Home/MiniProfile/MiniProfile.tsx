import React from "react";
import { useAuth } from "../../../context/AuthContext";

interface IMiniProfileProps {}

export const MiniProfile: React.FC<IMiniProfileProps> = ({}) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between mt-8 ml-10 w-full">
      <div>
        <img
          className="rounded-full w-14 h-14"
          alt="Profile Picture"
          src={
            (user?.photoUrl as string)
              ? (user?.photoUrl as string)
              : "/assets/image/Navbar/default_profile_pic.jpeg"
          }
        />
      </div>
      <div className="flex-1 mx-2">
        <h2 className="font-medium">{user.username}</h2>
      </div>
      <div>
        <button className="text-blue-400 text-sm font-semibold">Switch</button>
      </div>
    </div>
  );
};
