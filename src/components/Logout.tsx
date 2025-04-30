import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import RoundButton from "./RoundButton";
import { useNavigate } from "react-router";
import { useMainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";

const logOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.warn("user ist nicht ausgeloggt", error);
  }
};

export const Logout = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useMainContext();

  const handleLogout = () => {
    console.log("logout button is clicked");
    logOut();
    navigate("/signin");
  };

  return (
    <>
      {isLoggedIn && (
        <RoundButton
          style="fixed top-0 right-0 m-2"
          content={faPowerOff}
          onClick={handleLogout}
        />
      )}
    </>
  );
};
