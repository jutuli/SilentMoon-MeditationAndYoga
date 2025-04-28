import { faArrowLeft, faDownload, faHeart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import RoundButton from "./RoundButton";
import { useNavigate } from "react-router-dom";


interface IDetailNavProps {
    buttonLeft: IconDefinition
}

const DetailNav = ({buttonLeft}: IDetailNavProps) => {

    const navigate = useNavigate()

    return ( 
        <>
        <article className="absolute top-0 flex justify-between w-full p-5">
                    <div className="">
                    <RoundButton content={buttonLeft} style="bg-cream text-dark-green" onClick={()=>navigate(-1)}/>
                    </div>
                    <div className="flex gap-3">
                    <RoundButton content={faHeart} style="bg-pink text-cream"/>
                    <RoundButton content={faDownload} style="bg-pink text-cream"/>
                    </div>
                </article>
        </>
     );
}
 
export default DetailNav;