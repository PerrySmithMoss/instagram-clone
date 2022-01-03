import React from "react";
import { MiniProfile } from "../Home/MiniProfile/MiniProfile";
import { Suggestions } from "../Home/Suggestions/Suggestions";
import { Posts } from "../Posts/Posts";
import { Stories } from "../Stories/Stories";

interface IFeedProps {}

export const Feed: React.FC<IFeedProps> = ({}) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      {/* Section left */}
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      {/* Section Right */}
      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};
