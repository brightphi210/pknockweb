import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ---------- Types ----------

interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
}

// ---------- Demo user (swap for real user data once you have an API) ----------

const demoUser: AuthUser = {
  name: "Adebayo Okafor",
  email: "adebayo@email.com",
  avatar:
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80",
};

const STORAGE_KEY = "loggedIn";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === "true"
  );

  const login = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user: isLoggedIn ? demoUser : null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
};

export default AuthProvider;