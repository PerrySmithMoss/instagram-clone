import type { NextPage } from "next";
import { getProviders, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Login } from "../components/Auth/Login";
import { Feed } from "../components/Feed/Feed";
import { Navbar } from "../components/Navbar/Navbar";

const Home: NextPage = ({ providers }: any) => {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;
  return (
    <div className="bg-gray-50 ">
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Feed />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
