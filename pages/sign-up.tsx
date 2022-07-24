import type { NextPage } from "next";
import Head from "next/head";
import { SignUp } from "../components/Auth/SignUp";
import { Feed } from "../components/Feed/Feed";
import { Navbar } from "../components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const SignUpPage: NextPage = () => {
  const { user } = useAuth();

  if (!user) return <SignUp />;
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

export default SignUpPage;