import { Link } from "react-router-dom";

import { Table } from "@/components/common";
import PATH from "@/constants/path";
import { LineItem } from "@/types/cart";
import { Columns } from "@/types/table";
import { numberFormat } from "@/utils/format";

import * as S from "./LineItemTable.styled";

interface LineItemTableProps {
  caption: string;
  lineItems: LineItem[];
}

type ColumnKey = Exclude<keyof LineItem, "id" | "options">;

export default function OrderView({ caption, lineItems }: LineItemTableProps) {
  const columns: Columns<LineItem, ColumnKey> = [
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

  const renderColumns = (data: LineItem, key: ColumnKey) => {
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

  return (
    <Table
      caption={caption}
      data={lineItems}
      columns={columns}
      renderColumns={renderColumns}
    />
  );
}
