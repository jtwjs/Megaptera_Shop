import type * as type from "@/types/auth";
import type { ApiHandler } from "@/types/common";

import instance from "./axios";

export const login: ApiHandler<
  type.LoginApiRequest,
  type.LoginApiResponse
> = async (req) => {
  const res = await instance.post("/session", req);

  return res.data;
};

export const logout: ApiHandler<unknown, void> = async () => {
  await instance.delete("/session");
};

export const fetchUserInfo: ApiHandler<unknown, type.User> = async () => {
  const res = await instance.get("/user/me");
  return res.data;
};
