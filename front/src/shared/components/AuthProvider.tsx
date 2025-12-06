import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../../core/hooks/user-service-microservice/useAuth";

interface AuthContextType{
    isAuthenticated: boolean;
    authResponse: any;
    login: (login: string, passwod: string) => Promise<void>;
    register: (login: string, passwod: string, anonUserId: number) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const {loginFromHook, authResponse, registerFromHook} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
    }, []);

    const register = async (userLogin: string, password: string, anonUserId: number) => {
        const token = await registerFromHook(userLogin, password, anonUserId);
        if(token){
            setIsAuthenticated(true);
        };
    }

    const login = async (userLogin: string, password: string) => {
        const token = await loginFromHook(userLogin, password);
        if (token) {
            setIsAuthenticated(true);
        };
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, authResponse, register}}>
        {children}
        </AuthContext.Provider>
    );
};

// Хук для удобного использования
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};