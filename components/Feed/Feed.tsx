import { useSession } from "next-auth/react";
import React from "react";
import { MiniProfile } from "../Home/MiniProfile/MiniProfile";
import { Suggestions } from "../Home/Suggestions/Suggestions";
import { Posts } from "../Posts/Posts";
import { Stories } from "../Stories/Stories";

interface IFeedProps {}

export const Feed: React.FC<IFeedProps> = ({}) => {
  const {data: session } = useSession()

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-[975px] lg:max-w-[975px] lg:grid-cols-7 mx-auto px-4 ${!session && "!grid-cols-1 !max-w-3xl"}`}>
      {/* Section left */}
      <section className="col-span-4">
        <Stories />
        <Posts />
      </section>
      {/* Section Right */}
      {session && (
      <section className="hidden lg:inline-grid md:col-span-3">
      <div className="fixed top-20 ">
        <MiniProfile />
        <Suggestions />
      </div>
    </section>
      )}
    </main>
  );
};
