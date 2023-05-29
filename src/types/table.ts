export interface Column<K extends string> {
  key: K;
  label: string;
}

export type Columns<T, K extends keyof T> = Array<
  Column<K extends string ? K : never>
>;
