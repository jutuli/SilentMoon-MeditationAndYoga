interface ISliderCardProps {
  img: string;
  desc: string;
  title: string;
  level: string;
  duration: string | number;
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
      <article className="flex w-40 flex-col">
        <img
          className="h-30 w-full rounded-xl object-cover object-center"
          src={img}
          alt={desc}
        />
        <h4 className="text-dark-green pt-2 leading-5 font-bold tracking-wider">
          {title}
        </h4>
        <div className="text-gray flex w-full flex-row justify-between pt-2 text-sm uppercase">
          <p>{level}</p>
          <p>{duration} Min</p>
        </div>
      </article>
    </>
  );
};

export default SliderCard;
