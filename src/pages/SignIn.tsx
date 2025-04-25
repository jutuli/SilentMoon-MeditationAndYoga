import { Link } from "react-router-dom";
import Button from "../components/Button";
import RoundButton from "../components/RoundButton";
import { faArrowLeft, faSun } from '@fortawesome/free-solid-svg-icons';


const SignIn = () => {

    return ( 
        <section className="p-5">
            <RoundButton style="border border-cream border-2 text-dark-green" content={faArrowLeft}/>
        <h1 className="text-3xl font-bold text-center text-dark-green py-15 tracking-widest">Welcome back!</h1>
        <form className="flex flex-col gap-3">
            <input className="tracking-widest border border-pink w-full cursor-pointer rounded-full py-4 uppercase text-center" type="email" placeholder="Email"/>
            <input className="tracking-widest border border-pink w-full cursor-pointer text-center rounded-full py-4 uppercase" type="password" placeholder="Password"/>
            <Button text="Login"/>
            <div className="flex flex-row justify-center gap-3">
            <p className="text-gray uppercase tracking-widest">Don't have an Account yet?</p>
            <Link to={"/signup"} className="text-pink uppercase">Sign up</Link>
        </div>
        </form>
        </section>
     );
}
 
export default SignIn;