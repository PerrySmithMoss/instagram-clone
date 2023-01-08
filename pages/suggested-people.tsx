import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar/Navbar";
import { SuggestedPeople } from "../components/SuggestedPeople/SuggestedPeople";
import { useAuth } from "../context/AuthContext";
import { UserDataContextProvider } from "../context/UserContext";

const SuggestedPeoplePage: NextPage = () => {
  const { user } = useAuth();

  const router = useRouter();

  if (!user) router.push("/");
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
