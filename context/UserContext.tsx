import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { User } from "../types/user";
import { useAuth } from "./AuthContext";

const UserDataContext = createContext<any>({});

export const UserDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = async () => {
    const docRef = doc(db, `users/${user.uid}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData(data);
      setLoading(false);
    } else {
      setLoading(false);
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if(user) {
        getUserData();
    }
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
      }}
    >
      {loading ? null : children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
