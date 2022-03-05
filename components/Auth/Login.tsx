import React, { useState } from "react";
import AuthStyles from "./auth.module.css";
interface ILoginProps {
  providers: any;
}

export const Login: React.FC<ILoginProps> = ({ providers }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-row flex-grow justify-center items-center  ">
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
        <div className="flex flex-grow justify-center mt-4 max-w-sm">
          <div>
            <div className="flex justify-center">
              <img
                src="/assets/image/Navbar/logo3.png"
                className="cursor-pointer w-36 h-auto"
              />
            </div>
            <div className="mt-8">
              <form method="post">
                <div>
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
                <div className="pt-1.5">
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
                <div className="py-3">
                  <button
                    disabled={!emailInput && !passwordInput}
                    className={
                      emailInput.length > 0 && passwordInput.length > 0
                        ? `bg-blue-400 rounded-sm  w-full text-white py-0.5`
                        : ` cursor-default bg-blue-400 opacity-50 rounded-sm  w-full text-white py-0.5`
                    }
                  >
                    Log in
                  </button>
                </div>
                <div className="flex justify-center">
                  <span className="text-gray-500 font-medium text-sm">OR</span>
                </div>
                <div className="flex justify-center">
                  <span className="text-blue-900 font-medium">
                    Log in with Facebook
                  </span>
                </div>
                <div className="flex justify-center">
                  <span className="text-blue-900 text-xs">
                    Forgot password?
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <span className="text-sm text-gray-400">@PerrySmithMoss</span> */}
    </div>
  );
};

const images = ["/assets/image/Login/instagram-app-image1.jpeg"];
