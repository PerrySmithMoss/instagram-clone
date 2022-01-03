import React from "react";
import CreatePostModalStyles from "./CreatePostModal.module.css";

interface ICreatePostModalProps {
  children?: any;
  shown: boolean;
  close: () => void;
}

export const CreatePostModal: React.FC<ICreatePostModalProps> = ({
  children,
  shown,
  close,
}) => {
  return shown ? (
    <div
      className={`${CreatePostModalStyles.modalBackdrop}`}
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className={`${CreatePostModalStyles.modalContent} border rounded-xl`}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
          className=" pt-3"
        >
            <div className="flex justify-between items-center content-center">
                <div className="flex flex-1 justify-center content-center items-center">
                <h2 className="pb-2 font-bold text-center ">Create new post</h2>

                </div>
                <div className="flex items-center h-full mb-2">
                <svg className="mr-3" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="22" height="22"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/></svg>
                </div>

            </div>
          <hr />
          <div className="pt-36 pb-36">
              <div className="flex justify-center">
              <svg
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="75px"
              height="75px"
            >
              <path d="M 7 2 L 7 48 L 43 48 L 43 15.414063 L 29.410156 2 Z M 9 4 L 28 4 L 28 17 L 41 17 L 41 46 L 9 46 Z M 30 5.390625 L 39.734375 15 L 30 15 Z M 33.5 21.332031 C 32.457031 21.335938 31.609375 22.15625 31.609375 23.167969 C 31.613281 24.179688 32.457031 25 33.5 25 C 34.542969 25 35.386719 24.179688 35.390625 23.167969 C 35.390625 22.15625 34.542969 21.335938 33.5 21.332031 Z M 21.167969 24 C 20.835938 23.988281 20.519531 24.136719 20.324219 24.40625 L 12.863281 34.488281 C 12.640625 34.792969 12.605469 35.195313 12.773438 35.53125 C 12.945313 35.871094 13.289063 36.082031 13.667969 36.082031 L 28.425781 36.082031 C 28.449219 36.082031 28.472656 36.082031 28.496094 36.082031 C 28.5 36.082031 28.5 36.082031 28.503906 36.082031 L 35.015625 36 C 35.398438 35.996094 35.742188 35.769531 35.90625 35.421875 C 36.066406 35.074219 36.015625 34.667969 35.777344 34.371094 L 29.269531 26.386719 C 29.078125 26.148438 28.785156 26.011719 28.480469 26.015625 C 28.164063 26.023438 27.871094 26.175781 27.6875 26.429688 L 25.554688 29.363281 L 21.9375 24.410156 C 21.753906 24.164063 21.472656 24.011719 21.167969 24 Z M 21.125 26.6875 L 24.753906 31.660156 C 24.757813 31.667969 24.761719 31.671875 24.765625 31.675781 L 26.523438 34.082031 L 15.652344 34.082031 Z M 28.539063 28.65625 L 32.917969 34.027344 L 29 34.078125 L 26.796875 31.0625 Z" />
            </svg>
              </div>
            <h3 className="mt-4 font-light text-2xl text-center">
              Drag photos and video here
            </h3>
            <div className="flex justify-center mt-5">
              <button className="px-3 py-2 bg-blue-400 text-white  text-xs rounded-md">
                Select from Computer
              </button>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  ) : null;
};
