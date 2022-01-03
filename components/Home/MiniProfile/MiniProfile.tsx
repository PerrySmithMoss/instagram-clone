import React from "react";

interface IMiniProfileProps {}

export const MiniProfile: React.FC<IMiniProfileProps> = ({}) => {
  return (
    <div className="flex items-center justify-between mt-8 ml-10">
      <div>
        <img
          className="rounded-full w-16 h-16"
          alt="Profile Picture"
          src="https://randomuser.me/api/portraits/women/68.jpg"
        />
      </div>
      <div className="flex-1 mx-4">
        <h2 className="font-medium">perrymoss</h2>
      </div>
      <div>
        <button className="text-blue-400 text-sm font-semibold">Switch</button>
      </div>
    </div>
  );
};
