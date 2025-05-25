import { FailedFetchResult, SuccessFetchResult, useFetch } from "@/hooks";
import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logout: () => Promise<void>;
  signIn: (
    credentials: Credentials
  ) => Promise<FailedFetchResult | SuccessFetchResult<unknown>>;
};

type Credentials = {
  email: string;
  password: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const anonFetch = useFetch();

  useEffect(() => {
    fetch("/api/user/is-logged")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.hasAuthToken))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const logout = async () => {
    await anonFetch("/api/user/logout");
    setIsLoggedIn(false);
  };

  const signIn = async (credentials: Credentials) => {
    const result = await anonFetch("/api/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (result.ok) {
      setIsLoggedIn(true);
    }

    return result;
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
