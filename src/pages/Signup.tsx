import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RoundButton from "../components/RoundButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useMainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";

const SignUp = () => {
  const { setUser, setIsLoggedIn, setAuthOrigin } = useMainContext();

  const userNameRef = useRef<HTMLInputElement>(null);
  const userSurNameRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpError, setSignUpError] = useState<string>();

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userName = userNameRef.current?.value || "";
    const userSurName = userSurNameRef.current?.value || "";

    if (!email) {
      setSignUpError("Please provide an email to create an account!");
      return;
    }
    if (!password) {
      setSignUpError("Please provide a password to create an account!");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            email: email,
            first_name: userName,
            last_name: userSurName,
          },
        },
      });
      console.log("Userdata:", data);
      const userId = data.user?.id;

      if (error || !userId) {
        console.warn("SignUp hat nicht geklappt", { error });
        if (error?.code === "user_already_exists") {
          setSignUpError("Email already in use, please try another one.");
        }
        if (error?.code === "weak_password") {
          setSignUpError("Password should be at least 6 characters.");
        }
      } else {
        console.log(data);
        setUser({
          ...data.user,
          id: userId,
          email: email,
          first_name: userName,
          last_name: userSurName,
        });
        setIsLoggedIn(true);
        //für untersch. Pfade
        setAuthOrigin("signup");
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
            required
          />
          <input
            className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
            type="text"
            placeholder="Surname"
            ref={userSurNameRef}
            required
          />
          <input
            className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSignUpError(undefined);
            }}
            required
          />
          <input
            className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setSignUpError(undefined);
            }}
            required
          />
          {signUpError && (
            <div className="text-center text-red-700 italic">{signUpError}</div>
          )}
          <Button text="Register" />
        </form>
      </section>
    </>
  );
};

export default SignUp;
