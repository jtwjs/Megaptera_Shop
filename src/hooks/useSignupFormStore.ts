import { container } from "tsyringe";

import { SignupFormStore } from "@/stores";

import useObjectStore from "./useObjectStore";

export default function useLoginFormStore() {
  const store = container.resolve(SignupFormStore);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.changeEmail(value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.changeName(value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.changePassword(value);
  };

  const handleChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    store.changePasswordConfirm(value);
  };

  return {
    ...useObjectStore(store),
    handleChangeEmail,
    handleChangeName,
    handleChangePassword,
    handleChangePasswordConfirm,
  };
}
