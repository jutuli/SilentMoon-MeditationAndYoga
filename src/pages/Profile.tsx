import { Link, useNavigate } from "react-router";
import Headline from "../components/Headline";
import { Logout } from "../components/Logout";
import { ProfileButton } from "../components/ProfileButton";
import { ProfileImage } from "../components/ProfileImage";
import SearchField from "../components/SearchField";
import Slider from "../components/Slider";
import { useMainContext } from "../context/MainProvider";
import RoundButton from "../components/RoundButton";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {

  const navigate = useNavigate()

  const { favouriteSessions, user } = useMainContext();

  const favouriteMeditations = favouriteSessions.filter(
    (session) => session.media_type === "soundcloud",
  );

  const favouriteYoga = favouriteSessions.filter(
    (session) => session.media_type === "youtube",
  );
  if (!user) return;

  const handleSearch = () => {

  }

  return (
    <div className="px-5 pb-25">
      <Headline />
      <Logout />
      <RoundButton content={faCalendarDays} style="bg-cream fixed top-2 left-2 m-2 z-10" onClick={()=>navigate("/reminder")}/>

      
      <div className="pb-10">
      <ProfileImage />
      </div>
   <article className="flex flex-col justify-around gap-5">
      <SearchField doSearch={handleSearch}/>
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
   </article>
    </div>
  );
};

export default Profile;
