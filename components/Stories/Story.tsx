import Image from "next/image";
import React from "react";

interface IStoryProps {
  image: string;
  username: string;
}

export const Story: React.FC<IStoryProps> = ({ image, username }) => {
  return (
    <div>
      <Image
        unoptimized
        width={1024}
        height={1024}
        className="h-14 w-14 rounded-full p-0.5  border-2 border-red-500 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        src={image}
        alt="User story"
      />

      <p className="text-gray-700 text-xs truncate w-14 text-center">
        {username}
      </p>
    </div>
  );
};
