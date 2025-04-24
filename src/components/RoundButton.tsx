import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface IRoundButtonProps {
    style: string
    content: IconProp
}

const RoundButton = ({style, content}: IRoundButtonProps) => {

    const navigate = useNavigate()

    return ( 
        
    <>
    <button onClick={()=>navigate(-1)} className={`${style} rounded-full px-3 py-2`}><FontAwesomeIcon icon={content} /></button>
    </> );
}
 
export default RoundButton;