import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { productDetails } from "@/fixtures";
import { useAuth, type AuthContextValue } from "@/libs/AuthProvider";
import { withAllContexts } from "@/tests/utils";
import { numberFormat } from "@/utils/format";

import AddToCartForm from "./AddToCartForm";

const [product] = productDetails;
const { options } = product;

const store = {
  selectedOptionItems: options.map((opt) => ({
    id: opt.id,
    itemId: opt.items[0].id,
  })),
  quantity: 1,
  totalPrice: jest.fn(),
  getSelectedOptionItem: jest.fn(),
  changeOptionItem: jest.fn(),
  clear: jest.fn(),
};

jest.mock("@/hooks/useProductFormStore", () => () => store);
jest.mock("@/libs/AuthProvider");

let isLoggedIn = false;

const context = describe;

describe("AddToCartForm", () => {
  function renerAddToCartForm() {
    return render(withAllContexts(<AddToCartForm product={product} />));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useAuth).mockImplementation(
      () =>
        ({
          isLoggedIn,
        } as unknown as AuthContextValue)
    );
    store.totalPrice.mockImplementation(
      (price: number) => store.quantity * price
    );
  });

  it("renders correctly", () => {
    renerAddToCartForm();

    expect(screen.getAllByRole("combobox")).toHaveLength(options.length);

    const totalPrice = store.quantity * product.price;
    expect(screen.getByText(`${numberFormat(totalPrice)}원`));
  });

  context("when selectedItem is changed", () => {
    it("changeOptionItem is called", async () => {
      renerAddToCartForm();

      const selectEl = screen.getByRole("combobox", { name: "Color" });
      await userEvent.click(selectEl);

      const optionEl = screen.getByRole("option", { name: "Black" });
      await userEvent.click(optionEl);

      expect(store.changeOptionItem).toBeCalled();
    });
  });

  context("when the current user isn't logged in", () => {
    it('display message "주문하려면 로그인하세요"', () => {
      renerAddToCartForm();

      expect(screen.getByText(/주문하려면 로그인하세요/)).toBeInTheDocument();
    });
  });

  context("when the current user is logged in", () => {
    beforeEach(() => {
      isLoggedIn = true;
    });

    it("renders “Add To Cart” button", () => {
      renerAddToCartForm();

      expect(
        screen.getByRole("button", { name: "장바구니 담기" })
      ).toBeInTheDocument();
    });
  });
});
