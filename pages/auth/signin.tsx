import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { Navbar } from "../../components/Navbar/Navbar";

const SignIn: NextPage = ({ providers }: any) => {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Sign in | Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignIn;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
