import type { NextPage } from "next";
import { getProviders, useSession } from "next-auth/react";
import Head from "next/head";
import { SignUp } from "../components/Auth/SignUp";
import { Feed } from "../components/Feed/Feed";
import { Navbar } from "../components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const SignUpPage: NextPage = ({ providers }: any) => {
  const { data: session } = useSession();
  const { user } = useAuth();

  if (!user) return <SignUp providers={providers} />;
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

// export const getServerSideProps = async () => {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     },
//   };
// };
