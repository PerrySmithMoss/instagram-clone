import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "../../components/Auth/Login";
import { Profile } from "../../components/User/Profile";
import { useAuth } from "../../context/AuthContext";
import { UserDataContextProvider } from "../../context/UserContext";

const IndividualUser: NextPage = () => {
  const { user: currentUser } = useAuth();

  if (!currentUser)
    return (
      <div className="bg-gray-50 ">
        <Head>
          <title>Login | Instagram</title>
          <meta name="description" content="Instagram" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Login />;
      </div>
    );
  return (
    <UserDataContextProvider>
      <Profile />
    </UserDataContextProvider>
  );
};

export default IndividualUser;
