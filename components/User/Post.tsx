import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import ReactTimeago from "react-timeago";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { ViewPostModal } from "../Modal/ViewPost/ViewPostModal";
import { Comment } from "../Comments/Comment";
import styles from "./User.module.css";
import { IPost } from "../../types/post";
import { ILike } from "../../types/like";
import { IComment } from "../../types/comment";

interface IPostProps {
  post: IPost;
}

export const Post: React.FC<IPostProps> = ({ post }) => {
  const { user } = useAuth();
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const [modalComment, setModalComment] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);

  const [isReply, setIsReply] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState("");

  const [likes, setLikes] = useState<ILike[]>([]);
  const [hasLikedPost, setHasLikedPost] = useState(false);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [visableComments, setVisableComments] = useState(5);

  const handleModalCommentInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (modalComment.length > 0) {
        postModalComment();
      }
    }
  };

  const postModalComment = async () => {
    const commentToSend = modalComment.trim();

    if (isReply && commentToSend.charAt(0) === "@") {
      if (user) {
        await addDoc(
          collection(
            db,
            "posts",
            post.id,
            "comments",
            replyToCommentId,
            "comments"
          ),
          {
            comment: commentToSend,
            uid: user.uid,
            username: user.displayName,
            userAvatar: user.photoURL,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      if (user) {
        await addDoc(collection(db, "posts", post.id, "comments"), {
          comment: commentToSend,
          uid: user.uid,
          username: user.displayName,
          userAvatar: user.photoURL,
          timestamp: serverTimestamp(),
        });
      }
    }

    setModalComment("");
    setIsReply(false);
    setReplyToCommentId("");
  };

  const handleLoadMoreComments = () => {
    setVisableComments((prevValue) => prevValue + 5);
  };

  async function likePost() {
    if (hasLikedPost) {
      if (user) {
        await deleteDoc(doc(db, "posts", post.id, "likes", user.uid));
      }
    } else {
      if (user) {
        await setDoc(doc(db, "posts", post.id, "likes", user.uid), {
          username: user.displayName,
          userAvatar: user.photoURL,
        });
      }
    }
  }

  async function handleAddComment(value: string) {
    // if (modalComment.length === 0) {
    //   setIsReply(false);
    // }
    setModalComment(value);
  }

  useEffect(() => {
    const unSub = onSnapshot(
      query(
        collection(db, "posts", post.id, "comments"),
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
            comment: data.comment,
            timestamp: data.timestamp,
            uid: data.uid,
            userAvatar: data.userAvatar,
            username: data.username,
          };
        });
        setComments(documents);
      }
    );

    return () => unSub();
  }, [db, post.id]);

  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(db, "posts", post.id, "likes")),
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          const data: any = {
            ...doc.data(),
            id: doc.id,
          };
          return {
            id: data.id,
            userAvatar: data.userAvatar,
            username: data.username,
          };
        });
        setLikes(documents);
      }
    );

    return () => unSub();
  }, [db, post.id]);

  useEffect(
    () =>
      setHasLikedPost(likes.findIndex((like) => like.id === user?.uid) !== -1),
    [likes]
  );

  return (
    <>
      <div className="w-1/3 p-px md:px-3">
        <a onClick={() => setIsPostModalOpen(true)} className="cursor-pointer">
          <article
            className={`${styles.post} bg-gray-100 text-white relative pb-[100%] md:mb-6`}
          >
            <img
              className="w-full h-full absolute left-0 top-0 object-cover"
              src={post.image}
              alt="image"
            />

            <div
              className={`${styles.overlay} bg-gray-800 bg-opacity-25 w-full h-full absolute 
                  left-0 top-0 hidden`}
            >
              <div
                className="flex justify-center items-center 
                      space-x-4 h-full"
              >
                <span className="p-2">
                  <i className="fas fa-heart"></i>
                  412K
                </span>

                <span className="p-2">
                  <i className="fas fa-comment"></i>
                  1,993
                </span>
              </div>
            </div>
          </article>
        </a>
      </div>
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
                  <div className="mr-3 cursor-not-allowed">
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
                      {hasLikedPost ? (
                        <button
                          onClick={likePost}
                          className="items-center bg-transparent border-none cursor-pointer flex justify-center p-2"
                        >
                          <div className="flex justify-center items-center">
                            <span className={styles.likeButton}>
                              <svg
                                aria-label="Unlike"
                                fill="#ed4956"
                                height="24"
                                role="img"
                                viewBox="0 0 48 48"
                                width="24"
                              >
                                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                              </svg>
                            </span>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={likePost}
                          className="items-center bg-transparent border-none cursor-pointer flex justify-center p-2"
                        >
                          <div className="flex justify-center items-center">
                            <span className={styles.likeButton}>
                              <svg
                                aria-label="Like"
                                fill="#262626"
                                height="24"
                                viewBox="0 0 48 48"
                                width="24"
                              >
                                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                              </svg>
                            </span>
                          </div>
                        </button>
                      )}
                    </span>
                    <span className="inline-block ">
                      <button
                        onClick={() => commentInputRef.current?.focus()}
                        className="items-center bg-transparent border-none cursor-pointer flex justify-center p-2"
                      >
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
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </button>
                    </span>
                    <span className="inline-block ">
                      <button className="items-center bg-transparent border-none cursor-not-allowed flex justify-center p-2">
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
                                strokeLinejoin="round"
                                strokeWidth="2"
                                x1="22"
                                x2="9.218"
                                y1="3"
                                y2="10.083"
                              ></line>
                              <polygon
                                fill="none"
                                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></polygon>
                            </svg>
                          </span>
                        </div>
                      </button>
                    </span>
                    <span className="border-0 inline-block m-0 ml-auto p-0">
                      <button className="items-center bg-transparent border-none cursor-not-allowed flex justify-center p-2">
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
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
                        <p className="text-sm text-gray-800">
                          {likes.length === 1 ? (
                            <b className="text-black">{likes.length} like</b>
                          ) : (
                            <b className="text-black">{likes.length} likes</b>
                          )}
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
                                    <ReactTimeago
                                      date={post.timestamp.toDate()}
                                    />
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                      {comments.length >= 5 ? (
                        <div>
                          {comments
                            .slice(0, visableComments)
                            // .reverse()
                            .map((comment) => (
                              <Comment
                                key={comment.id}
                                postId={post.id}
                                comment={comment}
                                commentInputRef={commentInputRef}
                                setModalComment={handleAddComment}
                                setIsReply={setIsReply}
                                setReplyToCommentId={setReplyToCommentId}
                              />
                            ))}
                          {visableComments < comments.length && (
                            <div className="flex items-center justify-center pt-2 pb-6">
                              <div>
                                <button onClick={handleLoadMoreComments}>
                                  <svg
                                    aria-label="Load more comments"
                                    // className="_ab6-"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <circle
                                      cx="12.001"
                                      cy="12.005"
                                      fill="none"
                                      r="10.5"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                    ></circle>
                                    <line
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      x1="7.001"
                                      x2="17.001"
                                      y1="12.005"
                                      y2="12.005"
                                    ></line>
                                    <line
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      x1="12.001"
                                      x2="12.001"
                                      y1="7.005"
                                      y2="17.005"
                                    ></line>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {comments
                            // .reverse()
                            .map((comment) => (
                              <Comment
                                key={comment.id}
                                postId={post.id}
                                comment={comment}
                                commentInputRef={commentInputRef}
                                setModalComment={handleAddComment}
                                setIsReply={setIsReply}
                                setReplyToCommentId={setReplyToCommentId}
                              />
                            ))}
                        </div>
                      )}
                    </ul>
                  </div>
                  <div className="order-5 pl-4 mb-4">
                    <p className="uppercase text-[10px] text-gray-500">
                      <ReactTimeago date={post.timestamp?.toDate()} />
                    </p>
                  </div>
                  <div className="flex justify-between pb-3.5 pt-3.5 px-4 order-6 border-t">
                    <div className="flex items-center space-x-3.5 w-full">
                      <div className="cursor-not-allowed">
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
                        <input
                          aria-label="Add a comment…"
                          placeholder="Add a comment…"
                          ref={commentInputRef}
                          type="text"
                          name="modalComment"
                          value={modalComment}
                          onKeyDown={handleModalCommentInputKeyDown}
                          // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          //   setModalComment(e.target.value)
                          // }
                          onChange={(e) => handleAddComment(e.target.value)}
                          className="bg-transparent text-sm border-0 flex h-[18px] flex-grow max-h-[80px] outline-none p-0 m-0 w-full resize-none max-w-full"
                          autoComplete="off"
                          autoCorrect="off"
                        ></input>
                      </div>
                    </div>
                    <button
                      onClick={postModalComment}
                      disabled={!modalComment.trim()}
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
    </>
  );
};
