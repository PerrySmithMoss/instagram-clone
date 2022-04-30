import React, { useEffect, useState } from "react";
import faker from "faker";
interface ISuggestionsProps {}

export const Suggestions: React.FC<ISuggestionsProps> = ({}) => {
  const [suggestions, setSuggestions] = useState<any>([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-5 ml-10 w-full">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-medium text-gray-400">
          Suggestions for you
        </h3>
        <button className="text-gray-600 font-semibold text-xs">See All</button>
      </div>

      {suggestions.map((profile: any) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            src={`https://i.pravatar.cc/150?img=${profile.id}`}
            alt="Suggestions Profile Picture"
            className="rounded-full w-9 h-9"
          />
          <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{profile.username}</h2>
              <h3 className="text-xs text-gray-400">{profile.company.name}</h3>
          </div>
          <button className="text-xs text-blue-400 font-medium">Follow</button>
        </div>
      ))}
    </div>
  );
};
