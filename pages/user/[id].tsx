import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Profile } from "../../components/User/Profile";
import { useAuth } from "../../context/AuthContext";

const IndividualUser: NextPage = () => {
  const { user: currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !currentUser) void router.replace("/");
  }, [currentUser, router]);

  if (!currentUser) return null;
  return <Profile />;
};

export default IndividualUser;
