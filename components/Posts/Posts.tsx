import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Post as IPost } from "../../types/post";
import { Post } from "./Post";

interface IPostsProps {}

export const Posts: React.FC<IPostsProps> = ({}) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc: any) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setPosts(documents);
      }
    );

    return () => unSub();
  }, [db]);

  return (
    <div>
      {posts.map((post: IPost) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
