import React, { useEffect, useState } from "react";
import faker from "faker";
import { Story } from "./Story";
import { useSession } from "next-auth/react";

interface IStoriesProps {}

export const Stories: React.FC<IStoriesProps> = ({}) => {
  const [suggestions, setSuggestions] = useState<any>([]);
  const { data: session } = useSession();
  console.log(session)

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-4 bg-white border border-gray-200 mt-5 overflow-x-scroll">
      {session && (
        <Story
          key={session.user.uid}
          uid={session.user.uid as string}
          image={session.user.image as string}
          username={session.user.username as string}
        />
      )}
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
