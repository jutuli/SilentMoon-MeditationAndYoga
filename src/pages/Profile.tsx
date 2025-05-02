import { useNavigate } from "react-router";
import Headline from "../components/Headline";
import { Logout } from "../components/Logout";
import { ProfileImage } from "../components/ProfileImage";
import SearchField from "../components/SearchField";
import Slider from "../components/Slider";
import { useMainContext } from "../context/MainProvider";
import RoundButton from "../components/RoundButton";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { favouriteSessions, user, setReminderOrigin } = useMainContext();

  const filteredFavourites = favouriteSessions.filter((session) => {
    return (
      !searchTerm ||
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const favouriteMeditations = filteredFavourites.filter(
    (session) => session.media_type === "soundcloud",
  );

  const favouriteYoga = filteredFavourites.filter(
    (session) => session.media_type === "youtube",
  );
  if (!user) return;

  return (
    <div className="px-5 pb-25">
      <Headline />
      <Logout />
      <RoundButton
        content={faCalendarDays}
        style="bg-cream fixed top-2 left-2 m-2 z-10"
        onClick={() => {
          navigate("/reminder");
          setReminderOrigin("profile");
        }}
      />

      <div className="pb-10">
        <ProfileImage />
      </div>
      
      <article className="flex flex-col justify-around gap-5">
        <SearchField doSearch={setSearchTerm} />
        {favouriteYoga.length === 0 && favouriteMeditations.length === 0 ? (
  <p className="text-dark-green font-bold text-center py-10">
    No matching Yoga or Meditation sessions found. Try adjusting your search.
  </p>
): (<article>
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
  </article>)}
       
      </article>
    </div>
  );
};

export default Profile;
