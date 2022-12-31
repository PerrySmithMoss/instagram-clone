import {
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { IComment } from "../../types/comment";
import { ILike } from "../../types/like";
import styles from "./Comments.module.css";

interface ICommentUnderPostProps {
  comment: IComment;
  postId: string;
}

export const CommentUnderPost: React.FC<ICommentUnderPostProps> = ({
  comment,
  postId,
}) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState<ILike[]>([]);
  const [hasLikedComment, setHasLikedComment] = useState(false);

  async function handleLikeComment() {
    if (hasLikedComment) {
      if (user) {
        await deleteDoc(
          doc(db, "posts", postId, "comments", comment.id, "likes", user.uid)
        );
      }
    } else {
      if (user) {
        await setDoc(
          doc(db, "posts", postId, "comments", comment.id, "likes", user.uid),
          {
            username: user?.displayName,
            userAvatar: user?.photoURL,
          }
        );
      }
    }
  }

  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(db, `/posts/${postId}/comments/${comment.id}/likes`)),
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
          const data: any = {
            ...doc.data(),
            id: doc.id,
          };
          return {
            username: data.username,
            userAvatar: data.userAvatar,
            id: data.id,
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
        likes.findIndex((like) => like.id === user?.uid) !== -1
      ),
    [likes]
  );
  return (
    <div className="flex justify-between items-center space-x-1 mt-0.5">
      <div>
        <p>
          <span className="text-sm font-bold">{comment.username}</span>
          <span className="m-0 inline">&nbsp;</span>
          <span className="text-sm">{comment.comment}</span>
        </p>
      </div>
      {hasLikedComment ? (
        <div
          onClick={handleLikeComment}
          className={`${styles.likeButton} like cursor-pointer`}
        >
          <svg
            aria-label="Unlike"
            color="#ed4956"
            fill="#ed4956"
            height="12"
            role="img"
            viewBox="0 0 48 48"
            width="12"
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
            height="12"
            viewBox="0 0 48 48"
            width="12"
          >
            <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};
