import { singleton } from "tsyringe";

import ObjectStore from "../ObjectStore";

@singleton()
export default class PaymentFormStore extends ObjectStore {
  name = "";
  address = "";
  postalCode = "";
  addressDetail = "";
  phoneNumber = "";

  changeName = (name: string) => {
    this.name = name;

    this.publish();
  };

  changeAddress = (address: string, postalCode: string) => {
    this.address = address;
    this.postalCode = postalCode;

    this.publish();
  };

  changeAddressDetail = (addressDetail: string) => {
    this.addressDetail = addressDetail;

    this.publish();
  };

  changePhoneNumber = (phoneNumber: string) => {
    this.phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

    this.publish();
  };

  clear = () => {
    this.name = "";
    this.address = "";
    this.addressDetail = "";
    this.postalCode = "";
    this.phoneNumber = "";

    this.publish();
  };
}
