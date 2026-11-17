import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../../../components/Navbar/Navbar";
import AuthStyles from "../../../components/Auth/auth.module.css";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";
import { DemoAccountNotice } from "../../../components/SiteIdentity";

const ResetPasswordPage: NextPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [resetError, setResetError] = useState("");
  const { sendPasswordResetLink } = useAuth();
  const [showPasswordResetLinkSuccess, setShowPasswordResetLinkSuccess] =
    useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput.trim() || isSending) return;
    setResetError("");
    setIsSending(true);
    try {
      await sendPasswordResetLink(emailInput.trim());
      setEmailInput("");
      setShowPasswordResetLinkSuccess(true);
    } catch {
      setResetError("Could not send a reset link. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gray-50 ">
      <Head>
        <title>Reset Password | Photo Journal</title>
      </Head>
      <Navbar />
      <section className="flex justify-center min-h-[70vh] py-8">
        <main className="flex flex-col">
          <div className="w-full relative px-3 max-w-[500px] my-0 mx-auto grow shrink-0 flex flex-col items-stretch py-0">
            <DemoAccountNotice />
            <div className="flex flex-col items-stretch content-center justify-start relative border rounded-xs bg-white">
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
                      If an account exists for that address, you will receive a
                      password reset link.
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
                      Enter the email address for your Photo Journal account to
                      request a password reset link. This cannot reset an
                      Instagram password.
                    </p>
                  </div>
                  <div className="my-2 mt-3 flex justify-center w-full">
                    <form
                      method="post"
                      className="w-full mx-16"
                      onSubmit={(e) => handleResetPassword(e)}
                    >
                      <input
                        className={`border bg-gray-50 appearance-none rounded-sm w-full pl-2 py-2 focus:border-gray-400 focus:outline-hidden active:outline-hidden active:border-gray-400 autofocus`}
                        type="email"
                        required
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
                          disabled={!emailInput.trim() || isSending}
                          className={
                            emailInput.length > 0
                              ? `bg-[#0f766e] rounded-sm text-sm  w-full text-white py-2`
                              : `cursor-default bg-[#0f766e] opacity-[0.50] rounded-sm text-sm  w-full text-white py-1.5`
                          }
                        >
                          {isSending ? "Sending…" : "Send reset link"}
                        </button>
                      </div>
                      {resetError && (
                        <p role="alert" className="mt-3 text-sm text-red-600">
                          {resetError}
                        </p>
                      )}
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
                    <Link href={"/sign-up"} className="font-semibold text-sm">
                      Create new account
                    </Link>
                  </div>
                  <div className="flex justify-center p-3 border-t bg-[#FAFAFA]">
                    <Link
                      href={"/"}
                      className="text-[#262626] text-sm font-semibold"
                    >
                      Back to login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
