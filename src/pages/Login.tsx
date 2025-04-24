import { Link} from "react-router-dom";
import Button from "../components/Button";




const Login = () => {
    return ( 
        <>
        <article className="relative">
            <img className="w-screen" src="/img/Union.png" alt="Person doing a handstand" />
            <p className="absolute top-0 left-1/2 transform -translate-x-1/2 pt-5 text-dark-green tracking-widest uppercase font-medium">Silent Moon</p>
        </article>
        <article className="flex flex-col gap-5 px-5 pb-20">
        <div className="flex flex-col gap-5 px-10">
        <h1 className="text-3xl font-medium text-center text-dark-green">We are what we do</h1>
        <p className="text-center text-gray">Thousand of people are using silent moon  
        for meditation and yoga classes.</p>
        </div>
        <Link to={"/signup"}><Button text="Sign up"/></Link>
        <div className="flex flex-row justify-center gap-3 tracking-widest">
            <p className="text-gray uppercase">Already have an account?</p>
            <Link to={"/signin"} className="text-pink uppercase">Log in</Link>
        </div>
        </article>
        </>
     );
}
 
export default Login;