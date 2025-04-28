import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface IRoundButtonProps {
    style: string
    content: IconProp
    onClick?: () => void
}

const RoundButton = ({style, content, onClick}: IRoundButtonProps) => {


    return ( 
        
    <>
    <button onClick={onClick} className={`${style} rounded-full w-12 h-12 flex justify-center items-center cursor-pointer`}><FontAwesomeIcon icon={content} /></button>
    </> );
}
 
export default RoundButton;