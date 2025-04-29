import RoundButton from "./RoundButton";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface IPlayButton {
  title: string | undefined;
  duration: number | undefined;
  onClick: () => void;
}

const PlayButton = ({ title, duration, onClick }: IPlayButton) => {
  return (
    <div className="play-button cursor-pointer" onClick={onClick}>
      <article className="flex gap-10 pb-5">
        <RoundButton content={faPlay} style="border border-gray text-gray" />
        <div className="flex flex-col gap-1">
          <p className="text-dark-green font-bold">{title}</p>
          <p className="text-gray text-xs uppercase">{duration} Min</p>
        </div>
      </article>
      <div className="bg-light-gray h-px w-full opacity-20"></div>
    </div>
  );
};

export default PlayButton;
