import { createContext, useContext, useEffect, useState } from "react";
import useAuth, { type AuthToken } from "../../core/api/user-service/useAuth";
import type { User } from "../../core/api/user-service/useUser";
import useUser from "../../core/api/user-service/useUser";

interface AuthContextType {
  currentUser: User | undefined;
  isAuthenticated: boolean;
  authResponse: any;

  logoutHandler: () => void;
  setCurrentUser: (value: User) => void;
  setIsAuthenticated: (value: boolean) => void;

  sendCodeToEmail: (email: string, anonUserId: number) => Promise<void>;

  sendConfirmCode: (
    confirmCode: string,
    email: string,
    anonUserId: number,
  ) => Promise<AuthToken | undefined>;

  registrationHandler: (username: string, password: string) => Promise<void>;
  loginHandler: (username: string, password: string) => Promise<void>;

  clearAuthResponse: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    authResponse,
    sendConfirmCode,
    sendCodeToEmail,
    registration,
    login,
    clearAuthResponse,
  } = useAuth();

  const { currentUser, setCurrentUser, generateAnonUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);

    (async () => {
      const user = await generateAnonUser();

      if (!user) return;

      setCurrentUser(user);
    })();
  }, []);

  async function registrationHandler(
    username: string,
    password: string,
  ): Promise<void> {
    // Check exsisting anon user
    if (!currentUser) {
      console.log("Current user is null");
      return undefined;
    }

    // Forming auth request
    const authRequest = {
      userId: currentUser.id,
      value: username,
      password: password,
    };

    // Registrastion
    const user = await registration(authRequest);

    // Set info about current auth session
    if (user) {
      localStorage.setItem("userId", JSON.stringify(user.id));

      setCurrentUser(user);

      setIsAuthenticated(true);
    }
  }

  async function loginHandler(
    username: string,
    password: string,
  ): Promise<void> {
    const plug = 0;

    // Froming auth request
    const authRequest = {
      userId: plug,
      value: username,
      password: password,
    };

    // Registrastion
    const user = await login(authRequest);

    // Set info about current auth session
    if (user) {
      localStorage.setItem("userId", JSON.stringify(user.id));

      setCurrentUser(user);

      setIsAuthenticated(true);
    }
  }

  async function logoutHandler() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("anonUserId");

    setIsAuthenticated(false);

    await generateAnonUser();
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        authResponse,
        logoutHandler,
        setCurrentUser,
        setIsAuthenticated,
        sendConfirmCode,
        sendCodeToEmail,
        registrationHandler,
        loginHandler,
        clearAuthResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
