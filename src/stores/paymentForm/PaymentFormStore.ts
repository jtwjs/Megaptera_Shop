import { singleton } from "tsyringe";

import { Receiver } from "@/types/order";

import ObjectStore from "../ObjectStore";

@singleton()
export default class PaymentFormStore extends ObjectStore {
  receiver: Receiver = {
    name: "",
    address1: "",
    address2: "",
    postalCode: "",
    phoneNumber: "",
  };

  isValid = () => {
    return (
      Boolean(this.receiver.name.trim()) &&
      Boolean(this.receiver.address1.trim()) &&
      Boolean(this.receiver.address2.trim()) &&
      Boolean(this.receiver.postalCode.trim()) &&
      Boolean(this.receiver.phoneNumber.trim())
    );
  };

  changeName = (name: string) => {
    this.receiver.name = name;

    this.publish();
  };

  changeAddress = (address: string, postalCode: string) => {
    this.receiver.address1 = address;
    this.receiver.postalCode = postalCode;

    this.publish();
  };

  changeAddressDetail = (detail: string) => {
    this.receiver.address2 = detail;

    this.publish();
  };

  changePhoneNumber = (phoneNumber: string) => {
    this.receiver.phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

    this.publish();
  };

  clear = () => {
    this.receiver = {
      name: "",
      address1: "",
      address2: "",
      postalCode: "",
      phoneNumber: "",
    };

    this.publish();
  };
}
