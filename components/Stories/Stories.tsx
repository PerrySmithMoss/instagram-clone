import { useState } from "react";
import { fakerEN as faker } from "@faker-js/faker";
import { Story } from "./Story";

export const Stories = () => {
  const [suggestions] = useState(() =>
    Array.from({ length: 20 }, (_, id) => ({
      id,
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
    })),
  );

  return (
    <div className="flex space-x-2 p-4 rounded-lg bg-white border border-gray-200 mt-5 overflow-x-auto">
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          image={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};
