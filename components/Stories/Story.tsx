import React from "react";

interface IStoryProps {
  id?: number;
  uid?: string;
  image: string;
  username: string;
}

export const Story: React.FC<IStoryProps> = ({ id, image, username, uid }) => {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-0.5  border-2 border-red-500 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        // className="p-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full"
        src={uid}
        alt="User story"
      />

      <p className="text-gray-700 text-xs truncate w-14 text-center">
        {username}
      </p>
    </div>
  );
};
