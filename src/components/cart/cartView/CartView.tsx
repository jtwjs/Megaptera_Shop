import { Link } from "react-router-dom";

import { Table } from "@/components/common";
import PATH from "@/constants/path";
import { useFetchCartList } from "@/services/useCart";
import { CartItem } from "@/types/cart";
import { Columns } from "@/types/table";
import { numberFormat } from "@/utils/format";

import * as S from "./CartView.styled";

type CartListColumnKey = Exclude<keyof CartItem, "id" | "options">;

export default function CartView() {
  const { data } = useFetchCartList();
  const columns: Columns<CartItem, CartListColumnKey> = [
    {
      key: "product",
      label: "제품",
    },
    {
      key: "unitPrice",
      label: "단가",
    },

    {
      key: "quantity",
      label: "수량",
    },
    {
      key: "totalPrice",
      label: "금액",
    },
  ];

  const renderColumns = (data: CartItem, key: CartListColumnKey) => {
    switch (key) {
      case "product":
        return (
          <Link to={`${PATH.PRODUCTS}/${data[key].id}`}>
            <S.Product>
              <img src={data[key].thumbnail.url} alt="" />
              <S.ProductInfo>
                <div>
                  <dt>상품명:</dt>
                  <dd>{data[key].name}</dd>
                </div>
                <div>
                  <dt>옵션:</dt>
                  <dd>
                    {data.options
                      .map((opt) => `${opt.name}: ${opt.item.name}`)
                      .join(",")}
                  </dd>
                </div>
              </S.ProductInfo>
            </S.Product>
          </Link>
        );

      case "unitPrice":
      case "quantity":
      case "totalPrice":
        return numberFormat(data[key]);

      default: {
        const exhaustiveCheck: never = key;
        throw new Error(`unknown column key: ${exhaustiveCheck}`);
      }
    }
  };

  if (!data) {
    return null;
  }

  if (!data?.lineItems.length) {
    return <p>장바구니가 비었습니다</p>;
  }

  return (
    <S.CartView>
      <Table
        caption="장바구니"
        data={data?.lineItems}
        columns={columns}
        renderColumns={renderColumns}
      />
      <S.TotalPrice>
        <dt>합계:</dt>
        <dd>{numberFormat(data.totalPrice)}원</dd>
      </S.TotalPrice>
    </S.CartView>
  );
}
