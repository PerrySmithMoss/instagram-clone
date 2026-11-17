import { groupFeedAuthors, mergeFeedPosts } from "../../lib/social";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { useUserData } from "../../context/UserContext";
import { db } from "../../firebase";
import { IPost } from "../../types/post";
import { Post } from "./Post";

export const Posts: React.FC = () => {
  const { userData } = useUserData();
  const authorsKey = JSON.stringify(
    groupFeedAuthors(userData.uid, userData.following),
  );
  const [feed, setFeed] = useState<{ key: string; posts: IPost[] }>({
    key: "",
    posts: [],
  });
  const posts = feed.key === authorsKey ? feed.posts : [];
  const loading = feed.key !== authorsKey;

  useEffect(() => {
    const authors = JSON.parse(authorsKey) as string[][];
    if (!authors.length) return;
    const groups = new Map<number, IPost[]>();
    const update = (index: number, posts: IPost[]) => {
      groups.set(index, posts);
      if (groups.size === authors.length) {
        setFeed({
          key: authorsKey,
          posts: mergeFeedPosts([...groups.values()]),
        });
      }
    };
    const subscriptions = authors.map((group, index) =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("uid", "in", group),
          orderBy("timestamp", "desc"),
        ),
        (snapshot) =>
          update(
            index,
            snapshot.docs.map(
              (post) => ({ ...post.data(), id: post.id }) as IPost,
            ),
          ),
        () => update(index, []),
      ),
    );
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, [authorsKey]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      {posts.map((post: IPost) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
