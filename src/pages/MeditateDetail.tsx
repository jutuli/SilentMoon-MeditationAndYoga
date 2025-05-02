import PlayButton from "../components/PlayButton";

import DetailNav from "../components/DetailNav";
import DetailText from "../components/DetailText";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { ISession } from "../interfaces/ISession";
import NotFound from "./NotFound";

const MeditateDetail = () => {
  const navigate = useNavigate();

  const { meditateParams } = useParams();

  //habs wie in Yoga.tsx genannt
  const [session, setSession] = useState<ISession | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchYogaDetail = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", `${meditateParams}`);
    //setSession(data)
    if (error) {
      console.log(error);
      setNotFound(true);
    } else if (data && data.length > 0) {
      setSession(data[0]);
      setIsLoading(false);
    } else {
      setNotFound(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchYogaDetail();
  }, [meditateParams]);

  if (isLoading) {
    return (
      <div className="text-dark-green flex flex-1 items-center justify-center text-center font-bold">
        Lädt... <br />
        🧘‍♂️{" "}
      </div>
    );
  }

  // NotFound anzeigen, wenn keine Session gefunden wurde
  if (notFound || !session) {
    return <NotFound />;
  }

  const handlePlayClick = () => {
    navigate(`/meditate/${meditateParams}/audio`);
  };

  const handleBackClick = () => {
    navigate(`/meditate`);
  };

  return (
    <section>
      <article className="relative pb-10">
        <img
          className="h-80 w-full rounded-b-lg object-cover object-center"
          src={session?.image_url}
          alt="description"
        />
        <DetailNav
          buttonLeft={faArrowLeft}
          onBackClick={handleBackClick}
          session_id={session.id}
        />
      </article>
      <article className="flex flex-col">
        <DetailText
          title={session.title}
          type="Meditation"
          desc={session.description}
        />
        <article className="px-5">
          <h2 className="text-dark-green pb-5 font-bold tracking-wider">
            Play meditation
          </h2>
          <PlayButton
            title={session.title}
            duration={session.duration}
            onClick={handlePlayClick}
          />
        </article>
      </article>
    </section>
  );
};

export default MeditateDetail;
