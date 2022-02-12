import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CreatePostModal } from "./CreatePostModal";

interface INavbarProps {}

export const Navbar: React.FC<INavbarProps> = ({}) => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  return (
    <>
      <div className="shadow-sm bg-white border-b sticky top-0 z-50">
        <div className="flex justify-between items-center content-center max-w-6xl mx-6 pt-3 pb-3 lg:mx-auto lg:px-10">
          {/* Logo */}
          {/* <div className="relative w-32 h-10 cursor-pointer"> */}
          <Link href="/">
            <img
              src="/assets/image/Navbar/logo3.png"
              className="cursor-pointer"
              //  layout="fill"
              //  objectFit="contain"
            />
          </Link>
          {/* </div> */}
          {/* <div classNameName="relative w-10 h-10 lg:hidden flex-shrink-0">
        <Image
          src="/assets/image/logo-icon.webp"
          layout="fill"
          objectFit="contain"
        />
      </div> */}
          {/* Search */}
          <div className="flex-1 flex items-center justify-center px-16 lg:ml-12">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-sm leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          {/* Icons */}
          <div className="flex items-center justify-end space-x-5">
            <Link href="/">
              <div className=" cursor-pointer">
                <svg
                  aria-label="Home"
                  className="_8-yf5 "
                  fill="#262626"
                  height="22"
                  viewBox="0 0 24 24"
                  width="22"
                >
                  <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
                </svg>
              </div>
            </Link>
            <div className=" cursor-pointer">
              <span className="relative ">
                <svg
                  aria-label="Direct"
                  fill="#262626"
                  height="24"
                  color="#262626"
                  viewBox="0 0 24 24"
                  width="24"
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
                <span className="absolute -top-0 left-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  1
                </span>
              </span>
            </div>
            <div
              className=" cursor-pointer"
              onClick={() => setIsCreatePostModalOpen(!isCreatePostModalOpen)}
            >
              <svg
                aria-label="Create Post"
                className=" h-6 w-6"
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
            <div className=" cursor-pointer">
              <svg
                aria-label="Find People"
                fill="#262626"
                color="#262626"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <polygon
                  fill="none"
                  points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={2}
                ></polygon>
                <polygon
                  fillRule="evenodd"
                  points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                  stroke="currentColor"
                  strokeLinejoin="round"
                ></polygon>
                <circle
                  cx={12.001}
                  cy={12.005}
                  fill="none"
                  strokeWidth={2}
                  r={10.5}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
              </svg>
            </div>
            <div className=" cursor-pointer">
              <svg
                aria-label="Notifications"
                fill="#262626"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
              </svg>
            </div>
            <div className=" cursor-pointer">
              <div className="flex relative w-8 h-8 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">
                <img
                  className="rounded-full"
                  alt="Profile Picture"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreatePostModal
        shown={isCreatePostModalOpen}
        close={() => {
          setIsCreatePostModalOpen(false);
        }}
      ></CreatePostModal>
    </>
  );
};
