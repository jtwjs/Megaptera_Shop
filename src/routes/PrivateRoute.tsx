import { Outlet, Navigate } from "react-router-dom";

import PATH from "@/constants/path";
import { useAuth } from "@/libs/AuthProvider";

export default function PublicRoute() {
  const { isLoggedIn, initializing } = useAuth();

  if (initializing) {
    return null;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.ROOT} />;
}
