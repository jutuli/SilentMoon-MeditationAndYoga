interface ISliderCardProps {
    img: string,
    desc: string,
    title: string,
    level: string,
    duration: string
}

const SliderCard = ({img, desc, title, level, duration}: ISliderCardProps) => {



    return ( 
    <>
    <article className="flex flex-col w-40">
        <img className="w-full rounded-xl" src={img} alt={desc} />
        <h4 className="font-bold pt-3 text-dark-green tracking-wider">{title}</h4>
        <div className="flex flex-row text-gray justify-between w-full uppercase text-sm">
            <p>{level}</p>
            <p>{duration} Min</p>
        </div>
    </article>
    </> );
}
 
export default SliderCard;