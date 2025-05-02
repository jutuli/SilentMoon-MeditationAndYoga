import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useMainContext } from "../context/MainProvider";

const Welcome = () => {
  const { user, authOrigin, setReminderOrigin } = useMainContext();

  //je nachdem wo man her kommt geht es untersch Pfad
  const targetPath = authOrigin === "signup" ? "/reminder" : "/initialfilter";

  return (
    <>
      <article className="relative">
        <img
          className="w-screen"
          src="/img/Vector.png"
          alt="Person doing a Yoga Pose"
        />
        <h1 className="absolute top-30 left-20 text-3xl font-bold tracking-widest text-white">
          Hi {user?.first_name},<br /> welcome <br /> to Silent <br /> Moon
        </h1>
        <p className="absolute top-0 left-1/2 -translate-x-1/2 transform pt-5 font-medium tracking-widest text-white uppercase">
          Silent moon
        </p>
      </article>
      <div className="px-5 py-15">
        <Link to={targetPath} onClick={() => setReminderOrigin("welcome")}>
          <Button text="Get started" />
        </Link>
      </div>
    </>
  );
};

export default Welcome;
