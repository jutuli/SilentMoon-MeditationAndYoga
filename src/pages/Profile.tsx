import { Carousel } from "../components/Carousel";
import Headline from "../components/Headline";
import { Logout } from "../components/Logout";
import SearchField from "../components/SearchField";

import SliderCard, { ISliderCardProps } from "../components/SliderCard";
import { useMainContext } from "../context/MainProvider";

const Profile = () => {
  //fetch über die Fav.SupaBase Table
  const { favouriteSessions, user } = useMainContext();

  const favouriteMeditations: ISliderCardProps[] = [];
  console.log(user);
  

  return (
    <div className="mx-1">
      <Headline />
      <Logout />
      <div className="flex gap-5">
        <img src={undefined} alt="hier kommt ein profilbild hin" />
        <h1 className="border-2 border-pink-400">{user?.first_name}</h1>
      </div>
      <SearchField />

      <div>
        <h1 className="text-dark-green pb-5 text-lg font-bold tracking-wider">
          Favourite Yoga Sessions
        </h1>
        <Carousel
          placeholder="Add things here by liking a session"
          items={favouriteSessions.map((item) => (
            <SliderCard
              {...item}
              img={item.image_url}
              desc={item.description}
              title={item.title}
              level={item.level}
              duration={item.duration}
            />
          ))}
        />
      </div>

      <div>
        <h1>Favourite Meditations</h1>
        <Carousel
          placeholder="Add things here by liking a session"
          items={favouriteMeditations.map((item) => (
            <SliderCard {...item} />
          ))}
        />
      </div>
    </div>
  );
};

export default Profile;
