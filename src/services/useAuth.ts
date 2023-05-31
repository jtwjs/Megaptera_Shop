import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import * as api from "@/apis/auth";
import PATH from "@/constants/path";
import { useAuth } from "@/libs/AuthProvider";
import type * as type from "@/types/auth";

export const useLogin = (
  options?: UseMutationOptions<
    type.LoginApiResponse,
    AxiosError,
    type.LoginApiRequest
  >
) => {
  const navigate = useNavigate();

  const { auth, redirectPathStorage } = useAuth();

  return useMutation((req) => api.login(req), {
    ...options,
    onSuccess: (res) => {
      auth.login(res.accessToken);
      const redirectPage = redirectPathStorage.getPath();
      navigate(redirectPage);
    },
  });
};

export const useLogout = (
  options?: UseMutationOptions<unknown, AxiosError>
) => {
  const navigate = useNavigate();

  const { auth } = useAuth();

  return useMutation(api.logout, {
    ...options,
    onSuccess: () => {
      auth.logout();
      navigate(PATH.LOGIN);
    },
  });
};

export const useFetcUserInfo = (): UseQueryResult<type.UserInfo> => {
  const { auth } = useAuth();

  return useQuery(["userinfo"], api.fetchUserInfo, {
    onSuccess: (res) => {
      auth.setUserInfo(res);
    },
  });
};
