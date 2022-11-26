import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { GlobalContextProvider } from "../context/GlobalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
