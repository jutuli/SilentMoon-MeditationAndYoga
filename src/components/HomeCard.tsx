import { Link } from "react-router-dom";

interface IHomeCardProps {
    img: string,
    title: string,
    level: string,
    duration: string,
    textColor: string,
    bgColorButton: string,
    textColorButton: string
}

const HomeCard = ({title, img, level, duration, textColor, bgColorButton, textColorButton}: IHomeCardProps) => {
    return ( 
        <article className="h-[200px] overflow-hidden relative rounded-xl">
            <img className="w-full h-full object-cover object-center" src={img} alt="desc" />
           <article className={`absolute z-10 top-15 left-5 w-full`}>
           <div className={`${textColor} w-20 tracking-wider`}>
           <h4 className="font-bold">{title}</h4>
           <p className="uppercase text-xs">{level}</p>
           </div>
           <div className="flex flex-row justify-between text-xs pt-12 pr-10 uppercase items-center">
            <p className="text-cream">{duration} Min</p>
            <Link to="" className={`${bgColorButton} ${textColorButton} py-2 px-3 rounded-2xl`}>Start</Link>
           </div>
           </article>
        </article>
     );
}
 
export default HomeCard;