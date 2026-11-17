import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { UserDataContextProvider } from "../context/UserContext";
import { AuthContextProvider } from "../context/AuthContext";
import { SiteFooter, SiteNotice } from "../components/SiteIdentity";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Photo Journal | Independent photo-sharing demo</title>
        <meta
          name="description"
          content="An independent photo-sharing demo by Perry Smith-Moss. Not affiliated with Instagram, Meta, or Facebook."
        />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </Head>
      <SiteNotice />
      {/* Project information stays readable without waiting for authentication. */}
      {router.pathname === "/about" ? (
        <Component {...pageProps} />
      ) : (
        <AuthContextProvider>
          <UserDataContextProvider>
            <Component {...pageProps} />
          </UserDataContextProvider>
        </AuthContextProvider>
      )}
      <SiteFooter />
    </>
  );
}

export default MyApp;
