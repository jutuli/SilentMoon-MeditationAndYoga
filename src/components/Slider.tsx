import { ISession } from "../interfaces/ISession";
import SliderCard from "./SliderCard";

interface ISliderProps {
  headline: string;
  sessions: ISession[];
  type: string
}

const Slider = ({ headline, sessions, type}: ISliderProps) => {
  return (
    <>
      <article>
        <h2 className="text-dark-green pb-5 text-lg font-bold tracking-wider">
          {headline}
        </h2>
        <article className="carousel flex rounded-box gap-5">
          {sessions.slice(1).map((session) => (
            <div className="carousel-item" key={session.id}>
              <SliderCard
                img={session.image_url}
                desc={session.description}
                title={session.title}
                duration={session.duration.toString()}
                level={session.level}
                id={session.id}
                type={type}
              />
            </div>
          ))}
        </article>
      </article>
    </>
  );
};

export default Slider;
