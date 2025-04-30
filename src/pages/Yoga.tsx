import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import Headline from "../components/Headline";
import SearchField from "../components/SearchField";
import supabase from "../utils/supabase";
import { SingleCart } from "../components/SingleCard";
import TimeAndLevelFilter from "../components/TimeAndLevelFilter";

export interface ISessionYM {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  media_url: string;
  media_type: string;
  category_id: string;
  level: string;
}

const Yoga = () => {
  const [sessions, setSessions] = useState<ISessionYM[] | undefined>();
  const [activeFilter, setActiveFilter] = useState<
    string | "all" | "favourites" | null
  >("all");
  const [activeTimeFilter, setActiveTimeFilter] = useState<number | null>(null);
  const [activeLevelFilter, setActiveLevelFilter] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase.from("sessions").select("*, categories(*)");

      if (resp.data) {
        setSessions(resp.data as unknown as ISessionYM[]);
      }
      console.log(resp.data);
    };
    fetchData();
  }, []);

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
    const passesCategory =
      activeFilter === "all" || session.category_id === activeFilter;
    const passesLevel =
      !activeLevelFilter || session.level === activeLevelFilter;

    const duration = session.duration;
    const passesTime =
      !activeTimeFilter ||
      (activeTimeFilter === 1 && duration < 15) ||
      (activeTimeFilter === 2 && duration >= 15 && duration < 27) ||
      (activeTimeFilter === 3 && duration >= 27);

    const passesSearch =
      !searchTerm ||
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase());

    return passesCategory && passesLevel && passesTime && passesSearch;
  });

  return (
    <section className="pb-25">
      <div className="mx-5">
        <Headline
          name="Yoga"
          description="Find your inner zen from annywhere."
        />
        <CategoryFilter
          type="431a7ad8-a08b-429e-820c-24c53c240990"
          onFilterChange={handleFilterChange}
        />
        <TimeAndLevelFilter
          levelChange={handleLevelFilterChange}
          timeChange={handleTimeFilterChange}
        />
        <SearchField doSearch={setSearchTerm} />
      </div>

      <div className="mx-5 grid grid-cols-2 gap-4">
        {filteredSessions
          ?.sort(() => Math.random() - 0.5)
          .map((entry) => {
            return (
              entry.media_type === "youtube" && (
                <div key={entry.id}>
                  <SingleCart session={entry} style="h-50 w-full" />
                </div>
              )
            );
          })}
      </div>
    </section>
  );
};

export default Yoga;
