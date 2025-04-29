export interface ISliderCardProps {
  img: string;
  desc: string;
  title: string;
  level: string;
  duration: number;
}

const SliderCard = ({
  img,
  desc,
  title,
  level,
  duration,
}: ISliderCardProps) => {
  return (
    <>
      <article className="p-2">
        <img className="w-40 rounded-xl" src={img} alt={desc} />
        <h4 className="text-dark-green pt-3 font-bold tracking-wider">
          {title}
        </h4>
        <div className="text-gray flex w-full flex-row justify-between text-sm uppercase">
          <p>{level}</p>
          <p>{duration} Min</p>
        </div>
      </article>
    </>
  );
};

export default SliderCard;
