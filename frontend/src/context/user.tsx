"use client";
import { AppConfig } from "@/config/appConfig";
import { getCookie, setCookie } from "@/lib/apis/cookies";
// SocketContext.tsx
import { IUser } from "@/types/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: IUser | null;
  handleUpdateUser: (val: IUser | null) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook to use the User context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Create the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const handleUpdateUser = async (value: IUser | null) => {
    await setCookie(AppConfig.USER_STORAGE, JSON.stringify(value));
    setUser(value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const cookieData = await getCookie(AppConfig.USER_STORAGE);
      const parsedData =
        typeof cookieData === "string" ? JSON.parse(cookieData) : cookieData;
      setUser(parsedData); // Set the user data in state
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, handleUpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};
