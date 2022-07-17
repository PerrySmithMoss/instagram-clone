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
  doc,
  getDocs,
  query,
  where,
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

      await addDoc(usersCollectionRef, {
        uid: user.uid,
        displayName: userDetails.username,
        email: user.email,
        profilePicture: null,
        fullName: userDetails.fullName,
        username: null,
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
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

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logOut, signUpWithGoogle, signUpWithFacebook }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
