import { ICategory } from "./ICategory";

export interface ISession {
  id: string;
  category_id: ICategory;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  madia_url: string;
  media_type: string;
  level: string;
}
