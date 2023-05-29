import type { WithId } from "@/types/common";
import type { Columns } from "@/types/table";

import * as S from "./Table.styled";

interface TableProps<T, K extends keyof T> {
  caption: string;
  data: Array<WithId<T>>;
  columns: Columns<T, K>;
  renderColumns: (data: T, key: K) => React.ReactNode;
}

export default function Table<T, K extends keyof T>({
  caption,
  columns,
  data,
  renderColumns,
}: TableProps<T, K>) {
  return (
    <S.Table>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map(({ label }) => (
            <th key={label} scope="col">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowItem) => (
          <tr key={rowItem.id}>
            {columns.map(({ key }) => (
              <td key={key}>{renderColumns(rowItem, key)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
}
