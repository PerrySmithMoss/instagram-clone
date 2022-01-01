import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  faPaperPlane,
  faPlusSquare,
  faCompass,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";

interface INavbarProps {}

export const Navbar: React.FC<INavbarProps> = ({}) => {
  return (
    <div className="shadow-sm bg-white border-b sticky top-0 z-50">
      <div className="flex justify-between items-center content-center max-w-6xl mx-6 pt-3 pb-3 xl:mx-auto">
        {/* Logo */}
        {/* <div className="relative w-32 h-10 cursor-pointer"> */}
        <img
          src="/assets/image/Navbar/logo3.png"
          //  layout="fill"
          //  objectFit="contain"
        />
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        {/* Icons */}
        <div className="flex items-center justify-end space-x-5">
          {/* <FontAwesomeIcon
          color="black"
          size="2x"
          icon={faHome}
          className="pl-1"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          color="black"
          size="2x"
          icon={faPaperPlane}
          className="pl-1"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          color="black"
          size="2x"
          icon={faPlusSquare}
          className="pl-1"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          color="black"
          size="2x"
          icon={faCompass}
          className="pl-1"
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          color="black"
          size="2x"
          icon={faHeart}
          className="pl-1"
        ></FontAwesomeIcon> */}
          <div className="home-icon">
            <svg
              aria-label="Home"
              className="_8-yf5 "
              fill="#262626"
              height="22"
              viewBox="0 0 48 48"
              width="22"
            >
              <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
            </svg>
          </div>
          <div className="like-icon">
            <span className="relative ">
              <svg
                aria-label="Direct"
                className="_8-yf5 "
                fill="#262626"
                height="22"
                viewBox="0 0 48 48"
                width="22"
              >
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
              <span className="absolute -top-0 left-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                1
              </span>
            </span>
          </div>
          <div className="dm-icon">
            <svg
              aria-label="Find People"
              className="_8-yf5 "
              fill="#262626"
              height="22"
              viewBox="0 0 48 48"
              width="22"
            >
              <path
                clipRule="evenodd"
                d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="compass-icon">
            <svg
              aria-label="Activity Feed"
              className="_8-yf5 "
              fill="#262626"
              height="22"
              viewBox="0 0 48 48"
              width="22"
            >
              <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </svg>
          </div>
          <div className="profile-icon">
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
  );
};
