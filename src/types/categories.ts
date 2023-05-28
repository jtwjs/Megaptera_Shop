export type Category = {
  id: string;
  name: string;
};

export interface CategoriesApiResponse {
  categories: Category[];
}
