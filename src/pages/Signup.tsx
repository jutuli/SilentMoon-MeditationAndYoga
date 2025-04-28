import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RoundButton from "../components/RoundButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {

    const navigate = useNavigate()

    return ( 
        <>
        <section className="p-5">
            <RoundButton style="border border-cream border-2 text-dark-green" content={faArrowLeft} onClick={()=>navigate(-1)}/>
        <h1 className="text-3xl font-bold text-center text-dark-green py-15 tracking-widest ">Create your account</h1>
        <form className="flex flex-col gap-3">
        <input className="tracking-widest border border-pink w-full cursor-pointer rounded-full py-4 uppercase text-center" type="text" placeholder="Name"/>
        <input className="tracking-widest border border-pink w-full cursor-pointer rounded-full py-4 uppercase text-center" type="text" placeholder="Surname"/>
            <input className="tracking-widest border border-pink w-full cursor-pointer rounded-full py-4 uppercase text-center" type="email" placeholder="Email"/>
            <input className="tracking-widest border border-pink w-full cursor-pointer text-center rounded-full py-4 uppercase" type="password" placeholder="Password"/>
            <Button text="Register"/>

        </form>
        </section>
        </>
     );
}
 
export default SignUp;