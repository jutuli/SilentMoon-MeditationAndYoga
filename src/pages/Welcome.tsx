import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useMainContext } from "../context/MainProvider";

const Welcome = () => {

    const {user, authOrigin} = useMainContext()


    //je nachdem wo man her kommt geht es untersch Pfad
  const targetPath = authOrigin === "signup" ? "/reminder" : "/initialfilter";

    return ( 
        <>
        <article className="relative">
            <img className="w-screen" src="/img/Vector.png" alt="Person doing a Yoga Pose" />
            <h1 className="absolute left-20 top-30 text-white font-bold text-3xl tracking-widest">Hi {user?.first_name},<br/> welcome <br/> to Silent <br/> Moon</h1>
            <p className="absolute top-0 left-1/2 transform -translate-x-1/2 pt-5 text-white uppercase tracking-widest font-medium">Silent moon</p>
        </article>
        <div className="px-5 py-15">
        <Link to={targetPath}><Button text="Get started"/></Link>
        </div>
        </>
     );
}
 
export default Welcome;
