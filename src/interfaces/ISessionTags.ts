export interface ISessionTags {
  id: string;
  session_id: string;
  tag_id: string;
  created_at: string;
  sessions: {
    id: string;
    title: string;
    description: string | null;
    duration: number;
    image_url: string;
    media_url: string;
    media_type: string;
    created_at: string;
    category_id: {
      id: string;
      name: string;
      icon: string;
      type_id: string;
      created_at: string;
      type: {
        id: string;
        name: string;
        created_at: string;
      };
    };
  };
  tags: {
    id: string;
    name: string;
    created_at: string;
  };
}
