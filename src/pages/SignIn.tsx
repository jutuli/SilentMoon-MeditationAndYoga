import RoundButton from "../components/RoundButton";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const SignIn = () => {


    return ( 
        <section className="p-5">
            <RoundButton style="border border-light-yellow border-2" content={faArrowLeft}/>
        <h1 className="text-3xl font-bold text-center text-dark-gray py-15">Welcome back!</h1>
        </section>
     );
}
 
export default SignIn;