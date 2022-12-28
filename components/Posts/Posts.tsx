import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserContext";
import { db } from "../../firebase";
import { Post as IPost } from "../../types/post";
import { Post } from "./Post";

interface IPostsProps {}

export const Posts: React.FC<IPostsProps> = ({}) => {
  const { userData } = useUserData();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (userData.following.length > 0) {
      const unSub = onSnapshot(
        query(
          collection(db, "posts"),
          where("uid", "in", userData.following),
          orderBy("timestamp", "desc")
        ),
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
    }
  }, [userData, db]);

  return (
    <div>
      {posts.map((post: IPost) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
