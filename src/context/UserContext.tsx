import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logout: () => Promise<void>;
  signIn: (credentials: Credentials) => Promise<Response>;
};

type Credentials = {
  email: string;
  password: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/user/is-logged")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.hasAuthToken))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const logout = async () => {
    await fetch("/api/user/logout");
    setIsLoggedIn(false);
  };

  const signIn = async (credentials: Credentials) => {
    const result = await fetch("/api/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const resultJson = await result.json();

    if (resultJson.ok) {
      setIsLoggedIn(true);
    }

    return resultJson;
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
