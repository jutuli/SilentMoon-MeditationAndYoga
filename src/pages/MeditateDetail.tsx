import PlayButton from "../components/PlayButton";

import DetailNav from "../components/DetailNav";
import DetailText from "../components/DetailText";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { ISession } from "../interfaces/ISession";

const MeditateDetail = () => {
  const navigate = useNavigate();

  const { meditateParams } = useParams();

  //habs wie in Yoga.tsx genannt
  const [session, setSession] = useState<ISession | null>();
  const [favorite, setFavorite] = useState(false);

  const fetchYogaDetail = async () => {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", `${meditateParams}`);
    //setSession(data)
    if (error) {
      console.log(error);
    } else {
      setSession(data[0]);
    }
  };

  useEffect(() => {
    fetchYogaDetail();
  }, []);

  const handlePlayClick = () => {
    navigate(`/meditate/${meditateParams}/audio`);
  };

  const handleBackClick = () => {
    navigate(`/meditate`);
  };

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  return (
    <section>
      <article className="relative pb-10">
        <img
          className="h-70 w-full rounded-b-lg object-cover object-center"
          src={session?.image_url}
          alt="description"
        />
        <DetailNav
          buttonLeft={faArrowLeft}
          onBackClick={handleBackClick}
          onFavoriteClick={handleFavoriteClick}
        />
      </article>
      <article className="flex flex-col">
        <DetailText
          title={session?.title}
          type="Meditation"
          desc={session?.description}
        />
        <article className="px-5">
          <h2 className="text-dark-green pb-5 font-bold tracking-wider">
            Play meditation
          </h2>
          <PlayButton
            title={session?.title}
            duration={session?.duration}
            onClick={handlePlayClick}
          />
        </article>
      </article>
    </section>
  );
};

export default MeditateDetail;
