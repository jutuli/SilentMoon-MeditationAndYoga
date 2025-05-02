import { useEffect, useState } from "react";
import InitialFilteringButton from "../components/InitialFilteringButton";
import supabase from "../utils/supabase";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import SilentMoon from "../components/SilentMoon";


interface IType {
  id: string;
  name: string;
}

const InitialFiltering = () => {
  const navigate = useNavigate();

  const [allFilters, setAllFilters] = useState<IType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const fetchData = async () => {
    const { data: tags, error } = await supabase.from("tags").select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setAllFilters(tags);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="initial-filtering flex grow flex-col justify-between px-5">
      <div className="flex flex-col gap-5">
        <div className="pb-10">
          <SilentMoon />
        </div>
        <article className="pb-10">
          <h2 className="text-dark-green text-lg font-bold tracking-wider">
            Would you like to choose a few topics to focus on today?
          </h2>
          <p className="text-gray text-sm">Choose as many as you like.</p>
        </article>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {allFilters.map((filter) => {
            if (
              !filter.name.toLowerCase().includes("beginner") &&
              !filter.name.toLowerCase().includes("advanced") &&
              !filter.name.toLowerCase().includes("morning") &&
              !filter.name.toLowerCase().includes("evening")
            ) {
              return (
                <InitialFilteringButton
                  key={filter.id}
                  text={filter.name}
                  isActive={selectedFilters.includes(filter.id)}
                  onToggle={() => {
                    if (selectedFilters.includes(filter.id)) {
                      setSelectedFilters((prev) =>
                        prev.filter((id) => id !== filter.id),
                      );
                    } else {
                      setSelectedFilters((prev) => [...prev, filter.id]);
                    }
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="mb-10 flex flex-col gap-5">
        <Button
          text="Continue"
          onClick={() => {
            navigate("/home", { state: { selectedFilters } });
          }}
        />
        <button
          onClick={() => {
            setSelectedFilters([]);
            navigate("/home");
          }}
          className="text-pink cursor-pointer uppercase"
        >
          No Thanks
        </button>
      </div>
    </section>
  );
};

export default InitialFiltering;
