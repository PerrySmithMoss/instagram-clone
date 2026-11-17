import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
  type UserCredential,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { ensureUserProfile } from "../lib/user-profile";

interface IUserDetails {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

interface SignUpResult {
  error: boolean;
  message: string;
  action: string;
}

interface IAuthContext {
  user: User | null;
  signUp: (details: IUserDetails) => Promise<SignUpResult>;
  logInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
  signUpWithFacebook: () => Promise<void>;
  sendPasswordResetLink: (email: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      }),
    [],
  );

  const signUp = async (details: IUserDetails): Promise<SignUpResult> => {
    try {
      const { user: createdUser } = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password,
      );
      await updateProfile(createdUser, { displayName: details.username });
      await ensureUserProfile(createdUser, details);
      return {
        error: false,
        message: "Success",
        action: "User created successfully.",
      };
    } catch (error: unknown) {
      const code = error instanceof FirebaseError ? error.code : "auth/unknown";
      const action =
        code === "auth/email-already-in-use"
          ? "Email address in use, please use another one."
          : code === "auth/invalid-email"
            ? "Invalid email, please use another one."
            : "Could not create your account. Please try again.";
      return { error: true, message: code, action };
    }
  };

  const signUpWithGoogle = async () => {
    const { user: signedInUser } = await signInWithPopup(
      auth,
      new GoogleAuthProvider(),
    );
    await ensureUserProfile(signedInUser);
  };

  const signUpWithFacebook = async () => {
    const { user: signedInUser } = await signInWithPopup(
      auth,
      new FacebookAuthProvider(),
    );
    await ensureUserProfile(signedInUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logInWithEmailAndPassword: (email, password) =>
          signInWithEmailAndPassword(auth, email, password),
        logOut: () => signOut(auth),
        signUpWithGoogle,
        signUpWithFacebook,
        sendPasswordResetLink: (email) => sendPasswordResetEmail(auth, email),
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within AuthContextProvider");
  return context;
};
