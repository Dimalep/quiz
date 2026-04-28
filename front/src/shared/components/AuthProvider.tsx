import { createContext, useContext, useEffect, useState } from "react";
import useAuth, {
  type AuthResponse,
} from "../../core/api/user-service/useAuth";
import type {
  EditUserRequest,
  User,
} from "../../core/api/user-service/useUser";
import useUser from "../../core/api/user-service/useUser";

interface AuthContextType {
  currentUser: User | undefined;
  isAuthenticated: boolean;
  authResponse: any;

  logoutHandler: () => void;
  setCurrentUser: (value: User) => void;
  setIsAuthenticated: (value: boolean) => void;

  sendCodeToEmail: (email: string, anonUserId: number) => Promise<void>;

  sendConfirmCodeHandler: (confirmCode: string, email: string) => void;

  registrationHandler: (username: string, password: string) => Promise<void>;
  loginHandler: (username: string, password: string) => Promise<void>;

  clearAuthResponse: () => void;
  patchUserHandler: (req: EditUserRequest) => void;
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

  const { currentUser, setCurrentUser, generateAnonUser, patchUser } =
    useUser();

  // FOR REFRESH PAGE
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);

    (async () => {
      // this method generete anon user or get exists user
      const user = await generateAnonUser();

      if (!user) {
        console.log("Error generate or get exists user.");
        return;
      }

      setCurrentUser(user);
    })();
  }, []);

  async function patchUserHandler(
    req: EditUserRequest,
  ): Promise<AuthResponse | undefined> {
    if (!currentUser) return;

    const result = await patchUser(currentUser.id, req);

    if ("isSuccess" in result && result.isSuccess === false) {
      return result;
    }

    setCurrentUser(result as User);

    return undefined;
  }

  // SEND CONFIRM CODE TO BACKEND
  async function sendConfirmCodeHandler(confirmCode: string, email: string) {
    const rowAnonUserId = localStorage.getItem("userId");
    if (!rowAnonUserId) {
      console.log("Cannot get user fron local storage");
      return;
    }
    const anonUserId = JSON.parse(rowAnonUserId);

    const authResponse = await sendConfirmCode(confirmCode, email, anonUserId);

    if (authResponse) {
      localStorage.setItem("userId", JSON.stringify(authResponse.user.id));

      setCurrentUser(authResponse.user);

      setIsAuthenticated(true);

      console.log("Success confirm email ", authResponse);
    }
  }

  // REGISTRATION USER
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
        sendConfirmCodeHandler,
        sendCodeToEmail,
        registrationHandler,
        loginHandler,
        clearAuthResponse,
        patchUserHandler,
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
