interface IHomeCardProps {
  img: string;
  title: string;
  level: string;
  duration: string;
  onClick: () => void;
}

const HomeCard = ({ title, img, level, duration, onClick }: IHomeCardProps) => {
  return (
    <article
      className="relative h-[160px] w-100 overflow-hidden rounded-xl"
      onClick={onClick}
    >
      <img
        className="h-full w-full object-cover object-center"
        src={img}
        alt="desc"
      />
      <article
        className={`absolute top-4 left-5 z-10 flex w-full flex-col justify-between`}
      >
        <div className={`text-cream w-20 tracking-wider`}>
          <h4 className="font-bold">{title}</h4>
          <p className="text-xs uppercase">{level}</p>
        </div>
        <p className="text-cream pt-5 pr-4 text-xs uppercase">{duration} Min</p>
      </article>
    </article>
  );
};

export default HomeCard;
