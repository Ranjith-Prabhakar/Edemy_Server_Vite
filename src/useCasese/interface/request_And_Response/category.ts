import { ICategory } from "../../../entities/category";

export interface ICategoryResponse {
  status: number;
  message: string;
  data?: ICategory | ICategory[];
}
