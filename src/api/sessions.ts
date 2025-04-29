import { ISession } from "../pages/Yoga";
import supabase from "../utils/supabase";

export const getAllSessions = async () => {
  const resp = await supabase.from("sessions").select("*");
  if (resp.data) {
    return resp.data as unknown as ISession[];
  }

  console.log("unable to get All", resp.data);

  return [];
};
