import { singleton } from "tsyringe";

import type { CartItemOption } from "@/types/cart";
import { ProductOption } from "@/types/product";

import ObjectStore from "../ObjectStore";

@singleton()
export default class AddToCartStore extends ObjectStore {
  selectedOptionItems: CartItemOption[] = [];

  quantity = 1;

  changeQuantity = (quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    if (quantity > 10) {
      return;
    }
    this.quantity = quantity;
    this.publish();
  };

  getSelectedOptionItem = (option: ProductOption) => {
    return option.items.find(({ id }) =>
      this.selectedOptionItems.find(({ itemId }) => itemId === id)
    );
  };

  changeOptionItem = (option: CartItemOption) => {
    const filtredOption = this.selectedOptionItems.filter(
      (opt) => opt.id !== option.id
    );
    this.selectedOptionItems = [...filtredOption, option];

    this.publish();
  };

  clear = () => {
    this.selectedOptionItems = [];
    this.quantity = 1;
    this.publish();
  };

  totalPrice = (price: number) => {
    return price * this.quantity;
  };
}
