import SliderCard from "./SliderCard";

interface ISliderProps {
    headline: string
}

const Slider = ({headline}: ISliderProps) => {
    return ( 
        <>
        <article>
            <h2 className="font-bold text-dark-green text-lg tracking-wider pb-5">Recommended Yoga for you</h2>
            <article className="carousel rounded-box w-full">
                {/* div mappen */}
            <div className="carousel-item">
            <SliderCard img="/img/evening2.jpg" desc="" title="title" duration="dauer" level="level"/>
            </div>
            </article>
        </article>
        </>
     );
}
 
export default Slider;