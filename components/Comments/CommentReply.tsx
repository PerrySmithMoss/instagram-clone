import React, { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import TimeAgo from "react-timeago";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

interface ICommentReplyProps {
  comment: any;
  postId: string;
  originalCommentId: string;
}

export const CommentReply: React.FC<ICommentReplyProps> = ({
  comment,
  postId,
  originalCommentId,
}) => {
  const [hasLikedComment, setHasLikedComment] = useState(false);
  const [likes, setLikes] = useState<any[]>([]);
  const { user } = useAuth();

  async function handleLikeComment() {
    if (hasLikedComment) {
      await deleteDoc(
        doc(
          db,
          "posts",
          postId,
          "comments",
          originalCommentId,
          "comments",
          comment.id,
          "likes",
          user.uid
        )
      );
    } else {
      await setDoc(
        doc(
          db,
          "posts",
          postId,
          "comments",
          originalCommentId,
          "comments",
          comment.id,
          "likes",
          user.uid
        ),
        {
          username: user?.username,
          userAvatar: user?.photoUrl,
        }
      );
    }
  }

  useEffect(() => {
    const unSub = onSnapshot(
      query(
        collection(
          db,
          `/posts/${postId}/comments/${originalCommentId}/comments/${comment.id}/likes`
        )
      ),
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setLikes(documents);
      }
    );

    return () => unSub();
  }, [db, comment.id, postId]);

  useEffect(
    () =>
      setHasLikedComment(
        likes.findIndex((like: any) => like.id === user?.uid) !== -1
      ),
    [likes]
  );

  console.log("likes: ", likes);
  return (
    <li className="-mr-1 pb-0 overflow-visible py-[12px] px-0 w-auto list-none list-item relative">
      <div className=" items-start flex flex-row flex-shrink-0 justify-between m-0 p-0 relative">
        <div className="flex flex-row w-full">
          <div className={`block ${styles.postUserAvatar} pr-2 relative`}>
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
                      ? (comment?.userAvatar as string)
                      : "/assets/image/Navbar/default_profile_pic.jpeg"
                  }
                />
              </a>
            </div>
          </div>
          <div className=" leading-[18px] items-stretch border-0 inline-block p-0 flex-shrink m-0 min-w-0 flex-col">
            <h2 tabIndex={-1} className="text-sm items-center inline-flex">
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
            <div className="mt-1.5 flex flex-row items-center space-x-2">
              <div>
                <span className="text-[12px] text-gray-500">
                  <TimeAgo date={comment.timestamp?.toDate()} />
                </span>
              </div>
              <div>
                {likes.length > 0 && (
                  <>
                    {likes.length === 1 ? (
                      <span className="text-[12px] text-gray-500 font-bold">
                        {likes.length} like
                      </span>
                    ) : (
                      <span className="text-[12px] text-gray-500 font-bold">
                        {likes.length} likes
                      </span>
                    )}
                  </>
                )}
              </div>
              {/* <div>
                <span>
                  <button
                    // onClick={handleReplyToComment}
                    className="text-[12px] text-gray-500 hover:text-gray-600 font-bold p-0 m-0"
                  >
                    Reply
                  </button>
                </span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mr-2 mt-[10px]">
          {hasLikedComment ? (
            <div
              onClick={handleLikeComment}
              className={`${styles.likeButton} like cursor-pointer`}
            >
              <svg
                aria-label="Unlike"
                color="#ed4956"
                fill="#ed4956"
                height="16"
                role="img"
                viewBox="0 0 48 48"
                width="16"
              >
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            </div>
          ) : (
            <div
              onClick={handleLikeComment}
              className={`${styles.likeButton} like cursor-pointer`}
            >
              <svg
                aria-label="Like"
                fill="#262626"
                height="16"
                viewBox="0 0 48 48"
                width="16"
              >
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
