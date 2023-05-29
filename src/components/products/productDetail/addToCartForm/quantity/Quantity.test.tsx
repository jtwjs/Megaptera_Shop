import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { withAllContexts } from "@/tests/utils";

import Quantity from "./Quantity";

const store = {
  quantity: 4,
  changeQuantity: jest.fn(),
};

jest.mock("@/hooks/useProductFormStore", () => () => store);

const context = describe;

describe("Quantity", () => {
  function renderQuantity() {
    return render(withAllContexts(<Quantity />));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders quantity", () => {
    renderQuantity();

    expect(screen.getByRole("textbox")).toHaveValue("4");
  });

  context('with "+" button is clicked', () => {
    it("couchangeQuantity is called", async () => {
      renderQuantity();

      const decreaseBtn = screen.getByRole("button", { name: "decrease" });

      await userEvent.click(decreaseBtn);

      expect(store.changeQuantity).toHaveBeenCalledWith(3);
    });
  });

  context('with "-" button is clicked', () => {
    it("changeQuantity is called", async () => {
      renderQuantity();

      const increaseBtn = screen.getByRole("button", { name: "increase" });

      await userEvent.click(increaseBtn);

      expect(store.changeQuantity).toHaveBeenCalledWith(5);
    });
  });
});
