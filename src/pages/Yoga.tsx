import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import Headline from "../components/Headline";
import SearchField from "../components/SearchField";
import supabase from "../utils/supabase";
import { SingleCart } from "../components/SingleCard";
import TimeAndLevelFilter from "../components/TimeAndLevelFilter";

interface ISession {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  media_url: string;
  media_type: string;
  category_id: string
  level: string;
}



const Yoga = () => {
 
  const [sessions, setSessions] = useState<ISession[] | undefined>();
  const [activeFilter, setActiveFilter] = useState<string | "all" | "favourites" | null>("all");
  const [activeTimeFilter, setActiveTimeFilter] = useState<number | null>(null);
  const [activeLevelFilter, setActiveLevelFilter] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase
        .from("sessions")
        .select("*, categories(*)");

      if (resp.data) {
        setSessions(resp.data as unknown as ISession[]);
      }
      console.log(resp.data);
    };
    fetchData();
  }, []);

  //!Diese Funktion für die anderen Button schreiben
  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  const handleTimeFilterChange = (filter: number | null | undefined) => {
    setActiveTimeFilter(filter ?? null);
  };

  const handleLevelFilterChange = (filter: string | null | undefined) => {
    setActiveLevelFilter(filter ?? null);
  };

  const filteredSessions = sessions?.filter((session) => {
    const passesCategory = activeFilter === "all" || session.category_id === activeFilter;
    const passesLevel = !activeLevelFilter || session.level === activeLevelFilter;

    const duration = session.duration;
    const passesTime =
      !activeTimeFilter ||
      (activeTimeFilter === 1 && duration < 15) ||
      (activeTimeFilter === 2 && duration >= 15 && duration < 27) ||
      (activeTimeFilter === 3 && duration >= 27);

    return passesCategory && passesLevel && passesTime;
  });


  return (
    <section className="pb-25">
      <div className="mx-5">
      <Headline name="Yoga" description="Find your inner zen from annywhere." />
      <CategoryFilter type="431a7ad8-a08b-429e-820c-24c53c240990" onFilterChange={handleFilterChange} />
      <TimeAndLevelFilter
          levelChange={handleLevelFilterChange}
          timeChange={handleTimeFilterChange}
        />
      <SearchField />
      </div>

<div className="mx-5 grid grid-cols-2 gap-4">
  {filteredSessions?.sort(() => Math.random() - 0.5).map((entry) => {
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
    </section>
  );
};

export default Yoga;
