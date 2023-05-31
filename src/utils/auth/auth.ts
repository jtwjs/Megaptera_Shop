import Cookies from "js-cookie";

import { User, UserInfo } from "@/types/auth";

export type UserCB = (user: User | null, error?: { message: string }) => void;

export class Auth {
  private static instance: Auth | null = null;

  static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  private key = "megap-user";

  private user: User | null = null;

  private cb: UserCB | null = null;

  isLoggedIn() {
    return Boolean(this.user?.accessToken);
  }

  getAuth() {
    return this.user;
  }

  changeAccessToken(accessToken: string) {
    this.user = { ...this.user, accessToken };
    Cookies.set(this.key, JSON.stringify(this.user));
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb;

    this.onUserChange(this.user);

    return () => {
      this.cb = null;
    };
  }

  login(token: string) {
    const user = { ...this.user, accessToken: token };
    Cookies.set(this.key, JSON.stringify(user));
    this.onUserChange(user);
    this.resolveUser();
  }

  setUserInfo(userInfo: UserInfo) {
    const user = { ...this.user, user: userInfo };
    Cookies.set(this.key, JSON.stringify(user));
    this.onUserChange(user);
    this.resolveUser();
  }

  logout() {
    Cookies.remove(this.key);
    this.onUserChange(null);
    this.user = null;
  }

  resolveUser() {
    const loggedInUser = Cookies.get(this.key);

    if (loggedInUser) {
      this.setUser(JSON.parse(Cookies.get(this.key) as string));
    }

    return this;
  }

  private onUserChange(user: User | null, error?: { message: string }) {
    this.cb?.(user, error);
  }

  private setUser(user: User) {
    this.user = user;
  }
}

export const auth = Auth.getInstance();
