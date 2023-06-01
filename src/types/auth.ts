export interface LoginApiRequest {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  accessToken: string;
}

export interface UserInfo {
  id: string;
  name: string;
}

export interface User {
  user?: UserInfo;
  accessToken?: string;
}

export interface SignupApiRequest {
  email: string;
  name: string;
  password: string;
}

export interface SignupApiResponse {
  accessToken: string;
}
