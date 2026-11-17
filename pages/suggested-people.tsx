import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar/Navbar";
import { SuggestedPeople } from "../components/SuggestedPeople/SuggestedPeople";
import { useAuth } from "../context/AuthContext";

const SuggestedPeoplePage: NextPage = () => {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !user) void router.replace("/");
  }, [user, router]);

  if (!user) return null;
  return (
    <div className="bg-gray-50 ">
      <Head>
        <title>Suggested People | Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SuggestedPeople />
    </div>
  );
};

export default SuggestedPeoplePage;
