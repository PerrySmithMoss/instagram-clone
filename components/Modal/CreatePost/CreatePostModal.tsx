import React, { RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CreatePostModalStyles from "./CreatePostModal.module.css";
import { useAuth } from "../../../context/AuthContext";
import { db, storage } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadString,
} from "firebase/storage";
import { useUserData } from "../../../context/UserContext";

// import { toast } from "react-toastify";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  selector: string;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  onClose,
  selector,
}) => {
  const { user } = useAuth();
  const { userData } = useUserData();

  const ref = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [postCaption, setPostCaption] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [accessibilityText, setAccessibilityText] = useState("");
  const [isTurnOffCommentingTrue, setIsTurnOffCommentingTrue] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files![0]) {
      reader.readAsDataURL(e.target.files![0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };

  const uploadPost = async () => {
    try {
      const postsCollectionRef = collection(db, "posts");

      const createPostRef = await addDoc(postsCollectionRef, {
        uid: user?.uid,
        username: user?.displayName,
        userAvatar: user?.photoURL,
        caption: postCaption,
        location: postLocation,
        timestamp: serverTimestamp(),
      });

      const imageRef = storageRef(storage, `posts/${createPostRef.id}/image`);

      await uploadString(imageRef, selectedFile as string, "data_url");

      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "posts", createPostRef.id), {
        image: downloadUrl,
      });

      onClose();
      setSelectedFile(null);
    } catch (error: any) {
        console.error(error);
    }
  };

  useEffect(() => {
    ref.current = document.querySelector(`#${selector}`);
    setMounted(true);
  }, [selector]);

  if (!open) return null;

  return mounted
    ? createPortal(
        <div
          className={`${CreatePostModalStyles.modalBackdrop}`}
          onClick={() => {
            // close modal when outside of modal is clicked
            onClose();
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
              <div className="flex justify-between items-center content-center pb-1">
                <div className="flex items-center content-center ml-3">
                  {selectedFile ? (
                    <button type="button" onClick={() => setSelectedFile(null)}>
                      <svg
                        aria-label="Back"
                        height={24}
                        viewBox="0 0 24 24"
                        width={24}
                        color="262626"
                        fill="262626"
                        role="img"
                      >
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          x1={2.909}
                          x2={22.001}
                          y1={12.004}
                          y2={12.004}
                        ></line>
                        <polyline
                          fill="none"
                          points="9.276 4.726 2.001 12.004 9.276 19.274"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        ></polyline>
                      </svg>
                    </button>
                  ) : null}
                </div>
                <div className="flex flex-1 justify-center content-center items-center">
                  <h2 className="pb-2 font-medium text-center text-lg ">
                    Create new post
                  </h2>
                </div>
                <div className="flex items-center h-full mb-2">
                  {selectedFile ? (
                    <span className="mr-3">
                      <button
                        disabled={!selectedFile}
                        onClick={uploadPost}
                        className="text-blue-400 font-medium hover:text-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      >
                        Share
                      </button>
                    </span>
                  ) : (
                    <div onClick={() => onClose()}>
                      <svg
                        className="mr-3 cursor-pointer"
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="22"
                        height="22"
                      >
                        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div
                className={CreatePostModalStyles.createPostModalContentInner}
              >
                {selectedFile ? (
                  <div className="grid grid-cols-2 max-w-4xl h-full">
                    <div className=" object-cover overflow-hidden">
                      <img
                        src={selectedFile as string}
                        className="overflow-hidden object-cover rounded-bl-xl  h-full w-full"
                        alt="Selected File Image"
                      />
                    </div>
                    <div className="mt-4 overflow-y-scroll">
                      <div className="flex content-center items-center mx-2">
                        <div>
                          <img
                            className="rounded-full w-8 h-8"
                            alt="User's avatar"
                            src={
                              user?.photoURL
                              ? user?.photoURL
                              : userData?.profilePicture
                              ? userData?.profilePicture
                              : "/assets/image/Navbar/default_profile_pic.jpeg"
                            }
                          />
                        </div>
                        <div className="flex-1 ml-2">
                          <h2 className="font-medium">{user?.displayName}</h2>
                        </div>
                      </div>
                      <div className="mt-4 ">
                        <div className="pb-32 mx-4">
                          <input
                            type="text"
                            value={postCaption}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setPostCaption(e.target.value)}
                            placeholder="Write a caption..."
                            className=" h-6 outline-none"
                          />
                        </div>
                        <div className="flex justify-between pb-2 mx-4">
                          <div>
                            <svg
                              viewBox="0 0 20 20"
                              fill="#808080"
                              className="w-5 h-5"
                            >
                              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
                            </svg>
                          </div>
                          <div className=" ">
                            <span className="text-gray-300 text-sm">
                              {postCaption.length}/2,200
                            </span>
                          </div>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center content-center mx-4">
                          <div className="py-3">
                            <input
                              maxLength={75}
                              type="text"
                              value={postLocation}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setPostLocation(e.target.value)}
                              placeholder="Add Location"
                              className="text-gray-700 outline-none"
                            />
                          </div>
                          <div>
                            <svg
                              aria-label="Add location"
                              viewBox="0 0 24 24"
                              fill="#808080"
                              className="w-4 h-4"
                            >
                              <path d="M12.053 8.105a1.604 1.604 0 101.604 1.604 1.604 1.604 0 00-1.604-1.604zm0-7.105a8.684 8.684 0 00-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 001.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0012.053 1zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0113.417 0c0 3.985-3.944 8.538-6.709 11.002z" />
                            </svg>
                          </div>
                        </div>
                        <hr />
                        <div className="mx-4">
                          <div
                            onClick={() =>
                              setIsAccessibilityOpen(!isAccessibilityOpen)
                            }
                            className="flex cursor-pointer justify-between items-center content-center"
                          >
                            <div className="py-3">
                              <span
                                className={
                                  isAccessibilityOpen
                                    ? "text-gray-700 font-bold"
                                    : "text-gray-700"
                                }
                              >
                                Accesibility
                              </span>
                            </div>
                            <span className=" rotate-180">
                              <svg
                                viewBox="0 0 24 24"
                                fill="#808080"
                                className={
                                  isAccessibilityOpen
                                    ? "rotate-180 w-4 h-4"
                                    : "w-4 h-4"
                                }
                              >
                                <path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z" />
                              </svg>
                            </span>
                          </div>
                          {isAccessibilityOpen && (
                            <div className="">
                              <p className="text-sm text-gray-500">
                                Alt text describes your photos for people with
                                visual impairments. Alt text will be
                                automatically created for your photos or you can
                                choose to write your own.
                              </p>
                              <div className="flex content-center items-center pt-2.5 pb-5">
                                <img
                                  src={selectedFile as string}
                                  className=" h-12 w-12"
                                  alt="User uploaded photo"
                                />
                                <input
                                  type="text"
                                  value={accessibilityText}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => setAccessibilityText(e.target.value)}
                                  className="border ml-3 flex-grow rounded-lg px-3 py-3"
                                  placeholder="Write alt text"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="mx-4">
                          <div
                            onClick={() =>
                              setIsAdvancedSettingsOpen(!isAdvancedSettingsOpen)
                            }
                            className=" cursor-pointer flex justify-between items-center content-center"
                          >
                            <div className="py-3">
                              <span
                                className={
                                  isAdvancedSettingsOpen
                                    ? "text-gray-700 font-bold"
                                    : "text-gray-700"
                                }
                              >
                                Advanced settings
                              </span>
                            </div>
                            <span className="rotate-180">
                              <svg
                                viewBox="0 0 24 24"
                                fill="#808080"
                                className={
                                  isAdvancedSettingsOpen
                                    ? "rotate-180 w-4 h-4"
                                    : "w-4 h-4"
                                }
                              >
                                <path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z" />
                              </svg>
                            </span>
                          </div>
                          {isAdvancedSettingsOpen && (
                            <div className="">
                              <div className="flex content-center items-center pt-1">
                                <div className=" flex-grow">
                                  <span>Turn off commenting</span>
                                </div>
                                <div className="flex justify-end">
                                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input
                                      type="checkbox"
                                      checked={isTurnOffCommentingTrue}
                                      onChange={() =>
                                        setIsTurnOffCommentingTrue(
                                          !isTurnOffCommentingTrue
                                        )
                                      }
                                      name="toggle"
                                      id="toggle"
                                      className={
                                        isTurnOffCommentingTrue
                                          ? `${CreatePostModalStyles.createPostModalSwitch} absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`
                                          : `absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`
                                      }
                                    />
                                    <label
                                      htmlFor="toggle"
                                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                    ></label>
                                  </div>
                                </div>
                              </div>
                              <div className="flex py-3">
                                <p className="text-sm text-gray-500">
                                  You can change this later by going to the ···
                                  menu at the top of your post.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center content-center items-center">
                    <div>
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
                      <input
                        ref={filePickerRef}
                        onChange={addImageToPost}
                        type="file"
                        hidden
                      />
                      <div className="flex justify-center mt-5">
                        <button
                          onClick={() => filePickerRef!.current!.click()}
                          className="px-3 py-2 bg-blue-400 text-white  text-xs rounded-md"
                        >
                          Select from Computer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
};
