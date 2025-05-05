import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase from "../utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { IUser } from "../interfaces/IUser";
import { getFavourites, IFav } from "../api/favourites";
import { ISession } from "../interfaces/ISession";
import { getAllSessions } from "../api/sessions";
import { updateUser } from "../api/user";
import { ISessionYM } from "../pages/Yoga";

interface IMainContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  loading: boolean;
  favourites: IFav[];
  updateFavourites: () => void;
  allSessions: ISession[];
  favouriteSessions: ISession[];
  yogaSessions: ISession[];
  meditationSessions: ISession[];
  updateUserImage: (imageUrl: string) => void;
  authOrigin: "signin" | "signup" | null;
  setAuthOrigin: Dispatch<SetStateAction<"signin" | "signup" | null>>;
  reminderOrigin: "profile" | "welcome" | null;
  setReminderOrigin: Dispatch<SetStateAction<"profile" | "welcome" | null>>;
  sessionsYM: ISessionYM[] | null;
  setSessionsYM: (sessions: ISessionYM[] | null) => void;
  activeFilter: string | "all" | "favourites" | null;
  setActiveFilter: (activeFilter: string | "all" | "favourites" | null) => void;
  activeTimeFilter: number | null;
  setActiveTimeFilter: (activeTimeFilter: number | null) => void;
  activeLevelFilter: string | null;
  setActiveLevelFilter: (activeLevelFilter: string | null) => void;
  searchTerm: string | "";
  setSearchTerm: (searchTerm: string | "") => void;
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
  selectedDays: string[];
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
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
  const [loading, setLoading] = useState(true);

  const [favourites, setFavourites] = useState<IFav[]>([]);
  const [allSessions, setAllSessions] = useState<ISession[]>([]);

  //states for Yoga and Meditate.tsx
  const [sessionsYM, setSessionsYM] = useState<ISessionYM[] | null>([]);
  const [activeFilter, setActiveFilter] = useState<
    string | "all" | "favourites" | null
  >("all");
  const [activeTimeFilter, setActiveTimeFilter] = useState<number | null>(null);
  const [activeLevelFilter, setActiveLevelFilter] = useState<string | null>(
    null,
  );

  const [searchTerm, setSearchTerm] = useState<string | "">("");

  //für untersch Pfade noch login/signup bzw. reminder
  const [authOrigin, setAuthOrigin] = useState<"signin" | "signup" | null>(
    null,
  );
  const [reminderOrigin, setReminderOrigin] = useState<
    "profile" | "welcome" | null
  >(null);

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // fetch favourites if a user is logged in
  const updateFavourites = async () => {
    const fetchedFavourites = await getFavourites();
    setFavourites(fetchedFavourites);
  };

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const supabaseUser = session.user;
        const appUser: IUser = {
          id: supabaseUser.id,
          email: supabaseUser.email ?? "",
          first_name: supabaseUser.user_metadata?.first_name ?? "",
          last_name: supabaseUser.user_metadata?.last_name ?? "",
          image_url:
            supabaseUser.user_metadata?.avatar_url ??
            supabaseUser.user_metadata?.image_url ??
            "",
        };
        setUser(appUser);
        setIsLoggedIn(true);
      }
      setLoading(false);
    });

    // Listener für Auth State Änderungen
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession: Session | null) => {
        if (newSession) {
          const supabaseUser = newSession.user;
          const appUser: IUser = {
            id: supabaseUser.id,
            email: supabaseUser.email ?? "",
            first_name: supabaseUser.user_metadata?.first_name ?? "",
            last_name: supabaseUser.user_metadata?.last_name ?? "",
            image_url:
              supabaseUser.user_metadata?.avatar_url ??
              supabaseUser.user_metadata?.image_url ??
              "",
          };
          setUser(appUser);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
        setLoading(false);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      updateFavourites();
      updateAllSessions();
    }
  }, [isLoggedIn]);

  const updateAllSessions = async () => {
    const fetchSessions = await getAllSessions();
    setAllSessions(fetchSessions);
  };

  const favouriteSessions = allSessions.filter((session) =>
    favourites.some((favourite) => favourite.session_id === session.id),
  );

  const meditationSessions = allSessions.filter(
    (session) => session.media_type === "soundcloud",
  );

  const yogaSessions = allSessions.filter(
    (session) => session.media_type === "youtube",
  );

  const updateUserImage = async (newImageUrl: string) => {
    if (user) {
      const updatedUser: IUser = { ...user, image_url: newImageUrl };

      // updated user im backend
      const response = await updateUser(updatedUser);
      // updated user im Frontend
      console.log(" updae user image response", response);

      setUser(updatedUser);
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loading, // Add loading to context value
    favourites,
    updateFavourites,
    allSessions,
    favouriteSessions,
    meditationSessions,
    yogaSessions,
    updateUserImage,
    authOrigin,
    setAuthOrigin,
    reminderOrigin,
    setReminderOrigin,
    sessionsYM,
    setSessionsYM,
    activeFilter,
    setActiveFilter,
    activeTimeFilter,
    setActiveTimeFilter,
    activeLevelFilter,
    setActiveLevelFilter,
    searchTerm,
    setSearchTerm,
    selectedTime,
    setSelectedTime,
    selectedDays,
    setSelectedDays,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
};

export default MainProvider;
