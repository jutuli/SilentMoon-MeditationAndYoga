
import PlayButton from "../components/PlayButton";

import DetailNav from "../components/DetailNav";
import DetailText from "../components/DetailText";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ISession } from "./Yoga";
import supabase from "../utils/supabase";

const MeditateDetail = () => {

    const {meditateParams} = useParams()

    //habs wie in Yoga.tsx genannt
    const [session, setSession] = useState<ISession | null>();

    const fetchYogaDetail = async () => {
        const {data, error} = await supabase
        .from("sessions")
        .select("*")
        .eq("id", `${meditateParams}`);
        //setSession(data)
        if (error) {
            console.log(error);
        } else {
            setSession(data[0]);
        }
    }

    useEffect(()=> {
        fetchYogaDetail()
    }, [])


    return ( 
        <section>
            <article className="relative pb-10">
                <img className="h-70 w-full object-cover object-center rounded-b-lg" src={session?.image_url} alt="description" />
                <DetailNav buttonLeft={faArrowLeft}/>
            </article>
            <article className="flex flex-col">
            <DetailText title={session?.title} type="Meditation" desc={session?.description}/>
            <article className="px-5">
        <h2 className="text-dark-green font-bold tracking-wider pb-5">Play meditation</h2>
        <PlayButton title={session?.title} duration={session?.duration}/>
            </article>
            </article>
        </section>
     );
}
 
export default MeditateDetail;