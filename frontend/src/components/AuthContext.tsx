import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

interface AuthContextType {
    loggedInUser: string | null;
    setLoggedInUser: (user: string | null) => void;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedInUser(token);
    }
  }, []);

  const login = (token: string ) => {
    localStorage.setItem("token", token);
    setLoggedInUser(token);
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setLoggedInUser(null);
      toast.success("Successfully logged out, Bye!");
    } catch (error) {
      toast.error('Failed to logout, could yoy perhaps stay?');
    }
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };