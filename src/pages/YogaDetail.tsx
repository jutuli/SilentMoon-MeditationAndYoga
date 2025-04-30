import { faPlay, faX } from "@fortawesome/free-solid-svg-icons";
import DetailNav from "../components/DetailNav";
import DetailText from "../components/DetailText";
import RoundButton from "../components/RoundButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import { ISession } from "../interfaces/ISession";

const YogaDetail = () => {
  const { yogaParams } = useParams();
  const navigate = useNavigate();

  //habs wie in Yoga.tsx genannt
  const [session, setSession] = useState<ISession | null>();

  const fetchYogaDetail = async () => {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", `${yogaParams}`);
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

  console.log(session);

  return (
    <>
      <section className="pb-20">
        <article className="relative pb-10">
          <img
            className="h-100 w-full rounded-b-lg object-cover object-center"
            src={session?.image_url}
            alt={session?.title}
          />
          <DetailNav
            buttonLeft={faX}
            onBackClick={() => navigate("/yoga")}
            onFavoriteClick={() => console.log("favorited Session")}
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
            title={session?.title}
            type="Yoga"
            desc={session?.description}
          />
        </article>
      </section>
    </>
  );
};

export default YogaDetail;
