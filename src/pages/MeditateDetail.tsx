
import PlayButton from "../components/PlayButton";

import DetailNav from "../components/DetailNav";
import DetailText from "../components/DetailText";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MeditateDetail = () => {



    return ( 
        <section>
            <article className="relative pb-10">
                <img className="h-70 w-full object-cover object-center rounded-b-lg" src="/img/evening2.jpg" alt="description" />
                <DetailNav buttonLeft={faArrowLeft}/>
            </article>
            <article className="flex flex-col">
            <DetailText title="Title Meditation" type="Meditation" desc="Description of Meditation Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non dolores neque repudiandae quia quas ipsum molestiae dolore."/>
            <article className="px-5">
        <h2 className="text-dark-green font-bold tracking-wider pb-5">Play meditation</h2>
        <PlayButton/>
            </article>
            </article>
        </section>
     );
}
 
export default MeditateDetail;