import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import Headline from "../components/Headline";
import SearchField from "../components/SearchField";
import supabase from "../utils/supabase";
import { SingleCart } from "../components/SingleCard";

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  type_id: string;
}

export interface ITypes {
  id: string;
  name: string;
}

export interface ISession {
  id: string;
  category_id: ICategory;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  madia_url: string;
  media_type: string;
}

export interface ITags {
  id: string;
  name: string;
}

export interface ISession_tags {
  id: String;
  session_id: ISession;
  tag_id: ITags;
}

const Yoga = () => {
 
  const [session, setSession] = useState<ISession[] | undefined>();
  

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase
        .from("sessions")
        .select("*,categories(*,type_id)");

      if (resp.data) {
        setSession(resp.data as unknown as ISession[]);
      }
      console.log(resp.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Headline name="Yoga" description="Find your inner zen from annywhere." />
      <CategoryFilter type="yoga" />
      <SearchField />

      <div className="mx-5 grid grid-cols-2 gap-2">
        {session?.map((entry) => (
          <>
            {entry.media_type === "youtube" && (
              <div>
                <SingleCart session={entry} key={entry.id} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Yoga;
