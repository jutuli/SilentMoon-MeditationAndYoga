import {
  faDownload,
  faHeart,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import RoundButton from "./RoundButton";
import { useState } from "react";

interface IDetailNavProps {
  buttonLeft: IconDefinition;
  onBackClick: () => void;
  onFavoriteClick: () => void;
}

const DetailNav = ({
  buttonLeft,
  onBackClick,
  onFavoriteClick,
}: IDetailNavProps) => {
  return (
    <>
      <article className="absolute top-0 flex w-full justify-between p-5">
        <RoundButton
          content={buttonLeft}
          style="bg-cream text-dark-green"
          onClick={onBackClick}
        />
        <RoundButton
          content={faHeart}
          style="bg-pink text-cream"
          onClick={onFavoriteClick}
        />
      </article>
    </>
  );
};

export default DetailNav;
