import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { ISession } from "./Yoga";
import supabase from "../utils/supabase";
import SearchField from "../components/SearchField";
import { SingleCart } from "../components/SingleCard";
import Headline from "../components/Headline";

const Meditate = () => {
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
      <Headline
        name="Meditate"
        description="Audio-only meditation techniques to help you minimize your screen time and practice on the go."
      />
      <CategoryFilter type="meditate" />

      <SearchField />

      <div className="grid grid-cols-2 gap-3">
        {session?.map((entry) => (
          <div key={entry.id} className="">
            {entry.media_type === "soundcloud" && (
              <div className="">
                <SingleCart session={entry} key={entry.id} />
              </div>
            )}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meditate;
