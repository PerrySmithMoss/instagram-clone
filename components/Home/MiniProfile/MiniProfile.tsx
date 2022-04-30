import { useSession } from "next-auth/react";
import React from "react";

interface IMiniProfileProps {}

export const MiniProfile: React.FC<IMiniProfileProps> = ({}) => {
  const {data: session } = useSession()
  return (
    <div className="flex items-center justify-between mt-8 ml-10 w-full">
      <div>
        <img
          className="rounded-full w-14 h-14"
          alt="Profile Picture"
          src={session?.user?.image}
        />
      </div>
      <div className="flex-1 mx-4">
        <h2 className="font-medium">{session?.user.username}</h2>
      </div>
      <div>
        <button className="text-blue-400 text-sm font-semibold">Switch</button>
      </div>
    </div>
  );
};
