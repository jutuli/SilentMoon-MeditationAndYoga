import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { ISession } from "../interfaces/ISession";
import supabase from "../utils/supabase";
import SearchField from "../components/SearchField";
import { SingleCart } from "../components/SingleCard";
import Headline from "../components/Headline";
import TimeAndLevelFilter from "../components/TimeAndLevelFilter";

const Meditate = () => {
  const [sessions, setSessions] = useState<ISession[] | undefined>();
  const [activeFilter, setActiveFilter] = useState<string | "all" | "favourites" | null>("all");
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [activeTime, setActiveTime] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase
        .from("sessions")
        .select("*");

      if (resp.data) {
        setSessions(resp.data as unknown as ISession[]);
      }
      console.log(resp.data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (filter: string | "all" | "favourites" | null) => {
    setActiveFilter(filter);
  };

  const handleLevelChange = (level: string | undefined | null) => {
    setActiveLevel(level ?? null);
  };

  const handleTimeChange = (time: number | null) => {
    setActiveTime(time);
  };

  const filteredSessions = sessions?.filter((session) => {
    const passesCategory = activeFilter === "all" || session.category_id === activeFilter;
    const passesLevel = !activeLevel || session.level === activeLevel;
    const passesTime =
  !activeTime ||
  (activeTime === 1 && session.duration < 15) ||
  (activeTime === 2 && session.duration >= 15 && session.duration < 27) ||
  (activeTime === 3 && session.duration >= 27);
  
    return passesCategory && passesLevel && passesTime;
  });

  return (
    <div className="pb-25 px-5">
      <Headline
        name="Meditate"
        description="Audio-only meditation techniques to help you minimize your screen time and practice on the go."
      />
      <CategoryFilter type="8d946553-91d1-4307-915a-a2b5329769e2"
      onFilterChange={handleFilterChange}/>
      <TimeAndLevelFilter levelChange={handleLevelChange} timeChange={handleTimeChange} />

      <SearchField />

      <div className="grid grid-cols-2 gap-3">
      {filteredSessions?.sort(() => Math.random() - 0.5).map((entry, index) => {
    
  

    
    return (
      entry.media_type === "soundcloud" && (
        <div key={entry.id}>
          <SingleCart
            session={entry}
            style={"h-50 w-full"}
          />
        </div>
      )
    );
  })}
      </div>
    </div>
  );
};

export default Meditate;
