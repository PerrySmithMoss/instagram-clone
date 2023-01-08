import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Profile } from "../../components/User/Profile";
import { useAuth } from "../../context/AuthContext";
import { UserDataContextProvider } from "../../context/UserContext";

const IndividualUser: NextPage = () => {
  const { user: currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) router.push("/");
  return (
    <UserDataContextProvider>
      <Profile />
    </UserDataContextProvider>
  );
};

export default IndividualUser;
