import PaymentFormStore from "./PaymentFormStore";

const context = describe;

describe("PaymentFormStore", () => {
  let store: PaymentFormStore;

  beforeEach(() => {
    store = new PaymentFormStore();
  });

  context("with changeName", () => {
    it("name is changed", () => {
      const name = "정태웅";
      store.changeName(name);

      expect(store.name).toBe(name);
    });
  });

  context("with changeAddress", () => {
    it("address is changed", () => {
      const address = "경기도 성남";
      const postalCode = "1550";
      store.changeAddress(address, postalCode);

      expect(store.address).toBe(address);
      expect(store.postalCode).toBe(postalCode);
    });
  });
  context("with changeAddressDetail", () => {
    it("address detail is changed", () => {
      const detail = "501호";
      store.changeAddressDetail(detail);

      expect(store.addressDetail).toBe(detail);
    });
  });
  context("with changePhoneNumber", () => {
    it("phone number is changed", () => {
      const phone = "01025919503";
      store.changePhoneNumber(phone);

      expect(store.phoneNumber).toBe(phone);
    });

    it("only numeric characters are entered", () => {
      const phone = "010-2591-9503";
      store.changePhoneNumber(phone);

      expect(store.phoneNumber).not.toBe(phone);
      expect(store.phoneNumber).toBe("01025919503");
    });
  });
});
