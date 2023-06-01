import VALID_MSG from "@/constants/validMsg";

import SignupFormStore from "./SignupFormStore";

const context = describe;

describe("SignupFormStore", () => {
  let store: SignupFormStore;

  beforeEach(() => {
    store = new SignupFormStore();
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

  describe("change name", () => {
    it("name is changed", () => {
      const name = "정태웅";
      store.changeName(name);

      expect(store.name).toBe(name);
    });

    context("when value is invalid", () => {
      it(`error is ${VALID_MSG.NAME}`, () => {
        store.changeName("invalid name");

        expect(store.error).toBe(VALID_MSG.NAME);
      });
    });

    context("when value is valid", () => {
      it("error is empty", () => {
        store.changeName("정태웅");

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

  describe("change password confirm", () => {
    it("password confirm value is changed", () => {
      const password = "password";
      store.changePasswordConfirm(password);

      expect(store.passwordConfirm).toBe(password);
    });

    context("when password entered doesn't match", () => {
      it(`error is ${VALID_MSG.PASSWORD_C}`, () => {
        store.changePassword("password");
        store.changePasswordConfirm("password1");

        expect(store.error).toBe(VALID_MSG.PASSWORD_C);
      });
    });

    context("when value is valid", () => {
      it("error is empty", () => {
        store.changePassword("password");
        store.changePasswordConfirm("password");

        expect(store.error).toBeFalsy();
      });
    });
  });

  describe("with reset", () => {
    it("all field values are initialized", () => {
      store.changeEmail("tester@example.com");
      store.changeName("tester");
      store.changePassword("password");
      store.changePasswordConfirm("password");

      store.reset();

      expect(store.email).toBeFalsy();
      expect(store.name).toBeFalsy();
      expect(store.password).toBeFalsy();
      expect(store.passwordConfirm).toBeFalsy();
    });
  });
});
