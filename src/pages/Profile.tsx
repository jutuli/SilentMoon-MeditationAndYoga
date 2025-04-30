import { Link } from "react-router";
import Headline from "../components/Headline";
import { Logout } from "../components/Logout";
import { ProfileButton } from "../components/ProfileButton";
import { ProfileImage } from "../components/ProfileImage";
import SearchField from "../components/SearchField";
import Slider from "../components/Slider";
import { useMainContext } from "../context/MainProvider";

const Profile = () => {
  const { favouriteSessions, user } = useMainContext();

  const favouriteMeditations = favouriteSessions.filter(
    (session) => session.media_type === "soundcloud",
  );

  const favouriteYoga = favouriteSessions.filter(
    (session) => session.media_type === "youtube",
  );
  if (!user) return;

  return (
    <div className="mx-1">
      <Headline />
      <Logout />

      {/* <SearchField /> */}
      <ProfileImage />
      <div>
        <Slider
          headline="Favourite Yoga Sessions"
          sessions={favouriteYoga}
          type="Yoga"
        />
      </div>

      <div>
        <h1></h1>
        <Slider
          headline="Favourite Meditations"
          type="meditate"
          sessions={favouriteMeditations}
        />
      </div>
      <Link to="reminder">
        <ProfileButton name="Reminder" />
      </Link>
    </div>
  );
};

export default Profile;
