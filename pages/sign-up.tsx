import type { NextPage } from "next";
import Head from "next/head";
import { SignUp } from "../components/Auth/SignUp";

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create a demo account | Photo Journal</title>
      </Head>
      <SignUp />
    </>
  );
};

export default SignUpPage;
