export interface ISession {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  media_url: string;
  media_type: string;
  category_id: {
    id: string;
    type_id: {
      id: string;
      name: string;
    };
  };
  level: string;
}
