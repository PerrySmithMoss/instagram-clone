import React from "react";
import { Post } from "./Post";

const initPosts = [
  {
    id: 1,
    username: "perrymoss",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    postImage: "https://i.pravatar.cc/150?img=1",
    caption: "Yoyo this is an example post. Lorem Ipsum, bla bla bla...",
  },
  {
    id: 2,
    username: "perrymoss",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    postImage: "https://i.pravatar.cc/150?img=2",
    caption: "Yoyo this is an example post. Lorem Ipsum, bla bla bla...",
  },
  {
    id: 3,
    username: "perrymoss",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    postImage: "https://i.pravatar.cc/150?img=3",
    caption: "Yoyo this is an example post. Lorem Ipsum, bla bla bla...",
  },
];

interface IPostsProps {}

export const Posts: React.FC<IPostsProps> = ({}) => {
  return (
    <div>
      {initPosts.map((post: any) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
};
