import React from "react";
import { Posts } from "../Posts/Posts";
import { Stories } from "../Stories/Stories";

interface IFeedProps {}

export const Feed: React.FC<IFeedProps> = ({}) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-6xl mx-auto">
      {/* Section left */}
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      {/* Section Right */}
      <section>
        {/* Mini profile */}
        {/* User Suggestions */}
      </section>
    </main>
  );
};
