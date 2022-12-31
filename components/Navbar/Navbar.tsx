import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import useDebounce from "../../hooks/useDebounce";
import { useOnClickOutside } from "../../hooks/useOnClickOustide";
import { CreatePostModal } from "../Modal/CreatePost/CreatePostModal";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/router";
import { useUserData } from "../../context/UserContext";
import { IUserData } from "../../types/userData";

interface INavbarProps {}

export const Navbar: React.FC<INavbarProps> = ({}) => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchInput, 1000);
  const [isSearching, setIsSearching] = useState(false);
  const [isShowSearchResults, setIsShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<IUserData[]>([]);

  const { user, logOut } = useAuth();
  const { userData } = useUserData();

  const profileRef = useRef(null);
  useOnClickOutside(profileRef, () => setIsProfileOpen(false));

  const mobileNavRef = useRef(null);
  useOnClickOutside(mobileNavRef, () => setIsMobileNavOpen(false));

  const searchResultsRef = useRef(null);
  const handleExitSearch = () => {
    setIsShowSearchResults(false);
  };
  useOnClickOutside(searchResultsRef, handleExitSearch);

  async function getUsers() {
    const doc = query(
      collection(db, "users"),
      where("fullName", ">=", debouncedSearchTerm.toUpperCase()),
      where("fullName", "<=", debouncedSearchTerm.toLowerCase() + "\uf8ff")
    );

    getDocs(doc).then((querySnapshot) => {
      let values: any = [];
      querySnapshot.forEach((doc) => {
        let data = {
          ...doc.data(),
          id: doc.id,
        };
        values.push(data);
      });
      setSearchResults(values);
    });

    setIsSearching(false);
    setIsShowSearchResults(true);
  }

  useEffect(() => {
    if (debouncedSearchTerm.length === 0) {
      setIsSearching(false);
      setIsShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    setIsShowSearchResults(true);

    getUsers();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setIsSearching(false);
      setIsShowSearchResults(false);

      return;
    }

    setIsSearching(true);
    setIsShowSearchResults(true);
  }, [searchInput]);

  return (
    <>
      <div className="shadow-sm bg-white border-b sticky top-0 z-50">
        <div className="flex justify-between items-center content-center max-w-[975px] pt-3 pb-3 mx-auto px-4">
          {/* Logo */}
          <Link href="/">
            <img
              src="/assets/image/Navbar/logo3.png"
              className="cursor-pointer"
            />
          </Link>
          {/* Search */}
          <div className="hidden flex-1 md:flex items-center justify-center px-16 lg:ml-12">
            <div className="max-w-lg w-full lg:max-w-xs relative">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="block w-full pl-10 pr-3 text-md py-[9px]   rounded-lg leading-5 bg-gray-100 placeholder:font-light placeholder-gray-500 focus:outline-none focus:placeholder-gray-400  transition duration-150 ease-in-out"
                  placeholder="Search"
                  type="text"
                />
                {isSearching ? (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="18"
                      visible={true}
                    />
                  </div>
                ) : searchInput.length > 0 ? (
                  <div
                    onClick={() => setSearchInput("")}
                    className="absolute cursor-pointer  inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="text-gray-300 rotate-45"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      height="14px"
                      width="14px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                    </svg>
                  </div>
                ) : null}
                {!isSearching && isShowSearchResults ? (
                  <div
                    ref={searchResultsRef}
                    className="absolute top-11 left-1/2 -translate-x-1/2 translate-y-0 pt-2"
                  >
                    <div className="relative bg-white border border-gray-200 rounded-md shadow-xl w-96">
                      <div className="absolute top-0 w-4 h-4 origin-center transform rotate-45 left-1/2 -translate-x-1/2  -translate-y-2 bg-white border-t border-l border-gray-200 rounded-sm pointer-events-none"></div>
                      <div className="relative pt-2 pb-2">
                        {searchResults.length > 0 ? (
                          <div className="flex flex-col overflow-x-hidden overflow-y-hidden">
                            {searchResults.map((user) => (
                              <div
                                // onClick={() => router.push(`/user/${user.uid}`)}
                                key={user.id}
                                className="block py-2 px-5 cursor-pointer hover:bg-gray-100"
                              >
                                <div className="outline-none">
                                  <Link href={`/user/${user.uid}`}>
                                  <div className="flex flex-row justify-start items-center">
                                    <div className="h-9 w-9 rounded-full">
                                      <img
                                        src={
                                          userData?.profilePicture
                                            ? userData?.profilePicture
                                            : "/assets/image/Navbar/default_profile_pic.jpeg"
                                        }
                                        className="rounded-full h-9 w-9"
                                      />
                                    </div>
                                    <div>
                                      <div className="ml-2 flex flex-col min-w-0 min-h-0 flex-auto justify-center">
                                        <div>
                                          <div className="inline m-0 text-sm leading-4 font-medium">
                                            {user.displayName}
                                          </div>
                                        </div>
                                        <div className="text-sm text-gray-500 leading-4">
                                          {user.fullName}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3">
                            <p className="text-center">
                              No users could be found with the specified name.
                              Please refine your search.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* Icons */}
          {user ? (
            <>
              <div className="block xs:hidden relative">
                <div
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  className="cursor-pointer relative"
                >
                  <svg
                    aria-label="Mobile Navigation"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z"></path>
                  </svg>
                </div>
                {isMobileNavOpen ? (
                  <div
                    ref={mobileNavRef}
                    className="absolute top-9 -right-3 pt-2"
                  >
                    <div className="relative bg-white border border-gray-200 rounded-md shadow-xl w-[185px]">
                      <div className="absolute top-0 right-8 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 bg-white border-t border-l border-gray-200 rounded-sm pointer-events-none"></div>
                      <div className="relative">
                        <div className="flex justify-between cursor-pointer content-center items-center w-full px-4 py-2 space-x-3 hover:bg-gray-50">
                          <a className="block text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                            Search
                          </a>
                          <svg
                            aria-label="Search"
                            color="#262626"
                            fill="#262626"
                            height="18"
                            role="img"
                            viewBox="0 0 24 24"
                            width="18"
                          >
                            <path
                              d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                            <line
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="16.511"
                              x2="22"
                              y1="16.511"
                              y2="22"
                            ></line>
                          </svg>
                        </div>
                        <hr />
                        {/* <Link href={`/user/${user.uid}`}>
                          <div className="flex justify-between cursor-pointer content-center items-center w-full px-4 py-2 space-x-3 hover:bg-gray-50">
                            <a className="block text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                              Messages
                            </a>
                            <svg
                              aria-label="Direct"
                              color="#262626"
                              fill="#262626"
                              height="18"
                              role="img"
                              viewBox="0 0 24 24"
                              width="18"
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
                          </div>
                        </Link> */}
                        {/* <hr /> */}
                        <div
                          onClick={() => {
                            setIsCreatePostModalOpen(!isCreatePostModalOpen);
                            setIsMobileNavOpen(false);
                          }}
                          className="flex cursor-pointer justify-between content-center items-center w-full px-4 py-2 space-x-3 hover:bg-gray-50"
                        >
                          <button className="block text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                            Create Post
                          </button>
                          <svg
                            aria-label="New post"
                            color="#262626"
                            fill="#262626"
                            height="18"
                            role="img"
                            viewBox="0 0 24 24"
                            width="18"
                          >
                            <path
                              d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            ></path>
                            <line
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="6.545"
                              x2="17.455"
                              y1="12.001"
                              y2="12.001"
                            ></line>
                            <line
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              x1="12.003"
                              x2="12.003"
                              y1="6.545"
                              y2="17.455"
                            ></line>
                          </svg>
                        </div>
                        <hr />
                        {/* <Link href={`/user/${user.uid}`}>
                          <div className="flex justify-between cursor-pointer content-center items-center w-full px-4 py-2 space-x-3 hover:bg-gray-50">
                            <a className="block text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                              Notifications
                            </a>
                            <svg
                              aria-label="Notifications"
                              color="#262626"
                              fill="#262626"
                              height="18"
                              role="img"
                              viewBox="0 0 24 24"
                              width="18"
                            >
                              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                            </svg>
                          </div>
                        </Link>
                        <hr /> */}
                        <Link href={`/user/${user.uid}`}>
                          <div className="flex justify-between cursor-pointer content-center items-center w-full px-4 py-2 space-x-3 hover:bg-gray-50">
                            <a className="block text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                              Profile
                            </a>
                            <div
                              onClick={() => setIsProfileOpen(!isProfileOpen)}
                              className="flex w-[20px] h-[20px] justify-center items-center rounded-full"
                            >
                              <img
                                className="rounded-full"
                                alt="Profile Picture"
                                src={
                                  user?.photoURL
                                    ? user?.photoURL
                                    : userData?.profilePicture
                                    ? userData?.profilePicture
                                    : "/assets/image/Navbar/default_profile_pic.jpeg"
                                }
                              />
                            </div>
                          </div>
                        </Link>
                        <button
                          onClick={() => logOut()}
                          className="block text-left border-t-[6px] cursor-pointer hover:bg-gray-50 w-full px-4 py-2 text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="items-center content-center justify-end space-x-5 hidden xs:flex">
                <Link href="/">
                  <div className="cursor-pointer">
                    <svg
                      aria-label="Home"
                      className="_8-yf5 "
                      fill="#262626"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
                    </svg>
                  </div>
                </Link>
                <div className="md:hidden cursor-pointer">
                  <span className="relative">
                    <svg
                      height="24"
                      width="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </span>
                </div>
                {/* <div className="cursor-pointer">
                  <span className="relative ">
                    <svg
                      aria-label="Direct"
                      fill="#262626"
                      height="25"
                      color="#262626"
                      viewBox="0 0 24 24"
                      width="25"
                    >
                      <line
                        fill="none"
                        strokeLinecap="round"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        x1={22}
                        x2={9.218}
                        y1={3}
                        y2={10.083}
                      ></line>
                      <polygon
                        fill="none"
                        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      ></polygon>
                    </svg>
                    <span className="absolute -top-0 left-2 inline-flex items-center justify-center px-1.5 py-1 text-xs leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      1
                    </span>
                  </span>
                </div> */}
                <div
                  className=" cursor-pointer"
                  onClick={() =>
                    setIsCreatePostModalOpen(!isCreatePostModalOpen)
                  }
                >
                  <svg
                    aria-label="Create Post"
                    height="25"
                    width="25"
                    fill="#262626"
                    color="#262626"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                      strokeLinecap="round"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <line
                      fill="none"
                      strokeLinecap="round"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      x1={6.545}
                      strokeWidth={2}
                      x2={17.455}
                      y1={12.001}
                      y2={12.001}
                    ></line>
                    <line
                      strokeLinecap="round"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      fill="none"
                      x1={12.003}
                      x2={12.003}
                      y1={6.545}
                      strokeWidth={2}
                      y2={17.455}
                    ></line>
                  </svg>
                </div>
                {/* <div className=" cursor-pointer">
                  <svg
                    aria-label="Notifications"
                    fill="#262626"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                  </svg>
                </div> */}
                <div className="relative cursor-pointer">
                  <div
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex w-9 h-9 justify-center items-center  mr-2 text-xl rounded-full text-white"
                  >
                    <img
                      className="rounded-full w-9 h-9"
                      alt="Profile Picture"
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : userData?.profilePicture
                          ? userData?.profilePicture
                          : "/assets/image/Navbar/default_profile_pic.jpeg"
                      }
                    />
                  </div>
                  {isProfileOpen ? (
                    <div
                      ref={profileRef}
                      className="absolute top-9 -right-3 pt-2"
                    >
                      <div className="relative bg-white border border-gray-200 rounded-md shadow-xl w-52">
                        <div className="absolute top-0 right-12 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 bg-white border-t border-l border-gray-200 rounded-sm pointer-events-none"></div>
                        <div className="relative">
                          <Link href={`/user/${user.uid}`}>
                            <div className="flex content-center items-center w-full px-4 py-2 space-x-3 hover:bg-gray-50">
                              <svg
                                aria-label="Profile"
                                fill="#262626"
                                color="#262626"
                                height="17"
                                viewBox="0 0 24 24"
                                width="17"
                              >
                                <circle
                                  cx={12.004}
                                  cy={12.004}
                                  fill="none"
                                  strokeMiterlimit={10}
                                  strokeWidth={2}
                                  r={10.5}
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                ></circle>
                                <path
                                  fill="none"
                                  d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                />
                                <circle
                                  cx={12.006}
                                  cy={9.718}
                                  fill="none"
                                  strokeMiterlimit={10}
                                  strokeWidth={2}
                                  r={4.19}
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                ></circle>
                              </svg>
                              <a className="block  text-sm text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out">
                                Profile
                              </a>
                            </div>
                          </Link>
                          <hr />
                          <button
                            onClick={() => logOut()}
                            className="block text-left hover:bg-gray-50 w-full px-4 py-2 text-sm text-gray-700 whitespace-no-wrap focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out"
                          >
                            Log out
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <div className="flex space-x-6">
              <Link href="/login">
                <button className="text-blue-400">Log in</button>
              </Link>
              <Link href="/sign-up">
                <button className="text-blue-400">Sign up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {isCreatePostModalOpen && (
        <CreatePostModal
          open={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          selector="createPostModal"
        />
      )}
    </>
  );
};
