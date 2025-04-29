

export interface ISession {
    id: string;
    //hier war vorher ICategory, ich hab das weggenommen, damit der Filter funktioniert ohne das herein navigieren, weil wir das an der Stelle auch gar nicht brauchen.
    category_id: string;
    title: string;
    description: string;
    duration: number;
    image_url: string;
    madia_url: string;
    media_type: string;
    level?: string
  }