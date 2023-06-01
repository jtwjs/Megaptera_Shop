import { singleton } from "tsyringe";

import VALID_MSG from "@/constants/validMsg";

import ObjectStore from "../ObjectStore";

@singleton()
export default class LoginFormStore extends ObjectStore {
  email = "";
  password = "";
  error = "";

  changeEmail = (email: string) => {
    this.setError("");
    if (!this.emailValidCheck(email)) {
      this.setError(VALID_MSG.EMAIL);
    }

    this.email = email;
    this.publish();
  };

  changePassword = (password: string) => {
    this.setError("");
    if (!this.passwordValidCheck(password)) {
      this.setError(VALID_MSG.PASSWORD);
    }

    this.password = password;
    this.publish();
  };

  setError = (error: string) => {
    this.error = error;
  };

  reset = () => {
    this.email = "";
    this.password = "";
    this.setError("");

    this.publish();
  };

  private emailValidCheck(email: string): boolean {
    const ID_MAX_LENGTH = 64;
    const DOMAIN_MAX_LENGTH = 63;
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([\w-])+(\.[a-zA-Z]{2,4}){1,2}$/;
    const [id, domain] = email.split(/[.@]/);

    if (id.length >= ID_MAX_LENGTH || domain?.length >= DOMAIN_MAX_LENGTH) {
      return false;
    }
    return regex.test(email);
  }

  private passwordValidCheck(password: string): boolean {
    const regex = /(?=.*[A-Za-z])/;

    if (password.length < 8 || password.length > 16) {
      return false;
    }

    return regex.test(password);
  }
}
