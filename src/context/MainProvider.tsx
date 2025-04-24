import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../interfaces/IUser";
import supabase from "../utils/supabase";

interface IMainContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const mainContext = createContext<IMainContext | undefined>(undefined);

export const useMainContext = () => {
  const context = useContext(mainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};

const MainProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  const getData = async () => {
    const { data } = await supabase.auth.getSession();
    console.log(data);

    const token = import.meta.env.VITE_SPOTIFY_TOKEN;

    async function fetchWebApi(
      endpoint?: string,
      method?: string,
      body?: undefined,
    ) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });
      return await res.json();
    }

    async function getMeditationList() {
      // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
      return (await fetchWebApi("v1/playlists/6UNNDSZvHrApS7wd2Q2y4Q", "GET"))
        .tracks.items;
    }

    const meditationsTracks = await getMeditationList();
    console.log("meditation", meditationsTracks);

    async function getYogaList() {
      // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
      return (await fetchWebApi("v1/playlists/5DaGMB4hFyXo2n8nafc2DD", "GET"))
        ;
        //.tracks.items
    }

    const yogaTracks = await getYogaList();
    console.log("yogaTracks", yogaTracks);

    fetchWebApi("GET");
  };

  useEffect(() => {
    getData();
  }, []);

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
};

export default MainProvider;
