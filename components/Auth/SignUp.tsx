import Link from "next/link";
import React, { useState } from "react";
import AuthStyles from "./auth.module.css";
import { Brand, DemoAccountNotice } from "../SiteIdentity";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

export const SignUp: React.FC = () => {
  const { signUp, signUpWithGoogle, signUpWithFacebook } = useAuth();
  const [userInputDetails, setUserInputDetails] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [signUpMessage, setSignUpMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputDetails({
      ...userInputDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isSubmitting ||
      !userInputDetails.email.trim() ||
      !userInputDetails.fullName.trim() ||
      !userInputDetails.username.trim() ||
      !userInputDetails.password
    )
      return;
    setSignUpMessage("");
    setIsSubmitting(true);

    try {
      const signUpRes = await signUp({
        ...userInputDetails,
        email: userInputDetails.email.trim(),
      });
      if (signUpRes.error) setSignUpMessage(signUpRes.action);
      else await router.push("/");
    } catch {
      setSignUpMessage("Could not create your demo account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSignUpMessage("");
    setIsSubmitting(true);

    try {
      await signUpWithGoogle();

      router.push("/");
    } catch {
      setSignUpMessage("Could not sign up with Google. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpWithFacebook = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSignUpMessage("");
    setIsSubmitting(true);

    try {
      await signUpWithFacebook();

      router.push("/");
    } catch {
      setSignUpMessage("Could not sign up with Facebook. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" items-stretch flex shrink-0 m-0 p-0 relative h-full">
      <section className=" min-h-[70vh] flex flex-col grow">
        <main className="bg-[#fafafa] grow order-4 flex">
          <article className="flex flex-row grow justify-center items-center mt-[24px] mx-auto mb-0 px-4 max-w-[935px] w-full pb-[32px]">
            <div className="flex flex-col grow justify-center items-center content-center mt-4 max-w-sm  pb-5">
              <div className={`${AuthStyles.formBorder} max-w-sm w-full pt-4`}>
                <div className="flex justify-center mx-auto mt-6 mb-3">
                  <Brand />
                </div>
                <DemoAccountNotice />
                <div>
                  <h2 className="mx-9 text-[#8e8e8e] font-semibold text-[17px] text-center">
                    Create your Photo Journal demo account.
                  </h2>
                </div>
                <div className="py-3 mx-10">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={(e) => handleSignUpWithFacebook(e)}
                    className="flex cursor-pointer items-center shadow-sm rounded-xs space-x-2 hover:shadow-md bg-[#0f766e] w-full justify-center text-white py-1.5"
                  >
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      height={16}
                      width={16}
                      fill="white"
                      viewBox="0 0 408.788 408.788"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M353.701,0H55.087C24.665,0,0.002,24.662,0.002,55.085v298.616c0,30.423,24.662,55.085,55.085,55.085
	h147.275l0.251-146.078h-37.951c-4.932,0-8.935-3.988-8.954-8.92l-0.182-47.087c-0.019-4.959,3.996-8.989,8.955-8.989h37.882
	v-45.498c0-52.8,32.247-81.55,79.348-81.55h38.65c4.945,0,8.955,4.009,8.955,8.955v39.704c0,4.944-4.007,8.952-8.95,8.955
	l-23.719,0.011c-25.615,0-30.575,12.172-30.575,30.035v39.389h56.285c5.363,0,9.524,4.683,8.892,10.009l-5.581,47.087
	c-0.534,4.506-4.355,7.901-8.892,7.901h-50.453l-0.251,146.078h87.631c30.422,0,55.084-24.662,55.084-55.084V55.085
	C408.786,24.662,384.124,0,353.701,0z"
                      />
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

                    <span className="text-sm font-semibold">
                      Sign up with Facebook
                    </span>
                  </button>
                </div>
                <div className="pb-3 mx-10">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={(e) => handleSignUpWithGoogle(e)}
                    className="flex cursor-pointer items-center hover:shadow-md rounded-xs space-x-2 outline-hidden text-gray-600 w-full justify-center shadow-sm py-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={19}
                      width={19}
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>

                    <span className="text-sm font-semibold">
                      Sign up with Google
                    </span>
                  </button>
                </div>
                <div
                  className={`${AuthStyles.orSeperator} flex justify-center text-center items-center mx-10 mb-5`}
                >
                  <span className="text-gray-500 px-3 font-medium text-sm">
                    OR
                  </span>
                </div>
                <div className="w-full">
                  <form onSubmit={handleSignUp}>
                    <div className=" mx-10">
                      <input
                        className={`border text-xs bg-gray-50 appearance-none rounded-sm w-full pl-2 py-2 focus:border-gray-400 focus:outline-hidden active:outline-hidden active:border-gray-400 autofocus`}
                        type="email"
                        autoComplete="email"
                        aria-label="email"
                        placeholder="Email"
                        aria-required={true}
                        maxLength={100}
                        name="email"
                        value={userInputDetails.email}
                        onChange={onFormChange}
                        autoCapitalize="off"
                        autoCorrect="off"
                      />
                    </div>
                    <div className="pt-1.5 mx-10">
                      <input
                        className={`border text-xs bg-gray-50 appearance-none rounded-sm w-full pl-2 py-2 focus:border-gray-400 focus:outline-hidden active:outline-hidden active:border-gray-400 autofocus`}
                        aria-label="display name"
                        aria-required={true}
                        placeholder="Display name"
                        maxLength={100}
                        autoCorrect="off"
                        value={userInputDetails.fullName}
                        onChange={onFormChange}
                        type="text"
                        name="fullName"
                      />
                    </div>
                    <div className="pt-1.5 mx-10">
                      <input
                        className={`border text-xs bg-gray-50 appearance-none rounded-sm w-full pl-2 py-2 focus:border-gray-400 focus:outline-hidden active:outline-hidden active:border-gray-400 autofocus`}
                        aria-label="username"
                        autoCapitalize="off"
                        aria-required={true}
                        maxLength={100}
                        placeholder="Username"
                        autoCorrect="off"
                        value={userInputDetails.username}
                        onChange={onFormChange}
                        type="text"
                        name="username"
                      />
                    </div>
                    <div className="pt-1.5 mx-10">
                      <input
                        className={`border text-xs bg-gray-50 appearance-none rounded-sm w-full pl-2 py-2 focus:border-gray-400 focus:outline-hidden active:outline-hidden active:border-gray-400 autofocus`}
                        aria-label="password"
                        maxLength={100}
                        autoCapitalize="off"
                        aria-required={true}
                        placeholder="Password"
                        autoCorrect="off"
                        value={userInputDetails.password}
                        onChange={onFormChange}
                        type="password"
                        autoComplete="new-password"
                        name="password"
                      />
                    </div>
                    {signUpMessage && (
                      <p role="alert" className="mt-1 text-red-500 mx-10">
                        {signUpMessage}
                      </p>
                    )}
                    <div className="py-3 mx-10">
                      <button
                        type="submit"
                        disabled={
                          isSubmitting ||
                          !userInputDetails.email.trim() ||
                          !userInputDetails.fullName.trim() ||
                          !userInputDetails.username.trim() ||
                          !userInputDetails.password
                        }
                        className={
                          userInputDetails.email.length > 0 &&
                          userInputDetails.fullName.length > 0 &&
                          userInputDetails.password.length > 0 &&
                          userInputDetails.username.length > 0
                            ? `bg-[#0f766e] rounded-xs text-sm  w-full text-white py-1.5`
                            : ` cursor-default bg-[#0f766e] opacity-[0.32] rounded-xs text-sm  w-full text-white py-1.5`
                        }
                      >
                        {isSubmitting ? "Creating account…" : "Sign up"}
                      </button>
                    </div>
                  </form>
                  <p className="mx-9 mb-5 text-center text-sm leading-5 text-slate-600">
                    This creates a Photo Journal account. Read how this demo
                    handles accounts and data on the{" "}
                    <Link
                      href="/about"
                      className="font-semibold text-teal-800 underline"
                    >
                      about page
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className={`${AuthStyles.formBorder} max-w-sm w-full mt-4`}>
                <div className="flex justify-center py-5">
                  <p className=" text-sm text-[#262626]">
                    Have an account?{" "}
                    <Link href="/" className="contents">
                      <span className="cursor-pointer text-[#0f766e] hover:text-teal-800 font-semibold">
                        Log in
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </main>
      </section>
    </div>
  );
};
