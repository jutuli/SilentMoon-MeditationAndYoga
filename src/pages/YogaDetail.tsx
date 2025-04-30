import { faPlay, faX } from "@fortawesome/free-solid-svg-icons";
import DetailNav from "../components/DetailNav";
import DetailText from "../components/DetailText";
import RoundButton from "../components/RoundButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { ISession } from "../interfaces/ISession";
import NotFound from "./NotFound";

const YogaDetail = () => {
  const { yogaParams } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //habs wie in Yoga.tsx genannt
  const [session, setSession] = useState<ISession | null>();

  const fetchYogaDetail = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", `${yogaParams}`);
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
  }, [yogaParams]);

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

  return (
    <>
      <section className="pb-20">
        <article className="relative pb-10">
          <img
            className="h-100 w-full rounded-b-lg object-cover object-center"
            src={session.image_url}
            alt={session.title}
          />
          <DetailNav
            buttonLeft={faX}
            onBackClick={() => navigate("/yoga")}
            session_id={session.id}
          />
          <div className="absolute top-50 left-1/2 -translate-x-1/2 transform">
            <Link to={`/yoga/${session?.id}/video`}>
              <RoundButton
                content={faPlay}
                style="border border-cream text-cream"
              />
            </Link>
          </div>
        </article>
        <article className="flex flex-col">
          <DetailText
            title={session.title}
            type="Yoga"
            desc={session.description}
          />
        </article>
      </section>
    </>
  );
};

export default YogaDetail;
