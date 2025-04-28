import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import Headline from "../components/Headline";
import SearchField from "../components/SearchField";
import supabase from "../utils/supabase";
import { SingleCart } from "../components/SingleCard";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ICategory {
  id: string;
  name: string;
  icon: IconProp;
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
 
  const [sessions, setSessions] = useState<ISession[] | undefined>();
  

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase
        .from("sessions")
        .select("*,categories(*,type_id)");

      if (resp.data) {
        setSessions(resp.data as unknown as ISession[]);
      }
      console.log(resp.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mx-5">
      <Headline name="Yoga" description="Find your inner zen from annywhere." />
      <CategoryFilter type="431a7ad8-a08b-429e-820c-24c53c240990" />
      <SearchField />
      </div>


      {/* <div className="mx-5 grid grid-cols-2 gap-4">
        {session?.map((entry, index) => (
          <>
            {entry.media_type === "youtube" && (
              <div>
                <SingleCart session={entry} key={entry.id} style={index % 2 === 0 ? `w-full h-70` : "w-full h-80"} />
                <p>{index}</p>
              </div>
            )}
          </>
        ))}
      </div> */}

<div className="mx-5 grid grid-cols-2 gap-4">
  {sessions?.sort(() => Math.random() - 0.5).map((entry, index) => {
    // .sort(() => Math.random() - 0.5)
    //oben könnte man einfügen damit sie nicht nach unseren Kategorien sortiert sind, dann kommt das aber mit der index logik in die Quere

    //um die erste und vierte Karte größer zu machen
    //hat allerdings ewig nicht geklappt --> Alternative
    //index startet bei 17, daher so
    //.const isFirstOrFourth = ((index-17) % 4 === 0 || (index-17) % 4 === 3);
    
    return (
      entry.media_type === "youtube" && (
        <div key={entry.id}>
          {/* className={isFirstOrFourth ? "col-span-2" : ""}  oben drüber rein*/}
          <SingleCart
            session={entry}
            style="h-50 w-full"
          />
          {/* {isFirstOrFourth ? "w-full h-80" : "w-full h-50"} als style*/}
        </div>
      )
    );
  })}
</div>
    </>
  );
};

export default Yoga;
