import { Link } from "react-router-dom";

interface ISliderCardProps {
  img: string;
  desc: string;
  title: string;
  level: string;
  duration: string | number;
  id: string
  type: string
}


const SliderCard = ({
  img,
  desc,
  title,
  level,
  duration,
  id,
  type
}: ISliderCardProps) => {
  return (
    <Link to={`/${type}/${id}`}>
      <article className="w-40 flex flex-col">
        <img
          className="h-30 rounded-xl object-cover object-center"
          src={img}
          alt={desc}
        />
        
        <div className="flex flex-col justify-between h-20">
        <h4 className=" text-dark-green pt-2 leading-5 font-bold tracking-wider">
          {title}
        </h4>
        <div className="text-gray flex w-full flex-row justify-between pt-2 text-sm uppercase">
          <p>{level}</p>
          <p>{duration} Min</p>
        </div>
        </div>
        
      </article>
    </Link>
  );
};

export default SliderCard;
