import supabase from "../utils/supabase";

export interface IFav {
  id: string;
  user_id?: string;
  session_id: string;
}

export const getFavourites = async () => {
  const resp = await supabase.from("favourites").select("*");

  if (resp.data) {
    return resp.data as unknown as IFav[];
  }

  // console.log("unable to get Favourites", resp.data);

  return [];
};

export const unlikeSession = async (session_id: string) => {
  const result = await supabase
    .from("favourites")
    .delete()
    .eq("session_id", session_id);
  console.log("unlike session: ", { session_id, result });
};

export const likeSession = async (session_id: string, user_id: string) => {
  const result = await supabase.from("favourites").insert({
    session_id: session_id,
    user_id: user_id,
  });
  console.log(result);
};
