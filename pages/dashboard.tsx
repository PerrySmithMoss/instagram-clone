import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Feed } from "../components/Feed/Feed";
import { Navbar } from "../components/Navbar/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Feed />
      {/* Feed */}


      {/* Sidebar */}
    </div>
  );
};

export default Home;