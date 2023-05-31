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
