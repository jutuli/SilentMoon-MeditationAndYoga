import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RoundButton from "../components/RoundButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useMainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";

const SignUp = () => {
  const { setUser, setIsLoggedIn, setAuthOrigin} = useMainContext();

  const userNameRef = useRef<HTMLInputElement>(null);
  const userSurNameRef = useRef<HTMLInputElement>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPwRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userName = userNameRef.current?.value || "";
    const userSurName = userSurNameRef.current?.value || "";
    const userEmail = userEmailRef.current?.value || "";
    const userPw = userPwRef.current?.value || "";

    console.log(userName);
    console.log(userSurName);
    console.log(userEmail);
    console.log(userPw);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPw,
        options: {
          data: {
            email: userEmail,
            first_name: userName,
            last_name: userSurName,
          },
        },
      });
      console.log("Userdata:", data);
      const userId = data.user?.id;

      if (error || !userId) {
        console.warn("SignUp hat nicht geklappt", error);
      } else {
        console.log(data);
        setUser({
          ...data.user,
          id: userId,
          email: userEmail,
          first_name: userName,
          last_name: userSurName,
        });
        setIsLoggedIn(true);
        //für untersch. Pfade
        setAuthOrigin("signup")
        navigate("/welcome");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <section className="p-5">
        <RoundButton
          style="border border-cream border-2 text-dark-green"
          content={faArrowLeft}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-dark-green py-15 text-center text-3xl font-bold tracking-widest">
          Create your account
        </h1>
        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          <input
            className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
            type="text"
            placeholder="Name"
            ref={userNameRef}
          />
          <input
            className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
            type="text"
            placeholder="Surname"
            ref={userSurNameRef}
          />
          <input
            className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
            type="email"
            placeholder="Email"
            ref={userEmailRef}
          />
          <input
            className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
            type="password"
            placeholder="Password"
            ref={userPwRef}
          />
          <Button text="Register" />
        </form>
      </section>
    </>
  );
};

export default SignUp;
