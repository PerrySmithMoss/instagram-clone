import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase";
import type { IUserData } from "../types/userData";
import { useAuth } from "./AuthContext";

interface IUserDataContext {
  userData: IUserData;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
}

const emptyProfile = (uid: string): IUserData => ({
  id: uid,
  uid,
  displayName: "",
  email: "",
  fullName: "",
  username: "",
  profilePicture: "",
  followers: [],
  following: [],
});

const UserDataContext = createContext<IUserDataContext | undefined>(undefined);

export const UserDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const uid = user?.uid ?? "";
  const [profile, setProfile] = useState<{
    uid: string;
    data: IUserData;
  } | null>(null);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      doc(db, "users", uid),
      (snapshot) => {
        setProfile({
          uid,
          data: snapshot.exists()
            ? ({ ...snapshot.data(), id: snapshot.id } as IUserData)
            : emptyProfile(uid),
        });
      },
      () => setProfile({ uid, data: emptyProfile(uid) }),
    );
  }, [uid]);

  const setUserData = useCallback<
    React.Dispatch<React.SetStateAction<IUserData>>
  >(
    (update) => {
      setProfile((previous) => {
        const data = previous?.uid === uid ? previous.data : emptyProfile(uid);
        return {
          uid,
          data: typeof update === "function" ? update(data) : update,
        };
      });
    },
    [uid],
  );

  const userData = profile?.uid === uid ? profile.data : emptyProfile(uid);
  const loading = Boolean(uid && profile?.uid !== uid);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {loading ? null : children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context)
    throw new Error("useUserData must be used within UserDataContextProvider");
  return context;
};
