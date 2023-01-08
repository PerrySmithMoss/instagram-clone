import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../../../components/Navbar/Navbar";
import AuthStyles from "../../../components/Auth/auth.module.css";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";

const SuggestedPeoplePage: NextPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const { sendPasswordResetLink } = useAuth();
  const [showPasswordResetLinkSuccess, setShowPasswordResetLinkSuccess] =
    useState(false);

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailInput.length > 0) {
      setEmailInput("");
      sendPasswordResetLink(emailInput);
      setShowPasswordResetLinkSuccess(true);
    }
  };

  return (
    <div className="bg-gray-50 ">
      <Head>
        <title>Reset Password | Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section className="flex justify-center h-screen sm:py-[40px]">
        <main className="flex flex-col">
          <div className="w-full relative px-3 max-w-[500px] my-0 mx-auto flex-grow flex-shrink-0 flex flex-col items-stretch py-0">
            <div className="flex flex-col items-stretch content-center justify-start relative border rounded-sm bg-white">
              {showPasswordResetLinkSuccess ? (
                <div className="flex flex-col relative mb-5">
                  <div
                    onClick={() => setShowPasswordResetLinkSuccess(false)}
                    className="absolute cursor-pointer top-2 left-2"
                  >
                    <svg
                      stroke="currentColor"
                      fill="#262626"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="30px"
                      width="30px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
                    </svg>
                  </div>
                  <div className="flex justify-center my-4">
                    <Image
                      src="/assets/image/Login/green-tick.png"
                      alt="Lock"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex justify-center mx-10">
                    <h4 className="font-semibold text-[#262626] text-lg">
                      Success!
                    </h4>
                  </div>
                  <div className="flex justify-center mx-16 my-1">
                    <p className="text-[#8E8E8E] text-center text-[15px] leading-[19px]">
                      You have been sent a password reset link to your specified
                      email address.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col relative">
                  <div className="flex justify-center my-4">
                    <Image
                      src="/assets/image/Login/reset-password.png"
                      alt="Lock"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex justify-center mx-10">
                    <h4 className="font-semibold text-[#262626] text-lg">
                      Trouble logging in?
                    </h4>
                  </div>
                  <div className="flex justify-center mx-16 my-1">
                    <p className="text-[#8E8E8E] text-center text-[15px] leading-[19px]">
                      Enter your email, phone, or username and we&apos;ll send you a
                      link to get back into your account.
                    </p>
                  </div>
                  <div className="my-2 mt-3 flex justify-center w-full">
                    <form
                      method="post"
                      className="w-full mx-16"
                      onSubmit={(e) => handleResetPassword(e)}
                    >
                      <input
                        className={`border bg-gray-50 appearance-none rounded w-full pl-2 py-2 focus:border-gray-400 focus:outline-none active:outline-none active:border-gray-400 autofocus`}
                        type="text"
                        aria-label="email"
                        placeholder="Enter email address"
                        aria-required={true}
                        maxLength={100}
                        name="email"
                        value={emailInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmailInput(e.target.value)
                        }
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoFocus
                      />
                      <div className="flex justify-center mt-3">
                        <button
                          // onClick={(e) => handleResetPassword(e)}
                          disabled={!emailInput}
                          className={
                            emailInput.length > 0
                              ? `bg-[#0095f6] rounded text-sm  w-full text-white py-2`
                              : `cursor-default bg-[#0095f6] opacity-[0.50] rounded text-sm  w-full text-white py-1.5`
                          }
                        >
                          Send reset link
                        </button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <div
                      className={`${AuthStyles.orSeperator} flex justify-center text-center items-center mx-16 my-3`}
                    >
                      <span className="text-gray-500 px-3 font-medium text-sm">
                        OR
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-1 mb-20">
                    <Link href={"/sign-up"}>
                      <a className="font-semibold text-sm">
                        Create new account
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-center p-3 border-t bg-[#FAFAFA]">
                    <Link href={"/"}>
                      <a className="text-[#262626] text-sm font-semibold">
                        Back to login
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <footer className="px-5 items-stretch flex flex-col shrink-0 m-0 relative">
            <div className="flex text-[#8e8e8e] font-normal text-[12px] flex-grow-0 shrink-0 basis-0 items-stretch m-0 relative p-0 flex-col mb-[52px]">
              <div className="flex pb-1.5 flex-grow-0 shrink-0 basis-auto content-start flex-col items-stretch">
                <div className=" flex-wrap space-x-4 grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Meta
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        About
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Blog
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Jobs
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        API
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Privacy
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Terms
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Top Accounts
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Hashtags
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Locations
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Instagram Lite
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex grow-0 shrink-0 basis-auto justify-center flex-row items-stretch">
                <div className=" flex-wrap space-x-4  grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Dance
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Food & Drink
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Home & Garden
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Music
                      </div>
                    </a>
                  </div>
                  <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                    <a>
                      <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                        Visual Art
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className=" mt-4 mb-3 space-x-4  flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                  <a>
                    <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                      <span className="inline-block relative">
                        <div className=" items-center flex flex-row justify-center">
                          <span>English</span>
                          <div className="ml-1 flex justify-start flex-col items-stretch">
                            <span className=" inline-block rotate-180">
                              <svg
                                aria-label="Down Chevron Icon"
                                color="#8e8e8e"
                                viewBox="0 0 24 24"
                                height={12}
                                width={12}
                              >
                                <path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </a>
                </div>
                <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                  <a>
                    <div className="flex-wrap grow-0 shrink-0 basis-auto justify-center flex-row items-stretch flex">
                      @ 2022 Perry Smith-Moss
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </section>
    </div>
  );
};

export default SuggestedPeoplePage;
