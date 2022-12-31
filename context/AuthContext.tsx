import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

interface IUserDetails {
  email: string;
  fullName: string;
  username: string;
  password: string;
}
interface IAuthContext {
  user: User | null;
  signUp: (userDetails: IUserDetails) => Promise<
    | {
        error: boolean;
        messsge: string;
        action: string;
        message?: undefined;
      }
    | {
        error: boolean;
        message: any;
        action: any;
        messsge?: undefined;
      }
  >;
  logInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
  signUpWithFacebook: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (userDetails: IUserDetails) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userDetails.email as string,
        userDetails.password as string
      );

      const user = res.user;

      if (user) {
        await updateProfile(user, { displayName: userDetails.username });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: userDetails.username,
          email: user.email,
          profilePicture: null,
          fullName: userDetails.fullName,
          username: userDetails.username,
          following: ["9apvkdI9ZhSm8Ot1NignmKlicR93"], // so user's have default posts on their feed. User can unfollow at anmy time.
          followers: [],
        });

        return {
          error: false,
          message: "Success",
          action: "User created successfully.",
        };
      } else {
        return {
          error: true,
          message: "Unsuccessfull",
          action: "Could not create user with specified email/password.",
        };
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.error("That email address is already in use!");

        return {
          error: true,
          message: "auth/email-already-in-use",
          action: "Email address in use, please use another one.",
        };
      } else if (error.code === "auth/invalid-email") {
        console.error("That email address is invalid!");

        return {
          error: true,
          messsge: "auth/invalid-email",
          action: "Invalid email, please use another one.",
        };
      } else {
        console.error(error);

        return {
          error: true,
          message: error,
          action: error,
        };
      }
    }
  };

  const signUpWithGoogle = async () => {
    const googleAuthProvider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, googleAuthProvider);

    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
      fullName: user.displayName,
      username: null,
      following: ["9apvkdI9ZhSm8Ot1NignmKlicR93"],
      followers: [],
    }).then((data) => {
      console.log("User created successfully");
    });
  };

  const signUpWithFacebook = async () => {
    const facebookAuthProvider = new FacebookAuthProvider();

    const res = await signInWithPopup(auth, facebookAuthProvider);

    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
      fullName: user.displayName,
      username: null,
      following: ["9apvkdI9ZhSm8Ot1NignmKlicR93"],
      followers: [],
    }).then((data) => {
      console.log("User created successfully");
    });
  };

  const logInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logInWithEmailAndPassword,
        logOut,
        signUpWithGoogle,
        signUpWithFacebook,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
