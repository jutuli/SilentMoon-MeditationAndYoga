import { faCross, faPlay, faSun, faX } from "@fortawesome/free-solid-svg-icons";
import DetailNav from "../components/DetailNav";
import DetailText from "../components/DetailText";
import RoundButton from "../components/RoundButton";
import { Link } from "react-router-dom";

const YogaDetail = () => {
    return ( 
        <>
         <section>
            <article className="relative pb-10">
                <img className="h-120 w-full object-cover object-center rounded-b-lg" src="/img/evening2.jpg" alt="description" />
                <DetailNav buttonLeft={faX}/>
                <div className="absolute top-60 left-1/2 transform -translate-x-1/2">
                    <Link to={""}><RoundButton content={faPlay} style="border border-cream text-cream"/></Link>
                </div>
            </article>
            <article className="flex flex-col">
            <DetailText title="Title Yoga" type="Yoga" desc="Description of Yoga Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non dolores neque repudiandae quia quas ipsum molestiae dolore."/>
            </article>
        </section>
        </>
     );
}
 
export default YogaDetail;