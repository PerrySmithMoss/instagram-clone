import React, { useEffect, useState } from "react";
import faker from "faker";
import { Story } from "./Story";

interface IStoriesProps {}

export const Stories: React.FC<IStoriesProps> = ({}) => {
  const [suggestions, setSuggestions] = useState<any>([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    console.log("Suggestions: ", suggestions);
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-4 bg-white border border-gray-200 mt-5 overflow-x-scroll">
      {/* session && (
          <Story
          key={session.user.id}
          id={session.user.id}
          image={session.user.avatar}
          username={session.user.username}
        />
      ) */}
      {suggestions.map((profile: any) => (
        <Story
          key={profile.id}
          id={profile.id}
          image={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};