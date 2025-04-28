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
      <CategoryFilter type="8d946553-91d1-4307-915a-a2b5329769e2" />

      <SearchField />

      <div className="grid grid-cols-2 gap-3">
      {session?.map((entry, index) => {
    // .sort(() => Math.random() - 0.5)
  
    const isFirstOrFourth = ((index) % 4 === 0 || (index) % 4 === 3);
    
    return (
      entry.media_type === "soundcloud" && (
        <div key={entry.id} className={isFirstOrFourth ? "col-span-2" : ""}>
          <SingleCart
            session={entry}
            style={isFirstOrFourth ? "w-full h-80" : "w-full h-50"}
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
