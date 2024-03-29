import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useUserData } from "../../context/UserContext";
import { db } from "../../firebase";
import { IPost } from "../../types/post";
import { Post } from "./Post";

interface IPostsProps {}

export const Posts: React.FC<IPostsProps> = ({}) => {
  const { userData } = useUserData();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (userData.following.length > 0) {
      const unSub = onSnapshot(
        query(
          collection(db, "posts"),
          where("uid", "in", userData.following),
          where("uid", "==", userData.uid),
          orderBy("timestamp", "desc")
        ),
        (querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => {
            const data: any = {
              ...doc.data(),
              id: doc.id,
            };
            return {
              id: data.id,
              caption: data.caption,
              image: data.image,
              location: data.location,
              timestamp: data.timestamp,
              uid: data.uid,
              userAvatar: data.userAvatar,
              username: data.username,
            };
          });
          setPosts(documents);
          setLoading(false);
        }
      );

      return () => unSub();
    } else {
      const unSub = onSnapshot(
        query(
          collection(db, "posts"),
          where("uid", "==", userData.uid),
          orderBy("timestamp", "desc")
        ),
        (querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => {
            const data: any = {
              ...doc.data(),
              id: doc.id,
            };
            return {
              id: data.id,
              caption: data.caption,
              image: data.image,
              location: data.location,
              timestamp: data.timestamp,
              uid: data.uid,
              userAvatar: data.userAvatar,
              username: data.username,
            };
          });
          setPosts(documents);
          setLoading(false);
        }
      );

      return () => unSub();
    }
  }, [userData, db]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="blue"
          secondaryColor="white"
        />
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
