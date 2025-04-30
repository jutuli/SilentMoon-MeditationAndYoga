import { ISession } from "../interfaces/ISession";
import SliderCard from "./SliderCard";

interface ISliderProps {
  headline: string;
  sessions: ISession[];
}

const Slider = ({ headline, sessions }: ISliderProps) => {
  return (
    <>
      <article>
        <h2 className="text-dark-green pb-5 text-lg font-bold tracking-wider">
          {headline}
        </h2>
        <article className="carousel carousel-center rounded-box">
          {sessions.slice(1).map((session) => (
            <div className="carousel-item" key={session.id}>
              <SliderCard
                img={session.image_url}
                desc={session.description}
                title={session.title}
                duration={session.duration.toString()}
                level="level"
              />
            </div>
          ))}
        </article>
      </article>
    </>
  );
};

export default Slider;
