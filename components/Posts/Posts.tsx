import React from "react";
import { Post } from "./Post";

const initPosts = [
  {
    id: 1,
    username: "perrymoss",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    postImage: "https://api.time.com/wp-content/uploads/2019/08/better-smartphone-photos.jpg",
    caption: "Yoyo this is an example post. Lorem Ipsum, bla bla bla...",
  },
  {
    id: 2,
    username: "perrymoss",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    postImage: "https://cdn.pocket-lint.com/r/s/1200x/assets/images/151442-cameras-feature-stunning-photos-from-the-national-sony-world-photography-awards-2020-image1-evuxphd3mr.jpg",
    caption: "Yoyo this is an example post. Lorem Ipsum, bla bla bla...",
  },
  {
    id: 3,
    username: "perrymoss",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    postImage: "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
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
