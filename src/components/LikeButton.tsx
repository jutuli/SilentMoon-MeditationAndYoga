import { unlikeSession, likeSession } from "../api/favourites";
import { useMainContext } from "../context/MainProvider";
import RoundButton from "./RoundButton";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Props {
  session_id: string;
  user_id?: string;
}

export const LikeButton: React.FunctionComponent<Props> = ({
  session_id,
  
}) => {
  const { favourites, updateFavourites } = useMainContext();

  const isLiked: boolean = favourites.some(
    (favourite) => favourite.session_id === session_id,
  );
  console.log("LikeButton:", favourites);

  const handleLike = () => {
    if (isLiked) {
      unlikeSession(session_id);
      updateFavourites();
    } else {
      likeSession(session_id);
      updateFavourites();
    }
  };

  return (
    <>
      <RoundButton
        style={isLiked ? "text-red-500" : "text-gray-200"}
        content={faHeart}
        onClick={handleLike}
      />
    </>
  );
};
