import { data } from "react-router";
import { IUser } from "../interfaces/IUser";
import supabase from "../utils/supabase";

export const updateUser = async (user: IUser) => {
  const { error } = await supabase.from("users").update(user).eq("id", user.id);

  if (error) {
    console.log("Fehler beim updaten des users", user, error);
    return error;
  }
  return data;
};
