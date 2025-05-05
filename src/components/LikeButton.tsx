import { unlikeSession, likeSession } from "../api/favourites";
import { useMainContext } from "../context/MainProvider";
import RoundButton from "./RoundButton";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Props {
  session_id: string;
}

export const LikeButton: React.FunctionComponent<Props> = ({ session_id }) => {
  const { favourites, updateFavourites, user } = useMainContext();

  const isLiked: boolean = favourites.some(
    (favourite) => favourite.session_id === session_id,
  );


  const handleLike = async () => {
    if (!user) {
      return;
    }
    if (isLiked) {
      unlikeSession(session_id).then(() => {
        updateFavourites();
      });
    } else {
      likeSession(session_id, user.id).finally(() => {
        updateFavourites();
      });
    }
  };

  return (
    <RoundButton
      style={isLiked ? "bg-pink text-cream" :  "bg-cream text-pink"}
      content={faHeart}
      onClick={handleLike}
    />
  );
};
