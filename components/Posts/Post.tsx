import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { Post as IPost } from "../../types/post";
import { ViewPostModal } from "../Modal/ViewPost/ViewPostModal";
import styles from "./Posts.module.css";
interface IPostProps {
  post: IPost;
}

export const Post: React.FC<IPostProps> = ({ post }) => {
  const { user } = useAuth();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([]);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleViewAllComments = () => {
    setIsPostModalOpen(true);
  };

  const handleCommentInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (comment.length > 0) {
        postComment();
      }
    }
  };

  const postComment = async () => {
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", post.id, "comments"), {
      comment: commentToSend,
      uid: user.uid,
      username: user.username,
      userAvatar: user.photoUrl,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    const unSub = onSnapshot(
      query(
        collection(db, "posts", post.id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setComments(documents);
      }
    );

    return () => unSub();
  }, [db]);

  return (
    <div className="bg-white my-7 border rounded-lg">
      <article>
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center">
            <div>
              <img
                className="rounded-full h-10 w-10 object-contain border mr-3"
                src={
                  (post.userAvatar as string)
                    ? (post.userAvatar as string)
                    : "/assets/image/Navbar/default_profile_pic.jpeg"
                }
                alt=""
              />
            </div>
            <div>
              <p className="font-medium text-sm">{post.username}</p>
              <p className="text-xs">{post.location}</p>
            </div>
          </div>
          <div className="mr-2">
            <svg
              aria-label="More options"
              className="_8-yf5 "
              fill="#262626"
              height="16"
              viewBox="0 0 48 48"
              width="16"
            >
              <circle
                clipRule="evenodd"
                cx="8"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="24"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="40"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
            </svg>
          </div>
        </div>
        {/* Post Image */}
        <img className="object-cover w-full" src={post.image} alt="" />
        {/* Buttons */}
        <div className="card-footer">
          <div className="top px-4 pt-4">
            <div className="icons flex flex-row justify-between items-center">
              <div className="left flex flex-row">
                <div className="like mr-4">
                  <svg
                    aria-label="Like"
                    className="_8-yf5 "
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                  </svg>
                </div>
                <div className="comment mr-4">
                  <svg
                    aria-label="Comment"
                    className="_8-yf5 "
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="share">
                  <svg
                    aria-label="Share Post"
                    className="_8-yf5 "
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                  </svg>
                </div>
              </div>
              <div className="right">
                <div className="save">
                  <svg
                    aria-label="Save"
                    className="_8-yf5 "
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="likes mt-2">
              <span className="font-bold text-sm">122,780 likes</span>
            </div>
            <div className="text-sm mt-2">
              <p>
                <b>{post.username}</b>
                <span className="m-0 inline">&nbsp;</span>
                {post.caption}
              </p>
            </div>
            {comments.length > 2 ? (
              <div className="mt-1">
                <span
                  onClick={handleViewAllComments}
                  className="text-sm text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  View all {comments.length} comments
                </span>
                {comments
                  .slice(0, 2)
                  .reverse()
                  .map((comment: any) => (
                    <div
                      key={comment.id}
                      className="flex justify-between items-center space-x-1 mt-0.5"
                    >
                      <div>
                        <p>
                          <span className="text-sm font-bold">
                            {comment.username}
                          </span>
                          <span className="m-0 inline">&nbsp;</span>
                          <span className="text-sm">{comment.comment}</span>
                        </p>
                      </div>
                      <div className={styles.likeButtonContainer}>
                        <svg
                          aria-label="Like"
                          color="#262626"
                          fill="#262626"
                          height="12"
                          role="img"
                          viewBox="0 0 24 24"
                          width="12"
                        >
                          <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                        </svg>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="mt-">
                {comments
                  .slice(0, 2)
                  .reverse()
                  .map((comment: any) => (
                    <div
                      key={comment.id}
                      className="flex justify-between items-center space-x-1"
                    >
                      <div>
                        <p>
                          <span className="text-sm font-bold">
                            {comment.username}
                          </span>
                          <span className="m-0 inline">&nbsp;</span>
                          <span className="text-sm">{comment.comment}</span>
                        </p>
                      </div>
                      <div className={styles.likeButtonContainer}>
                        <svg
                          aria-label="Like"
                          color="#262626"
                          fill="#262626"
                          height="12"
                          role="img"
                          viewBox="0 0 24 24"
                          width="12"
                        >
                          <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                        </svg>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <div className="post-date mt-1">
              <span className="text-[11px] text-gray-500 uppercase">
                12 hours ago
              </span>
            </div>
          </div>
          <div className="bottom border-t pt-1 mt-3 px-4 pb-2">
            <div className="flex items-center ">
              <div className="cursor-pointer">
                <svg
                  viewBox="0 0 20 20"
                  className="w-6 h-6 text-gray-500 opacity-80"
                >
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
                </svg>
              </div>
              <input
                type="text"
                value={comment}
                onKeyDown={handleCommentInputKeyDown}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
                className="text-sm h-10 ml-4 w-full outline-none focus:outline-none"
                placeholder="Add a comment..."
              />
              <button
                onClick={postComment}
                disabled={!comment.trim()}
                className="text-blue-500 opacity-75 text-sm text-right font-bold disabled:opacity-40"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </article>
      {isPostModalOpen && (
        <ViewPostModal
          open={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          selector="viewPostModal"
        >
          <article className={styles.createPostModalContentInner}>
            {/* {selectedFile ? ( */}
            <div className="grid grid-cols-2 max-w-4xl h-full">
              <div className="h-full w-full object-cover overflow-hidden">
                <img
                  src={post.image}
                  className="overflow-hidden object-cover rounded-bl rounded-tl  h-full w-full"
                  alt="Selected File Image"
                />
              </div>
              <div className="mt-2 overflow-y-scroll flex-1 min-h-0 relative min-w-0 justify-start flex flex-col items-stretch">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex content-center items-center mx-3">
                    <div>
                      <img
                        className="rounded-full w-[42px] h-[42px]"
                        alt="User's avatar"
                        src={
                          (post?.userAvatar as string)
                            ? (post?.userAvatar as string)
                            : "/assets/image/Navbar/default_profile_pic.jpeg"
                        }
                      />
                    </div>
                    <div className="flex-1 ml-2">
                      <h2 className="font-medium text-sm">{post.username}</h2>
                    </div>
                  </div>
                  <div className="mr-3">
                    <svg
                      aria-label="More options"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="6" cy="12" r="1.5"></circle>
                      <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                  </div>
                </div>

                <div className="p-0 flex-grow flex flex-col min-w-[335px] relative w-full">
                  <section className="flex flex-row px-3 m-0 order-3 py-[6px]">
                    <span className="inline-block ">
                      <button className="items-center bg-transparent border-none cursor-pointer flex justify-center p-2">
                        <div className="flex justify-center items-center">
                          <span className={styles.iconContainer}>
                            <svg
                              aria-label="Like"
                              className="_ab6-"
                              color="#262626"
                              fill="#262626"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                            </svg>
                          </span>
                        </div>
                      </button>
                    </span>
                    <span className="inline-block ">
                      <button className="items-center bg-transparent border-none cursor-pointer flex justify-center p-2">
                        <div className="flex justify-center items-center">
                          <span className={styles.iconContainer}>
                            <svg
                              aria-label="Comment"
                              className="relative block"
                              color="#262626"
                              fill="#262626"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path
                                d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </button>
                    </span>
                    <span className="inline-block ">
                      <button className="items-center bg-transparent border-none cursor-pointer flex justify-center p-2">
                        <div className="flex justify-center items-center">
                          <span className={styles.iconContainer}>
                            <svg
                              aria-label="Share Post"
                              className="relative block"
                              color="#262626"
                              fill="#262626"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <line
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                                x1="22"
                                x2="9.218"
                                y1="3"
                                y2="10.083"
                              ></line>
                              <polygon
                                fill="none"
                                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </span>
                        </div>
                      </button>
                    </span>
                    <span className="border-0 inline-block m-0 ml-auto p-0">
                      <button className="items-center bg-transparent border-none cursor-pointer flex justify-center p-2">
                        <div className="flex justify-center items-center">
                          <span className={styles.iconContainer}>
                            <svg
                              aria-label="Save"
                              className="block"
                              color="#262626"
                              fill="#262626"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              ></polygon>
                            </svg>
                          </span>
                        </div>
                      </button>
                    </span>
                  </section>
                  <section className="block order-4 mb-1 px-4">
                    <div className="flex items-center space-x-1">
                      <div>
                        <img
                          className="rounded-full w-8 h-8"
                          alt="User's avatar"
                          src={
                            (post?.userAvatar as string)
                              ? (post?.userAvatar as string)
                              : "/assets/image/Navbar/default_profile_pic.jpeg"
                          }
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">
                          Liked by <b className="text-black">{user.username}</b>{" "}
                          and <b className="text-black">1,034 others</b>
                        </p>
                      </div>
                    </div>
                  </section>
                  <div className="border-b order-1 overflow-x-hidden w-full flex flex-col flex-grow flex-shrink min-h-0 overflow-auto relative px-4">
                    <ul
                      className={` border-0 flex-grow left-0 m-0 overflow-y-scroll pt-4 px-3 absolute list-none w-full`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        className="flex flex-col items-stretch flex-shrink-0 m-0 p-0 relative"
                      >
                        <li
                          role="menuitem"
                          className="pt-1 pr-4 pb-4 w-auto overflow-visible relative -mr-[2px] -mt-[5px]"
                        >
                          <div
                            className=" items-start border-0 flex flex-row flex-shrink-0 justify-between
                           m-0 p-0 relative"
                          >
                            <div className="w-full flex flex-row">
                              {/* User's avatar of person's post */}
                              <div
                                className={`block ${styles.postUserAvatar} pr-2 relative`}
                              >
                                <div
                                  role="button"
                                  tabIndex={-1}
                                  className="block justify-center relative flex-none items-start"
                                >
                                  <a className="w-[42px] h-[42px] flex flex-col min-w-0 rounded-full overflow-hidden p-0 m-0 relative">
                                    <img
                                      className="rounded-full w-11 h-11"
                                      alt="User's avatar"
                                      src={
                                        (post?.userAvatar as string)
                                          ? (post?.userAvatar as string)
                                          : "/assets/image/Navbar/default_profile_pic.jpeg"
                                      }
                                    />
                                  </a>
                                </div>
                              </div>
                              {/* Post caption */}
                              <div className="mt-1 leading-[18px] items-stretch border-0 inline-block p-0 flex-shrink m-0 min-w-0 flex-col">
                                <h2
                                  tabIndex={-1}
                                  className="text-sm items-center inline-flex"
                                >
                                  <div className="flex relative items-stretch flex-col mr-1">
                                    <span className="inline relative">
                                      <a className="font-bold text-sm inline-block border-0 relative p-0 ">
                                        {post.username}
                                      </a>
                                    </span>
                                  </div>
                                </h2>
                                <div className="inline ml-0.5">
                                  <p className="inline text-sm m-0 text-gray-900">
                                    {post.caption}
                                  </p>
                                </div>
                                {/* Posted time */}
                                <div className="mt-1.5">
                                  <p className="text-[12px] text-gray-500">
                                    12h
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                      {comments.map((comment: any) => (
                        <ul className="border-0 m-0 mb-4 p-0 list-none w-full">
                          <div
                            role="button"
                            tabIndex={0}
                            className="flex flex-col items-stretch flex-shrink-0 m-0 p-0 relative"
                          >
                            <li className="pb-0 overflow-visible py-[12px] px-0 w-auto list-none list-item relative mt-[-5px] mr-[-2px]">
                              <div className=" items-start flex flex-row flex-shrink-0 justify-between m-0 p-0 relative">
                                <div className="flex flex-row w-full">
                                  <div
                                    className={`block ${styles.postUserAvatar} pr-2 relative`}
                                  >
                                    <div
                                      role="button"
                                      tabIndex={-1}
                                      className="block justify-center relative flex-none items-start"
                                    >
                                      <a className="w-[38px] h-[38px] flex flex-col min-w-0 rounded-full overflow-hidden p-0 m-0 relative">
                                        <img
                                          className="rounded-full w-10 h-10"
                                          alt="User's avatar"
                                          src={
                                            (comment?.userAvatar as string)
                                              ? (post?.userAvatar as string)
                                              : "/assets/image/Navbar/default_profile_pic.jpeg"
                                          }
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className=" leading-[18px] items-stretch border-0 inline-block p-0 flex-shrink m-0 min-w-0 flex-col">
                                    <h2
                                      tabIndex={-1}
                                      className="text-sm items-center inline-flex"
                                    >
                                      <div className="flex relative items-stretch flex-col mr-1">
                                        <span className="inline relative">
                                          <a className="font-bold text-sm inline-block border-0 relative p-0 ">
                                            {comment.username}
                                          </a>
                                        </span>
                                      </div>
                                    </h2>
                                    <div className="inline ml-0.5">
                                      <p className="inline text-sm m-0 text-gray-900">
                                        {comment.comment}
                                      </p>
                                    </div>
                                    {/* Posted time */}
                                    <div className="mt-1.5 flex flex-row items-center space-x-3">
                                      <div>
                                        <span className="text-[12px] text-gray-500">
                                          12h
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-[12px] text-gray-500 font-bold">
                                          2 likes
                                        </span>
                                      </div>
                                      <div>
                                        <span>
                                          <button className="text-[12px] text-gray-500 hover:text-gray-600 font-bold p-0 m-0">
                                            Reply
                                          </button>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <span
                                  className={`${styles.iconContainer} mr-2 mt-[10px]`}
                                >
                                  <svg
                                    aria-label="Like"
                                    color="#262626"
                                    fill="#262626"
                                    height="14"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="14"
                                  >
                                    <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                                  </svg>
                                </span>
                              </div>
                            </li>
                          </div>
                        </ul>
                      ))}
                    </ul>
                  </div>
                  <div className="order-5 pl-4 mb-4">
                    <p className="uppercase text-[10px] text-gray-500">
                      12 hours ago
                    </p>
                  </div>
                  <div className="flex justify-between pb-3.5 pt-3.5 px-4 order-6 border-t">
                    <div className="flex items-center space-x-3.5 w-full">
                      <div>
                        <svg
                          aria-label="Emoji"
                          color="#262626"
                          fill="#262626"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                        </svg>
                      </div>
                      <div className="w-full ">
                        {" "}
                        <textarea
                          aria-label="Add a comment…"
                          placeholder="Add a comment…"
                          className="bg-transparent text-sm border-0 flex h-[18px] flex-grow max-h-[80px] outline-none p-0 m-0 w-full resize-none max-w-full"
                          autoComplete="off"
                          autoCorrect="off"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      onClick={postComment}
                      disabled={!comment.trim()}
                      className="text-blue-500 opacity-75 text-sm text-right font-bold disabled:opacity-40"
                    >
                      <div>Post</div>
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </article>
        </ViewPostModal>
      )}
    </div>
  );
};
