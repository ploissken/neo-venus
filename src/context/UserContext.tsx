import { FailedFetchResult, SuccessFetchResult, useFetch } from "@/hooks";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { authFetch } = useFetch();

  useEffect(() => {
    authFetch<{ hasAuthToken: boolean }>("/api/user/is-logged").then(
      (response) => {
        if ("error" in response) {
          setIsLoggedIn(false);
        } else {
          const { data } = response;
          setIsLoggedIn(data.hasAuthToken);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await authFetch("/api/user/logout");
    setIsLoggedIn(false);
  };

  const signIn = async (credentials: Credentials) => {
    const result = await authFetch("/api/user/sign-in", {
      method: "POST",
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
