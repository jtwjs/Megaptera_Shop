import { productDetails } from "@/fixtures";

import ProductFormStore from "./ProductFormStore";

const context = describe;

describe("ProductFormStore", () => {
  let store: ProductFormStore;

  beforeEach(() => {
    store = new ProductFormStore();
  });

  describe("changeOptionItem", () => {
    const [product] = productDetails;
    const [option1, option2] = product.options;

    it("sets option item", () => {
      store.changeOptionItem({
        id: option1.id,
        itemId: option1.items[0].id,
      });

      store.changeOptionItem({
        id: option2.id,
        itemId: option1.items[0].id,
      });

      expect(store.selectedOptionItems).toEqual([
        {
          id: option1.id,
          itemId: option1.items[0].id,
        },
        {
          id: option2.id,
          itemId: option1.items[0].id,
        },
      ]);
    });

    context("with same option", () => {
      it("replace option item", () => {
        store.changeOptionItem({
          id: option1.id,
          itemId: option1.items[0].id,
        });

        store.changeOptionItem({
          id: option1.id,
          itemId: option1.items[1].id,
        });

        expect(store.selectedOptionItems).toEqual([
          { id: option1.id, itemId: option1.items[1].id },
        ]);
      });
    });
  });

  describe("getSelectedOptionItem", () => {
    const [product] = productDetails;
    const [option] = product.options;

    context("when the value of that option is selected", () => {
      it("returns the corresponding option item", () => {
        store.changeOptionItem({
          id: option.id,
          itemId: option.items[0].id,
        });

        expect(store.getSelectedOptionItem(option)).toEqual(option.items[0]);
      });
    });

    context("when no value selected", () => {
      it("returns undefined", () => {
        expect(store.getSelectedOptionItem(option)).toBeUndefined();
      });
    });
  });

  describe("changeQuantity", () => {
    context("with correct value", () => {
      it("changes quantity", () => {
        store.changeQuantity(3);

        expect(store.quantity).toBe(3);
      });
    });

    context("when value is less than 1", () => {
      it("doesn't changes quantity", () => {
        store.changeQuantity(-1);
        expect(store.quantity).toBe(1);
      });
    });

    context("when value is greater than 10", () => {
      it("doesn't changes quantity", () => {
        store.changeQuantity(11);
        expect(store.quantity).toBe(1);
      });
    });
  });
});
