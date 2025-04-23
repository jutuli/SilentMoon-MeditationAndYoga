import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../interfaces/IUser";

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

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
};

export default MainProvider;
