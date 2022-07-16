import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
