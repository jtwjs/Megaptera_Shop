import { useQueryClient } from "@tanstack/react-query";
import {
  useState,
  useMemo,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { useLocation } from "react-router-dom";

import { NON_SAVED_PATH } from "@/constants/path";
import type { User } from "@/types/auth";
import { auth, Auth } from "@/utils/auth";
import { PathStorage } from "@/utils/pathStorage";

const redirectPathStorage = new PathStorage("login_redirect");

export interface AuthContextValue {
  auth: Auth;
  initializing: boolean;
  user: User | null;
  isLoggedIn: boolean;
  error: { message: string } | null;
  redirectPathStorage: PathStorage;
}

export const AuthContext = createContext({} as AuthContextValue);

AuthContext.displayName = "AuthContext";

export function useAuth() {
  const authValues = useContext(AuthContext);

  if (!authValues) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authValues;
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const { pathname, search } = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [initializing, setInitializing] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    auth.resolveUser().onAuthStateChanged((user: User | null, error) => {
      if (user) {
        setUser(user);
        setError(null);
      } else {
        setUser(null);
        queryClient.clear();

        if (error) {
          setError(error);
        }
      }
      setInitializing(false);
    });
  }, [queryClient]);

  useEffect(() => {
    if (NON_SAVED_PATH.includes(pathname)) {
      return;
    }
    const fullPath = pathname + search;
    redirectPathStorage.setPath(fullPath);
  }, [pathname, search]);

  const value = useMemo(
    () => ({
      auth,
      isLoggedIn: auth.isLoggedIn(),
      user,
      error,
      initializing,
      redirectPathStorage,
    }),
    [user, error, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
