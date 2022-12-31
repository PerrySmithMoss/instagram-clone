import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { IUserData } from "../types/userData";
import { useAuth } from "./AuthContext";

interface IUserDataContext {
  userData: IUserData;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
}

const UserDataContext = createContext<IUserDataContext>({} as IUserDataContext);

export const UserDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<IUserData>({} as IUserData);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = async () => {
    if (user) {
      const docRef = doc(db, `users/${user.uid}`);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data as IUserData);
        setLoading(false);
      } else {
        setLoading(false);
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {loading ? null : children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
