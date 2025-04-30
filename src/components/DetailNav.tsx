import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import RoundButton from "./RoundButton";

import { LikeButton } from "./LikeButton";

interface IDetailNavProps {
  buttonLeft: IconDefinition;
  onBackClick: () => void;
  session_id?: string;
}

const DetailNav = ({
  buttonLeft,
  onBackClick,
  session_id,
}: IDetailNavProps) => {
  return (
    <>
      <article className="absolute top-0 z-20 flex w-full justify-between p-5">
        <RoundButton
          content={buttonLeft}
          style="bg-cream text-dark-green"
          onClick={onBackClick}
        />
        {session_id && <LikeButton session_id={session_id} />}
      </article>
    </>
  );
};

export default DetailNav;
