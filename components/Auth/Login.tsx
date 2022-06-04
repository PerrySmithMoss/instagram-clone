import Link from "next/link";
import React, { useState } from "react";
import AuthStyles from "./auth.module.css";
import { signIn } from "next-auth/react"

interface ILoginProps {
  providers: any;
}

export const Login: React.FC<ILoginProps> = ({ providers }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <div className=" items-stretch flex shrink-0 m-0 p-0 relative h-full">
      <section className=" min-h-screen overflow-hidden flex flex-col grow">
        <main className="bg-[#fafafa] grow order-4 flex">
          <article className="flex flex-row flex-grow justify-center items-center mt-[32px] mx-auto mb-0 max-w-[935px] w-full pb-[32px]">
            <div className={AuthStyles.authLoginImageWrapper}>
              <div className={AuthStyles.authLoginImageContainer}>
                {images.map((image: string, index) => (
                  <img
                    key={index}
                    className={AuthStyles.authLoginImage}
                    src={image}
                    alt="Instagram app on iPhone"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col flex-grow justify-center items-center content-center mt-4 max-w-sm  pb-5">
              <div className={`${AuthStyles.formBorder} max-w-sm w-full pt-4`}>
                <div className="flex justify-center mx-auto my-6">
                  <svg
                    width="175"
                    height="51"
                    viewBox="0 0 175 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0067 0.17882C5.4249 1.71908 1.4873 6.07052 0.24368 11.5325C-1.33127 18.453 5.22283 21.3796 5.7604 20.4199C6.39311 19.2924 4.58598 18.9113 4.214 15.3204C3.73324 10.6828 5.83195 5.50071 8.47324 3.22695C8.96421 2.80451 8.94086 3.39248 8.94086 4.48004C8.94086 6.42486 8.83626 23.8836 8.83626 27.5272C8.83626 32.4575 8.63803 34.0145 8.28202 35.5528C7.92131 37.1119 7.3414 38.1654 7.78082 38.5712C8.27177 39.025 10.3679 37.9454 11.5814 36.2055C13.0366 34.1187 13.546 31.6124 13.6374 28.8909C13.7479 25.6099 13.7432 20.404 13.7479 17.4347C13.7523 14.7111 13.7926 6.73635 13.7014 1.94218C13.6791 0.766264 10.5046 -0.46744 9.00653 0.177389L9.0067 0.17882ZM136.196 23.2524C136.081 25.8156 135.529 27.8191 134.843 29.2321C133.516 31.9679 130.763 32.8173 129.594 28.8846C128.957 26.7408 128.927 23.1606 129.385 20.1691C129.851 17.1214 131.153 14.8199 133.309 15.0274C135.435 15.2326 136.431 18.0475 136.196 23.2524ZM100.349 39.1548C100.32 43.4137 99.6678 47.1478 98.2687 48.2324C96.2842 49.7701 93.617 48.6165 94.1692 45.5089C94.658 42.7589 96.969 39.9505 100.355 36.5187C100.355 36.5187 100.362 37.3014 100.349 39.1548H100.349ZM99.807 23.2276C99.6857 25.562 99.0966 27.9074 98.4538 29.2324C97.1272 31.9681 94.3537 32.8234 93.2043 28.8848C92.4186 26.194 92.6066 22.7112 92.9955 20.5168C93.5002 17.6696 94.7232 15.028 96.9195 15.028C99.0551 15.028 100.108 17.4349 99.807 23.2278V23.2276ZM79.0406 23.1917C78.9105 25.6644 78.4409 27.7312 77.6875 29.2324C76.3244 31.9493 73.6274 32.811 72.4379 28.8848C71.5804 26.0539 71.8723 22.1936 72.2291 20.1084C72.7583 17.014 74.0839 14.8201 76.1531 15.028C78.2788 15.2414 79.312 18.0478 79.0406 23.192V23.1917ZM174.208 26.0798C173.689 26.0798 173.452 26.6301 173.255 27.5562C172.575 30.7766 171.86 31.5037 170.938 31.5037C169.907 31.5037 168.981 29.909 168.743 26.717C168.556 24.2071 168.587 19.5861 168.826 14.9897C168.875 14.0451 168.621 13.1108 166.155 12.1906C165.094 11.7947 163.552 11.2119 162.784 13.1163C160.614 18.4963 159.765 22.7675 159.566 24.5026C159.555 24.5925 159.448 24.6107 159.429 24.401C159.302 23.0113 159.018 20.4859 158.982 15.1801C158.976 14.1448 158.762 13.2636 157.65 12.5422C156.928 12.0741 154.737 11.2462 153.947 12.2312C153.264 13.0366 152.472 15.2044 151.649 17.7742C150.981 19.8628 150.515 21.2757 150.515 21.2757C150.515 21.2757 150.524 15.6402 150.532 13.5026C150.535 12.6963 149.997 12.4276 149.834 12.3788C149.104 12.1608 147.664 11.797 147.053 11.797C146.299 11.797 146.114 12.2298 146.114 12.8609C146.114 12.9435 145.995 20.2805 145.995 25.4106C145.995 25.6335 145.995 25.8767 145.997 26.135C145.58 28.493 144.228 31.6939 142.756 31.6939C141.284 31.6939 140.589 30.3555 140.589 24.2396C140.589 20.6714 140.693 19.1201 140.744 16.5394C140.774 15.053 140.832 13.9117 140.828 13.6527C140.818 12.8582 139.481 12.458 138.858 12.31C138.233 12.1608 137.69 12.103 137.266 12.1277C136.666 12.1627 136.241 12.5672 136.241 13.1235C136.241 13.422 136.244 13.9893 136.244 13.9893C135.471 12.741 134.227 11.8723 133.4 11.6206C131.172 10.9407 128.846 11.5431 127.092 14.0647C125.698 16.0684 124.857 18.3374 124.527 21.5978C124.285 23.9812 124.364 26.3983 124.793 28.4424C124.274 30.7489 123.31 31.6939 122.254 31.6939C120.722 31.6939 119.611 29.1238 119.74 24.6795C119.825 21.7562 120.394 19.7046 121.017 16.7366C121.282 15.4716 121.067 14.8092 120.526 14.1743C120.03 13.5921 118.973 13.2947 117.453 13.6604C116.371 13.9212 114.824 14.2018 113.408 14.4172C113.408 14.4172 113.494 14.0672 113.564 13.45C113.932 10.2126 110.508 10.4753 109.415 11.5092C108.763 12.1266 108.319 12.8545 108.151 14.1636C107.884 16.2411 109.533 17.2208 109.533 17.2208C108.992 19.7655 107.665 23.0896 106.296 25.4928C105.563 26.7806 105.001 27.7346 104.277 28.7488C104.275 28.3711 104.273 27.9936 104.271 27.6177C104.255 22.2679 104.324 18.0575 104.355 16.5398C104.384 15.0535 104.442 13.9423 104.439 13.6833C104.431 13.1024 104.101 12.8829 103.414 12.6051C102.806 12.3595 102.088 12.1894 101.343 12.1302C100.403 12.0548 99.8366 12.5672 99.8514 13.1728C99.8543 13.2872 99.8543 13.9895 99.8543 13.9895C99.0811 12.7413 97.8374 11.8726 97.0101 11.6208C94.7815 10.9412 92.4559 11.5437 90.7019 14.0649C89.3081 16.0686 88.3951 18.8799 88.1366 21.5733C87.8955 24.0832 87.9402 26.2162 88.2685 28.0132C87.9141 29.8126 86.8953 31.6941 85.7434 31.6941C84.2705 31.6941 83.4326 30.3558 83.4326 24.2398C83.4326 20.6716 83.5369 19.1203 83.5882 16.5398C83.6178 15.0535 83.6752 13.9119 83.6719 13.6531C83.6611 12.8589 82.3241 12.4584 81.7021 12.3102C81.0511 12.1556 80.489 12.0986 80.0575 12.1313C79.4881 12.1749 79.0879 12.6986 79.0879 13.0893V13.9895C78.3145 12.7413 77.071 11.8726 76.2437 11.6208C74.0151 10.9412 71.7026 11.5533 69.9354 14.0649C68.7831 15.7027 67.8504 17.5182 67.3702 21.5374C67.2315 22.6989 67.1701 23.7865 67.178 24.8032C66.7186 27.6901 64.6891 31.0175 63.0291 31.0175C62.0575 31.0175 61.1324 29.0816 61.1324 24.9562C61.1324 19.4611 61.4634 11.6368 61.5195 10.8828C61.5195 10.8828 63.617 10.8462 64.0232 10.8413C65.0694 10.8295 66.0171 10.8549 67.4105 10.7817C68.1096 10.7451 68.7828 8.16808 68.0614 7.84915C67.7346 7.7048 65.4238 7.57834 64.5077 7.55837C63.7375 7.54043 61.5931 7.3774 61.5931 7.3774C61.5931 7.3774 61.7855 2.18411 61.8301 1.6355C61.8682 1.17826 61.2923 0.942845 60.9622 0.799996C60.1593 0.451102 59.4407 0.284055 58.5891 0.103706C57.4127 -0.145627 56.8789 0.0982579 56.7748 1.11834C56.6177 2.66648 56.5364 7.20098 56.5364 7.20098C55.6731 7.20098 52.724 7.0276 51.8605 7.0276C51.058 7.0276 50.192 10.5726 51.3012 10.6162C52.5777 10.667 54.8019 10.7109 56.2763 10.7566C56.2763 10.7566 56.2107 18.7097 56.2107 21.1649C56.2107 21.4262 56.2129 21.6777 56.2134 21.9219C55.4018 26.2673 52.5435 28.6145 52.5435 28.6145C53.1573 25.7398 51.9034 23.581 49.6447 21.7535C48.8126 21.0802 47.17 19.8054 45.3318 18.4082C45.3318 18.4082 46.3964 17.3305 47.3403 15.162C48.0094 13.6259 48.0383 11.868 46.3964 11.4805C43.6835 10.8396 41.4467 12.8863 40.7794 15.0714C40.2626 16.7643 40.5383 18.0203 41.551 19.3251C41.6248 19.4204 41.705 19.518 41.7879 19.6159C41.1754 20.8285 40.3342 22.461 39.6216 23.7272C37.644 27.2423 36.1501 30.0225 35.021 30.0225C34.1184 30.0225 34.1305 27.1998 34.1305 24.5569C34.1305 22.2785 34.2943 18.8532 34.4251 15.3066C34.4684 14.1337 33.8974 13.4656 32.9405 12.8604C32.3591 12.4927 31.1182 11.7697 30.3994 11.7697C29.3236 11.7697 26.22 11.9202 23.2874 20.6349C22.9178 21.7333 22.1917 23.7347 22.1917 23.7347L22.2542 13.255C22.2542 13.0091 22.127 12.7717 21.8353 12.6092C21.341 12.3336 20.0212 11.7697 18.8475 11.7697C18.2882 11.7697 18.0094 12.0369 18.0094 12.5694L17.9069 28.9652C17.9069 30.2109 17.9385 31.6644 18.0585 32.3C18.178 32.9363 18.3713 33.454 18.6111 33.7621C18.8504 34.0697 19.1272 34.3041 19.5837 34.4008C20.0084 34.4907 22.3347 34.7976 22.4555 33.8844C22.6005 32.7898 22.606 31.6061 23.8275 27.191C25.729 20.3175 28.2084 16.9636 29.374 15.7726C29.5777 15.5644 29.8104 15.5519 29.7993 15.8927C29.7494 17.3997 29.5744 21.1653 29.4566 24.3644C29.1409 32.9258 30.6571 34.5125 32.8234 34.5125C34.481 34.5125 36.8174 32.8207 39.322 28.538C40.8833 25.8689 42.3995 23.2521 43.4886 21.366C44.2478 22.0879 45.0996 22.8649 45.9509 23.6948C47.9292 25.6236 48.5786 27.4566 48.1477 29.1951C47.818 30.5244 46.5767 31.8943 44.3676 30.5628C43.7237 30.1744 43.4488 29.8743 42.8014 29.4364C42.4536 29.201 41.9224 29.1309 41.604 29.3772C40.777 30.018 40.3039 30.8329 40.0339 31.8417C39.7712 32.8234 40.7281 33.3424 41.7203 33.7963C42.5745 34.187 44.4104 34.5409 45.5813 34.5813C50.1432 34.7379 53.7979 32.3184 56.342 26.0769C56.7974 31.4671 58.7354 34.5173 62.1028 34.5173C64.3542 34.5173 66.6112 31.528 67.5983 28.587C67.8818 29.7858 68.3011 30.8281 68.8427 31.7098C71.4374 35.9333 76.4711 35.0242 78.9997 31.4379C79.7815 30.3297 79.9004 29.9315 79.9004 29.9315C80.2691 33.3178 82.9237 34.5012 84.4435 34.5012C86.1458 34.5012 87.9035 33.6745 89.1353 30.8254C89.2796 31.1346 89.4372 31.4299 89.6093 31.7098C92.204 35.9331 97.2377 35.0242 99.7661 31.4379C99.8854 31.2694 99.9888 31.1169 100.079 30.98L100.153 33.2043C100.153 33.2043 98.711 34.5636 97.8254 35.3976C93.9286 39.0706 90.9653 41.8572 90.7474 45.1024C90.4675 49.2403 93.7341 50.778 96.2056 50.9795C98.8299 51.1936 101.077 49.704 102.459 47.6198C103.674 45.7852 104.469 41.8363 104.411 37.9365C104.388 36.3748 104.349 34.389 104.319 32.2605C105.689 30.6263 107.232 28.5611 108.653 26.1436C110.202 23.5091 111.861 19.9711 112.711 17.2176C112.711 17.2176 114.153 17.2304 115.691 17.1271C116.184 17.0939 116.325 17.1972 116.234 17.5679C116.124 18.0158 114.29 25.2837 115.964 30.1254C117.11 33.4397 119.693 34.5062 121.224 34.5062C123.017 34.5062 124.732 33.1154 125.651 31.0501C125.761 31.2803 125.877 31.5032 126.004 31.7089C128.598 35.9322 133.614 35.0178 136.16 31.4369C136.735 30.6288 137.061 29.9304 137.061 29.9304C137.607 33.4352 140.261 34.518 141.78 34.518C143.363 34.518 144.865 33.8513 146.084 30.8885C146.135 32.1931 146.215 33.2597 146.342 33.5959C146.419 33.8016 146.869 34.0599 147.196 34.1845C148.644 34.7361 150.121 34.4753 150.667 34.3618C151.046 34.283 151.341 33.9711 151.381 33.1655C151.487 31.0504 151.422 27.4965 152.047 24.8554C153.094 20.4228 154.072 18.7036 154.535 17.8523C154.795 17.3754 155.088 17.2966 155.098 17.8015C155.12 18.8227 155.169 21.8218 155.575 25.8512C155.873 28.8149 156.272 30.5664 156.578 31.121C157.451 32.7063 158.53 32.7812 159.408 32.7812C159.967 32.7812 161.135 32.6228 161.031 31.6138C160.98 31.1221 161.069 28.0831 162.102 23.7161C162.777 20.8643 163.901 18.2877 164.307 17.3457C164.456 16.9984 164.526 17.2721 164.524 17.3255C164.438 19.2894 164.246 25.7132 165.025 29.2264C166.081 33.9857 169.135 34.5182 170.199 34.5182C172.471 34.5182 174.329 32.7429 174.955 28.0713C175.106 26.9472 174.883 26.0789 174.214 26.0789"
                      fill="#262626"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <form method="post">
                    <div className=" mx-10">
                      <input
                        className={`border text-xs bg-gray-50 appearance-none rounded w-full pl-2 py-2 focus:border-gray-400 focus:outline-none active:outline-none active:border-gray-400 autofocus`}
                        type="text"
                        aria-label="email"
                        placeholder="Email"
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
                    </div>
                    <div className="pt-1.5 mx-10">
                      <input
                        className={`border text-xs bg-gray-50 appearance-none rounded w-full pl-2 py-2 focus:border-gray-400 focus:outline-none active:outline-none active:border-gray-400 autofocus`}
                        aria-label="password"
                        autoCapitalize="off"
                        aria-required={true}
                        placeholder="Password"
                        autoCorrect="off"
                        value={passwordInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPasswordInput(e.target.value)
                        }
                        type="password"
                        autoFocus
                        name="password"
                      />
                    </div>
                    <div className="py-3 mx-10">
                      <button
                        disabled={!emailInput && !passwordInput}
                        className={
                          emailInput.length > 0 && passwordInput.length > 0
                            ? `bg-[#0095f6] rounded-sm text-sm  w-full text-white py-1.5`
                            : ` cursor-default bg-[#0095f6] opacity-[0.32] rounded-sm text-sm  w-full text-white py-1.5`
                        }
                      >
                        Log in
                      </button>
                    </div>
                    <div
                      className={`${AuthStyles.orSeperator} flex justify-center text-center items-center mx-10 mt-2`}
                    >
                      <span className="text-gray-500 px-3 font-medium text-sm">
                        OR
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-2 pt-4">
                      <div>
                        <a onClick={() => signIn("facebook")} className="flex cursor-pointer items-center space-x-2">
                          <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            height={16}
                            width={16}
                            fill="#475993"
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

                          <span className="text-blue-900 font-medium">
                            Log in with Facebook
                          </span>
                        </a>
                        <a onClick={() => signIn("google")} className="flex cursor-pointer items-center space-x-2 mt-3">
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

                          <span className="text-blue-900 font-medium">
                            Log in with Google
                          </span>
                        </a>
                      </div>
                    </div>
                    <a className="flex justify-center pt-4 pb-5">
                      <span className="cursor-pointer text-blue-900 text-[13px]">
                        Forgot password?
                      </span>
                    </a>
                  </form>
                </div>
              </div>
              <div className={`${AuthStyles.formBorder} max-w-sm w-full mt-4`}>
                <div className="flex justify-center py-5">
                  <p className=" text-sm text-[#262626]">
                    Don't have an account?{" "}
                    <span className="text-[#0095f6] font-semibold">
                      Sign up
                    </span>
                  </p>
                </div>
              </div>
              <div className="max-w-sm w-full mt-5">
                <div className="flex justify-center text-sm">
                  <p>Get the app.</p>
                </div>
                <div className="flex justify-center space-x-2 mt-4 mx-10">
                  <div>
                    <a
                      target="_blank"
                      href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo"
                    >
                      <img
                        className="h-10"
                        src="/assets/image/Login/download-app.png"
                        alt="Download from Apple App Store"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D8146E8C7-CD43-4F34-AC25-D96B41D52CB1%26utm_content%3Dlo%26utm_medium%3Dbadge"
                    >
                      <img
                        className=" h-10"
                        src="/assets/image/Login/download-app2.png"
                        alt="Download from Google Play Store"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>
        <footer className="order-5 py-0 px-5 items-stretch flex flex-col shrink-0 m-0 relative bg-[#fafafa]">
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
      </section>
    </div>
  );
};

const images = [
  "/assets/image/Login/image1.png",
  "/assets/image/Login/image2.png",
  "/assets/image/Login/image3.png",
  "/assets/image/Login/image4.png",
];
