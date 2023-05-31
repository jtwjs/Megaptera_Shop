import { container } from "tsyringe";

import { LoginFormStore } from "@/stores";

import useObjectStore from "./useObjectStore";

export default function useLoginFormStore() {
  const store = container.resolve(LoginFormStore);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.changeEmail(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.changePassword(value);
  };

  return { ...useObjectStore(store), handleChangeEmail, handleChangePassword };
}
