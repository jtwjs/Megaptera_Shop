import VALID_MSG from "@/constants/validMsg";

import LoginFormStore from "./LoginFormStore";

const context = describe;

describe("LoginFormStore", () => {
  let store: LoginFormStore;

  beforeEach(() => {
    store = new LoginFormStore();
  });

  describe("change email", () => {
    it("email is changed", () => {
      const email = "v_oyb@naver.com";
      store.changeEmail(email);

      expect(store.email).toBe(email);
    });

    context("when value is invalid", () => {
      it(`error is ${VALID_MSG.EMAIL}`, () => {
        store.changeEmail("invalid email");

        expect(store.error).toBe(VALID_MSG.EMAIL);
      });
    });

    context("when value is valid", () => {
      it("error is empty", () => {
        store.changeEmail("tester@example.com");

        expect(store.error).toBeFalsy();
      });
    });
  });

  describe("change password", () => {
    it("password is changed", () => {
      const password = "password";
      store.changePassword(password);

      expect(store.password).toBe(password);
    });

    context("when value is invalid", () => {
      it(`error is ${VALID_MSG.PASSWORD}`, () => {
        store.changePassword("123123");

        expect(store.error).toBe(VALID_MSG.PASSWORD);
      });
    });

    context("when value is valid", () => {
      it("error is empty", () => {
        store.changePassword("password");

        expect(store.error).toBeFalsy();
      });
    });
  });

  describe("with reset", () => {
    it("all field values are initialized", () => {
      store.changeEmail("tester@example.com");
      store.changePassword("password");

      store.reset();

      expect(store.email).toBeFalsy();
      expect(store.password).toBeFalsy();
    });
  });
});
