import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RoundButton from "../components/RoundButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import supabase from "../utils/supabase";

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      navigate("/welcome");
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <section className="p-5">
      <RoundButton
        style="border border-cream border-2 text-dark-green"
        content={faArrowLeft}
        onClick={() => navigate(-1)}
      />
      <h1 className="text-dark-green py-15 text-center text-3xl font-bold tracking-widest">
        Welcome back!
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <input
          className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
          type="email"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <Button text="Login" />
        <div className="flex flex-row justify-center gap-3">
          <p className="text-gray tracking-widest uppercase">
            Don't have an Account yet?
          </p>
          <Link to={"/signup"} className="text-pink uppercase">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
