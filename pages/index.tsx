import type { NextPage } from "next";
import Head from "next/head";
import { Login } from "../components/Auth/Login";
import { Feed } from "../components/Feed/Feed";
import { Navbar } from "../components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
  const { user } = useAuth();

  if (!user) return (
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