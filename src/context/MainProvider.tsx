import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../interfaces/IUser";
import { getFavourites, IFav } from "../api/favourites";
import { ISession } from "../pages/Yoga";
import { getAllSessions } from "../api/sessions";

interface IMainContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  favourites: IFav[];
  updateFavourites: () => void;
  allSessions: ISession[];
  favouriteSessions:ISession[] ;
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

  const [favourites, setFavourites] = useState<IFav[]>([]);
  const [allSessions, setAllSessions] = useState<ISession[]>([]);

  // fetch favourites if a user is logged in
  const updateFavourites = async () => {
    const fetchedFavourites = await getFavourites();
    setFavourites(fetchedFavourites);
  };
  useEffect(() => {
    updateFavourites();
    updateAllSessions();
  }, []);

  //TODO: fetch all sessions
  // const allSessions = [];
  const updateAllSessions = async () => {
    const fetchSessions = await getAllSessions();
    setAllSessions(fetchSessions);
  };

  const favouriteSessions = allSessions.filter((session) =>
    favourites.some((favourite) => favourite.session_id === session.id),
  );

  console.log(favouriteSessions);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    favourites,
    updateFavourites,
    allSessions,
    favouriteSessions,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
};

export default MainProvider;
