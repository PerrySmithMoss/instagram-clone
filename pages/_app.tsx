import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserDataContextProvider } from "../context/UserContext";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UserDataContextProvider>
        <Component {...pageProps} />
      </UserDataContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
