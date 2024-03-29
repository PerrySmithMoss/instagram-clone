import { updateProfile } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  uploadString,
  ref as storageRef,
} from "firebase/storage";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Navbar } from "../../components/Navbar/Navbar";
import { Post } from "../../components/User/Post";
import { useAuth } from "../../context/AuthContext";
import { useUserData } from "../../context/UserContext";
import { db, storage } from "../../firebase";
import { IPost } from "../../types/post";
import { IUserData } from "../../types/userData";

interface IProfileProps {}

export const Profile: React.FC<IProfileProps> = ({}) => {
  const { user: currentUser } = useAuth();
  const { userData, setUserData } = useUserData();

  const [user, setUser] = useState<IUserData>();
  const [foundUser, setFoundUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadedAvatar, setUploadedAvater] = useState(false);

  const [posts, setPosts] = useState<IPost[]>();
  const router = useRouter();

  const filePickerRef = useRef<HTMLInputElement>(null);

  const uploadUserAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files![0]) {
      reader.readAsDataURL(e.target.files![0]);
    }

    reader.onload = async (readerEvent) => {
      try {
        if (currentUser) {
          const imageRef = storageRef(
            storage,
            `avatars/${currentUser.uid}/image`
          );

          await uploadString(
            imageRef,
            readerEvent.target?.result as string,
            "data_url"
          );

          const downloadUrl = await getDownloadURL(imageRef);

          await updateProfile(currentUser, { photoURL: downloadUrl });

          await updateDoc(doc(db, "users", currentUser.uid), {
            profilePicture: downloadUrl,
          }).then((_doc) => {
            setUploadedAvater(true);
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    };
  };

  const getUser = async () => {
    const docRef = doc(db, `users/${router.query.id}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      const user = {
        id: data.id,
        displayName: data.displayName,
        email: data.email,
        followers: data.followers,
        following: data.following,
        fullName: data.fullName,
        profilePicture: data.profilePicture,
        uid: data.uid,
        username: data.username,
      };

      setUser(user);
      setFoundUser(true);
      setLoading(false);
    } else {
      setLoading(false);
      setFoundUser(false);
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setUploadedAvater(false);
  };

  async function getUsersPosts() {
    const unSub = onSnapshot(
      query(collection(db, "posts"), where("uid", "==", router.query.id)),
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
      }
    );

    return unSub;
  }

  async function updateLoggedInUserFollowing(userToFolllowId: string) {
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        following: userData.following.includes(userToFolllowId)
          ? arrayRemove(userToFolllowId)
          : arrayUnion(userToFolllowId),
      });
    }
  }

  async function updateFollowedUserFollowers(userFolllowedId: string) {
    if (currentUser) {
      await updateDoc(doc(db, "users", userFolllowedId), {
        followers: userData.following.includes(userFolllowedId)
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid),
      });
    }
  }

  const handleFollowUser = async (userId: string) => {
    await updateLoggedInUserFollowing(userId);

    await updateFollowedUserFollowers(userId);

    const isFollowingUser = userData.following.includes(userId);

    if (currentUser) {
      setUserData((prev) => ({
        ...prev,
        followers: isFollowingUser
          ? prev.followers.filter(
              (followingId: string) => followingId !== currentUser.uid
            )
          : [...prev.followers, currentUser.uid],
      }));

      setUserData((prev) => ({
        ...prev,
        following: isFollowingUser
          ? prev.following.filter(
              (followingId: string) => followingId !== userId
            )
          : [...prev.following, userId],
      }));
    }
  };

  useEffect(() => {
    getUser();
    getUsersPosts();
  }, [router.query.id]);

  useEffect(() => {
    getUser();
  }, [userData]);

  useEffect(() => {
    getUsersPosts();
  }, [foundUser]);

  useEffect(() => {
    if (uploadedAvatar) {
      getUser();
    }
  }, [uploadedAvatar]);

  // Get user data from Firebase using userId from URL
  // if no userId then return page not found
  // if userId then display profile page
  // user userId === user.uid then show their own profile with editing options etc.
  // if userId !== user.uid then show the users profile with option to follow/unfollow etc.
  if (loading) {
    return (
      <div className="bg-gray-50 h-screen">
        <Head>
          <title>Instagram</title>
          <meta name="description" content="Instagram" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
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
      </div>
    );
  }
  if (foundUser && posts && router.query.id && user && currentUser) {
    return (
      <div className="bg-gray-50 h-screen">
        <Head>
          <title>
            {user.fullName} @{user.username} | Instagram
          </title>
          <meta name="description" content="Instagram" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main className="max-w-[975px] mx-auto">
          <div className="lg:w-10/12 lg:mx-auto mb-8">
            <header className="flex flex-wrap items-center p-4 md:py-8">
              <div className="md:w-3/12 md:ml-16">
                <div className="relative w-20 h-20 md:w-40 md:h-40">
                  <img
                    className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full"
                    src={
                      (user?.profilePicture as string)
                        ? (user?.profilePicture as string)
                        : "/assets/image/Navbar/default_profile_pic.jpeg"
                    }
                    alt="profile picture"
                  />
                  {currentUser.uid === router.query.id ? (
                    <div
                      // style={{ transform: "translate(50%, 0%)" }}
                      className=" cursor-pointer top-2 right-5 absolute rounded-full"
                    >
                      <div
                        onClick={() => filePickerRef!.current!.click()}
                        aria-label="Update Profile Avatar"
                        role="button"
                        className="h-10 w-10 bg-gray-300 hover:bg-gray-400 flex justify-center rounded-full text-center items-center"
                      >
                        <input
                          ref={filePickerRef}
                          onChange={uploadUserAvatar}
                          type="file"
                          hidden
                        />
                        <svg
                          version="1.1"
                          id="Capa_1"
                          className="block mb-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 487 487"
                          fill="#050505"
                          height={18}
                          width={18}
                          xmlSpace="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
         M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
        v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
         M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
         M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"
                              />
                            </g>
                          </g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                        </svg>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="w-7/12 ml-4">
                <div className="xs:flex xs:flex-wrap xs:items-center mb-4">
                  <h2 className="text-xl xs:text-3xl text-gray-700 inline-block xs:mr-2 xs:mb-2 sm:mb-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.username}
                  </h2>
                  {currentUser.uid === router.query.id ? (
                    <div className="mt-1 xs:mt-0 flex items-center space-x-4">
                      <div>
                        <button className="bg-transparent border text-black px-3 py-1 font-semibold text-sm rounded text-center sm:inline-block block">
                          Edit profile
                        </button>
                      </div>
                      <div>
                        <svg
                          aria-label="Options"
                          color="#262626"
                          fill="#262626"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            fill="none"
                            r="8.635"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></circle>
                          <path
                            d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                            fill="none"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="xs:ml-6 mt-1 xs:mt-0 flex items-center space-x-2">
                      <div>
                        {userData.following.includes(
                          router.query.id as string
                        ) ? (
                          <button
                            onClick={() =>
                              handleFollowUser(router.query.id as string)
                            }
                            className="bg-white hover:bg-gray-100 border text-black px-3 py-1 
         font-semibold text-sm rounded text-center 
         sm:inline-block block"
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleFollowUser(router.query.id as string)
                            }
                            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 
text-white font-semibold text-sm rounded text-center 
sm:inline-block block"
                          >
                            Follow
                          </button>
                        )}
                      </div>
                      <div>
                        <button
                          className="bg-white hover:bg-gray-100 border text-black px-3 py-1 
       font-semibold text-sm rounded text-center 
       sm:inline-block block"
                        >
                          Message
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <ul className="hidden md:flex space-x-8 mb-4">
                  {posts.length === 1 ? (
                    <li>
                      <span className="font-semibold pr-1">{posts.length}</span>
                      post
                    </li>
                  ) : (
                    <li>
                      <span className="font-semibold pr-1">{posts.length}</span>
                      posts
                    </li>
                  )}

                  <li>
                    {user.followers.length === 1 ? (
                      <>
                        <span className="font-semibold pr-1">
                          {user.followers.length}
                        </span>
                        follower
                      </>
                    ) : (
                      <>
                        <span className="font-semibold pr-1">
                          {user.followers.length}
                        </span>
                        followers
                      </>
                    )}
                  </li>
                  <li>
                    <span className="font-semibold pr-1">
                      {user.following.length}
                    </span>
                    following
                  </li>
                </ul>

                <div className="hidden md:block">
                  <h1 className="font-semibold">{user.fullName}</h1>
                  <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
              </div>

              {/* <div className="md:hidden text-sm my-2">
            <h1 className="font-semibold">Mr Travlerrr...</h1>
            <span>Travel, Nature and Music</span>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div> */}
            </header>

            <div className="px-px md:px-3">
              <ul
                className="flex md:hidden justify-around space-x-8 border-t  border-b
          text-center p-2 text-gray-600 leading-snug text-sm"
              >
                <li>
                  <span className="font-semibold text-gray-800 block pr-1">
                    136
                  </span>
                  posts
                </li>

                <li>
                  <span className="font-semibold text-gray-800 block pr-1">
                    {user.followers.length}
                  </span>
                  followers
                </li>
                <li>
                  <span className="font-semibold text-gray-800 block pr-1">
                    {user.following.length}
                  </span>
                  following
                </li>
              </ul>

              <ul
                className="hidden md:flex items-center justify-around md:justify-center space-x-12  
              uppercase tracking-widest font-semibold text-xs text-gray-600
              border-t border-b py-2"
              >
                <li className="md:-mt-px md:text-gray-700 flex items-center">
                  <svg
                    aria-label=""
                    color="#262626"
                    fill="#262626"
                    height="14"
                    role="img"
                    viewBox="0 0 24 24"
                    width="14"
                  >
                    <rect
                      fill="none"
                      height="18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      width="18"
                      x="3"
                      y="3"
                    ></rect>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="9.015"
                      x2="9.015"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="14.985"
                      x2="14.985"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="9.015"
                      y2="9.015"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="14.985"
                      y2="14.985"
                    ></line>
                  </svg>
                  <div className="inline-block py-3 pr-3 pl-2">
                    <span className="hidden md:inline font-bold">Posts</span>
                  </div>
                </li>
              </ul>
              <div className="flex flex-wrap -mx-px md:-mx-3">
                {posts &&
                  posts.length > 0 &&
                  posts.map((post) => <Post key={post.id} post={post} />)}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 h-screen">
      <Head>
        <title>Page not found | Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="mt-10">
        <h1 className="text-[#262626] font-bold text-center text-[22px]">
          Sorry, this page isn&apos;t available.
        </h1>
        <p className="mt-6 text-[#262626] text-center">
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <span
            onClick={() => router.push("/")}
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            Go back to Instagram.
          </span>
        </p>
      </div>
    </div>
  );
};
