export type Category = {
  id: string;
  name: string;
};

export interface CategoryApiResponse {
  categories: Category[];
}
