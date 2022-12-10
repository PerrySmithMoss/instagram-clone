import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "../components/Auth/Login";
import { Navbar } from "../components/Navbar/Navbar";
import { SuggestedPeople } from "../components/SuggestedPeople/SuggestedPeople";
import { useAuth } from "../context/AuthContext";
import { UserDataContextProvider } from "../context/UserContext";

const SuggestedPeoplePage: NextPage = () => {
  const { user } = useAuth();

  if (!user)
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
      <div className="bg-gray-50 ">
        <Head>
          <title>Suggested People | Instagram</title>
          <meta name="description" content="Instagram" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <SuggestedPeople />
      </div>
    </UserDataContextProvider>
  );
};

export default SuggestedPeoplePage;
