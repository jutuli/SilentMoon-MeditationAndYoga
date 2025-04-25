import HomeCard from "../components/HomeCard";
import Slider from "../components/Slider";

const Home = () => {
  return<section className="px-5 flex flex-col gap-5">
    <p>Silent Moon Komp</p>
  <article>
    <h2 className="font-bold text-dark-green text-lg tracking-wider">Good morning user</h2>
    <p className="text-gray text-xs">We hope you have a good day</p>
  </article>
  <article className="flex flex-row justify-around gap-5">
    <HomeCard title="Yoga" img="/img/evening2.jpg" level="beginner" duration="3" textColor="text-cream" bgColorButton="bg-cream"textColorButton="text-dark-green"/>
  <HomeCard title="Meditation" img="/img/evening2.jpg" level="Expert" duration="3" textColorButton="text-cream"  textColor="text-dark-green" bgColorButton="bg-dark-green"/>
  </article>
  <div>Suchleiste</div>
  <Slider headline="Recommended Yoga for you"/>
  <Slider headline="Recommended Meditation for you"/>
  </section>
  ;
};

export default Home;
