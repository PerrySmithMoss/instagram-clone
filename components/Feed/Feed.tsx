import React from "react";
import { useAuth } from "../../context/AuthContext";
import { MiniProfile } from "../Home/MiniProfile/MiniProfile";
import { Suggestions } from "../Home/Suggestions/Suggestions";
import { Posts } from "../Posts/Posts";
import { Stories } from "../Stories/Stories";

interface IFeedProps {}

export const Feed: React.FC<IFeedProps> = ({}) => {
  const { user } = useAuth();

  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-[975px] lg:max-w-[975px] lg:grid-cols-7 mx-auto px-4 ${
        !user && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      {/* Section left */}
      <section className="col-span-4">
        <Stories />
        <Posts />
      </section>
      {/* Section Right */}
      {user ? (
        <section className="hidden lg:inline-grid md:col-span-3">
          <div className="fixed top-20 ">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      ) : null}
    </main>
  );
};
