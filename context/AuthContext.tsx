import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { User } from "../types/user";

const AuthContext = createContext<any>({});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("User Context: ", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          fullName: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (userDetails: User) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userDetails.email as string,
        userDetails.password as string
      );
      const user = res.user;

      const usersCollectionRef = collection(db, "users");

      const createUserRes = await addDoc(usersCollectionRef, {
        uid: user.uid,
        displayName: userDetails.username,
        email: user.email,
        profilePicture: null,
        fullName: userDetails.fullName,
        username: null,
      });

      if (createUserRes) {
        return {
          error: false,
          message: "User was created successfully",
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

    const usersCollectionRef = collection(db, "users");

    await addDoc(usersCollectionRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
      fullName: user.displayName,
      username: null,
    });
  };

  const signUpWithFacebook = async () => {
    const facebookAuthProvider = new FacebookAuthProvider();

    const res = await signInWithPopup(auth, facebookAuthProvider);

    const user = res.user;

    const usersCollectionRef = collection(db, "users");

    await addDoc(usersCollectionRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      profilePicture: user.photoURL,
      fullName: user.displayName,
      username: null,
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
