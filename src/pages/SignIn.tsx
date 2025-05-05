import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RoundButton from "../components/RoundButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useMainContext } from "../context/MainProvider";

const SignIn = () => {
  const { setUser, setAuthOrigin } = useMainContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setLoginError("Please provide your email adress to log in.");
      return;
    }
    if (!password) {
      setLoginError("Please provide your password to log in.");
      return;
    }

    try {
      const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
 

      if (!response.error) {
        const user = response.data.user;
        const identity = user?.identities?.[0];
        if (user && identity) {
          setUser({
            ...user,
            first_name: identity.identity_data?.first_name ?? "",
            last_name: identity.identity_data?.last_name ?? "",
          });
        }

        //um unterschiedliche Pfade nach welcome zu gehen
        setAuthOrigin("signin");
        navigate("/welcome");
      }
      setLoginError("login unsuccesfull, please try again");
    } catch (error) {
      setLoginError("login unsuccesfull, please try again");
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
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setLoginError(undefined);
          }}
        />
        <input
          className="border-pink w-full cursor-pointer rounded-full border py-4 text-center tracking-widest uppercase"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setLoginError(undefined);
          }}
        />
        {loginError && (
          <div className="text-center text-red-700 italic">{loginError}</div>
        )}
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
