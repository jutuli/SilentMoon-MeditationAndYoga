import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RoundButton from "../components/RoundButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useMainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";

const SignUp = () => {

    const navigate = useNavigate()

    const {user, setUser, setIsLoggedIn} = useMainContext()

    const userNameRef = useRef<HTMLInputElement>(null)
    const userSurNameRef = useRef<HTMLInputElement>(null)
    const userEmailRef = useRef<HTMLInputElement>(null)
    const userPwRef = useRef<HTMLInputElement>(null)

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const userName = userNameRef.current?.value || ""
        const userSurName = userSurNameRef.current?.value || ""
        const userEmail = userEmailRef.current?.value || ""
        const userPw = userPwRef.current?.value || ""

        console.log(userName);
        console.log(userSurName);
        console.log(userEmail);
        console.log(userPw);

        try {
            const {data, error} = await supabase
            .auth
            .signUp({
                email: userEmail,
                password: userPw,
                options: {
                    data: {
                        first_name: userName,
                        last_name: userSurName
                    }
                }
            })
            console.log("Userdata:", data);
            if (error) {
                console.log("SignUp hat nicht geklappt", error);
            } else {
                console.log(data);
                await setIsLoggedIn(true)
                navigate("/welcome")
            }
        } catch (e) {
            console.log(e);
        }

        

        if (user) {
            setUser({
                ...user,
                first_name: userName,
                last_name: userSurName,
                email: userEmail,
                password: userPw
            })
        }
        //hier erstmal Null
        console.log(user);
    }

    return ( 
        <>
        <section className="p-5">
            <RoundButton style="border border-cream border-2 text-dark-green" content={faArrowLeft} onClick={()=>navigate(-1)}/>
        <h1 className="text-3xl font-bold text-center text-dark-green py-15 tracking-widest ">Create your account</h1>
        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <input className="tracking-widest border border-pink w-full cursor-pointer rounded-full py-4 uppercase text-center" type="text" placeholder="Name" ref={userNameRef}/>
        <input className="tracking-widest border border-pink w-full cursor-pointer rounded-full py-4 uppercase text-center" type="text" placeholder="Surname" ref={userSurNameRef}/>
            <input className="tracking-widest border border-pink w-full cursor-pointer rounded-full py-4 uppercase text-center" type="email" placeholder="Email" ref={userEmailRef}/>
            <input className="tracking-widest border border-pink w-full cursor-pointer text-center rounded-full py-4 uppercase" type="password" placeholder="Password" ref={userPwRef}/>
            <Button text="Register"/>

        </form>
        </section>
        </>
     );
}
 
export default SignUp;