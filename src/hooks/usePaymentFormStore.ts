import { container } from "tsyringe";

import { PaymentFormStore } from "@/stores";

import useObjectStore from "./useObjectStore";

export default function usePaymentFormStore() {
  const store = container.resolve(PaymentFormStore);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.changeName(value);
  };

  const handleChangeAddressDetail = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    store.changeAddressDetail(value);
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    store.changePhoneNumber(value);
  };

  return {
    ...useObjectStore(store),
    handleChangeName,
    handleChangeAddress: store.changeAddress,
    handleChangeAddressDetail,
    handleChangePhoneNumber,
  };
}
