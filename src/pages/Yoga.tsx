import { useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import Headline from "../components/Headline";
import SearchField from "../components/SearchField";
import supabase from "../utils/supabase";
import { SingleCart } from "../components/SingleCard";
import TimeAndLevelFilter from "../components/TimeAndLevelFilter";
import { useMainContext } from "../context/MainProvider";

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
  const {
    favouriteSessions,
    sessionsYM,
    setSessionsYM,
    activeFilter,
    setActiveFilter,
    activeTimeFilter,
    setActiveTimeFilter,
    activeLevelFilter,
    setActiveLevelFilter,
    searchTerm,
    setSearchTerm,
  } = useMainContext();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase.from("sessions").select("*, categories(*)");

      if (resp.data) {
        setSessionsYM(resp.data as unknown as ISessionYM[]);
      }
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

  let sessionsToDisplay: ISessionYM[] = [];

  //damit ich an die verschachtelte category id komme ohne die Typen zu ändern im MainProvider, weil sonst andere Konflikte (same in Yoga)
  const flatFavourites = favouriteSessions.map((session) => ({
    ...session,
    category_id:
      typeof session.category_id === "object"
        ? session.category_id.id
        : session.category_id,
  }));
  if (activeFilter === "favourites") {
    sessionsToDisplay = flatFavourites;
  } else {
    sessionsToDisplay = sessionsYM ?? [];
  }

  const filteredSessions = sessionsToDisplay?.filter((session) => {
    const passesCategory =
      activeFilter === "all" ||
      activeFilter === "favourites" ||
      session.category_id === activeFilter;
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

  useEffect(() => {
    return () => {
      setActiveFilter("all");
    };
  }, []);

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

      <div
        className={
          filteredSessions && filteredSessions.length > 0
            ? "grid grid-cols-2 gap-3 px-5"
            : ""
        }
      >
        {filteredSessions && filteredSessions.length > 0 ? (
          filteredSessions
            ?.sort(() => Math.random() - 0.5)
            .map((entry) => {
              return (
                entry.media_type === "youtube" && (
                  <div key={entry.id}>
                    <SingleCart session={entry} style="h-50 w-full" />
                  </div>
                )
              );
            })
        ) : (
          <p className="text-dark-green pt-10 text-center font-bold">
            No Yoga or Meditation sessions match your search. Try adjusting your
            search
          </p>
        )}
      </div>
    </section>
  );
};

export default Yoga;
