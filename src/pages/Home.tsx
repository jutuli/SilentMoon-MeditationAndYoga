import { useLocation, useNavigate } from "react-router-dom";
import HomeCard from "../components/HomeCard";
import SearchField from "../components/SearchField";
import SilentMoon from "../components/SilentMoon";
import Slider from "../components/Slider";
import { useEffect, useState, useMemo } from "react";
import supabase from "../utils/supabase";
import { ISession } from "../interfaces/ISession";
import { useMainContext } from "../context/MainProvider";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedFilters = useMemo(
    () => location.state?.selectedFilters ?? [],
    [location.state?.selectedFilters],
  );

  const [recommendedYoga, setRecommendedYoga] = useState<ISession[]>([]);
  const [recommendedMeditation, setRecommendedMeditation] = useState<
    ISession[]
  >([]);
  //const [searchTerm, setSearchTerm] = useState<string>("");

  const {user, searchTerm, setSearchTerm} = useMainContext()

  const getGreeting = (name: string | undefined) => {
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) {
      return `Good Morning, ${name}! ☀️ `;
    } else if (currentTime >= 12 && currentTime < 18) {
      return `Good Afternoon, ${name}! 🧘‍♀️ `;
    } else {
      return `Good Evening, ${name}! 🌙 `;
    }
  };

  const removeDuplicates = (sessions: ISession[]) => {
    const uniqueSessions: ISession[] = [];

    for (const session of sessions) {
      const alreadyExists = uniqueSessions.find(
        (uniqueSession) => uniqueSession.id === session.id,
      );

      if (!alreadyExists) {
        uniqueSessions.push(session);
      }
    }

    return uniqueSessions;
  };

// für die Suchfunktion
  const filteredRecommendedYoga = recommendedYoga.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRecommendedMeditation = recommendedMeditation.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase())
  );



  useEffect(() => {
    const fetchRecommendations = async () => {
      const yogaTypeId = "431a7ad8-a08b-429e-820c-24c53c240990";
      const meditateTypeId = "8d946553-91d1-4307-915a-a2b5329769e2";

      if (selectedFilters.length === 0) {
        const { data, error } = await supabase.from("sessions").select(`
            *,
            category_id (
              id,
              type_id
            )
          `);
        console.log(data);

        if (error) {
          console.error("Error while fetching all sessions", error);
          return;
        }

        // Sessions nach Typ filtern
        const yoga = data.filter(
          (session: any) => session.category_id.type_id === yogaTypeId,
        );
        const meditation = data.filter(
          (session: any) => session.category_id.type_id === meditateTypeId,
        );

        // Doppelte entfernen
        setRecommendedYoga(removeDuplicates(yoga));
        setRecommendedMeditation(removeDuplicates(meditation));
      } else {
        // Wenn Filter ausgewählt, dann die Sessions mit den Tags abrufen
        const { data, error } = await supabase
          .from("session_tags")
          .select(
            `
            session_id,
            sessions (
              id,
              title,
              description,
              duration,
              image_url,
              media_url,
              media_type,
              category_id (
                id,
                type_id
              )
            )
          `,
          )
          .in("tag_id", selectedFilters);

        if (error) {
          console.error("Error while fetching filtered sessions", error);
          return;
        }

        // Sessions nach Typ filtern
        const yoga = data
          .filter(
            (entry: any) => entry.sessions.category_id.type_id === yogaTypeId,
          )
          .map((entry: any) => entry.sessions);

        const meditation = data
          .filter(
            (entry: any) =>
              entry.sessions.category_id.type_id === meditateTypeId,
          )
          .map((entry: any) => entry.sessions);

        // Doppelte entfernen
        setRecommendedYoga(removeDuplicates(yoga));
        setRecommendedMeditation(removeDuplicates(meditation));
      }
    };

    fetchRecommendations();
  }, [selectedFilters]);

  useEffect(() => {
    return () => {
      setSearchTerm(""); // Reset Search-Feld beim Verlassen der Seite
    };
  }, []);

  return (
    <section className="flex flex-col gap-5 px-5 pb-25">
      <SilentMoon />
      <article className="pt-5">
        <h2 className="text-dark-green text-lg font-bold tracking-wider">
          {getGreeting(user?.first_name)}
        </h2>
        <p className="text-gray text-xs">We hope you have a good day.</p>
      </article>
      <article className="flex justify-around gap-5 pb-5">
        {recommendedYoga[0] && (
          <HomeCard
            title={recommendedYoga[0].title}
            img={recommendedYoga[0].image_url}
            level="beginner"
            duration={recommendedYoga[0].duration?.toString()}
            onClick={() => navigate(`/yoga/${recommendedYoga[0].id}`)}
          />
        )}
        {recommendedMeditation[0] && (
          <HomeCard
            title={recommendedMeditation[0].title}
            img={recommendedMeditation[0].image_url}
            level="expert"
            duration={recommendedMeditation[0].duration?.toString()}
            onClick={() => navigate(`/meditate/${recommendedMeditation[0].id}`)}
          />
        )}
      </article>
      <SearchField doSearch={setSearchTerm}/>
      {filteredRecommendedYoga.length === 0 && filteredRecommendedMeditation.length === 0 && (
  <p className="text-dark-green font-bold text-center pt-10">
    No Yoga or Meditation sessions match your search. Try adjusting your search.
  </p>
)}
      {filteredRecommendedMeditation.length > 0 && filteredRecommendedYoga.length > 0}
      {filteredRecommendedYoga.length > 1 && (
        <Slider
          headline="Recommended Yoga for you"
          sessions={filteredRecommendedYoga}
          type="yoga"
        />
      )}
      {filteredRecommendedMeditation.length > 1 && (
        <Slider
          headline="Recommended Meditation for you"
          sessions={filteredRecommendedMeditation}
          type="meditate"
        />
      )}
    </section>
  );
};

export default Home;
