import { useEffect, useState } from "react";

export interface AuthError{
  title: string;
  message: string;
  isSuccess: boolean;
} 

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResponse, setAuthResponse] = useState<AuthError>({title:"", message:"", isSuccess: false});

  useEffect(() => {
    checkStatusAuth();
  }, []);

  const loginFromHook = async (login: string, password: string) => {
    try{
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          authType: 0,
          value: login.trim(),
          password: password.trim()
        }),
        credentials: "include"
      });

      if (!response.ok) {
        const err = await response.json(); 
        setAuthResponse({
          title: "Ошибка",
          message: err.message || "Неизвестная ошибка",
          isSuccess: false
        });
        return;
      }

      const token = await response.text();

      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      setAuthResponse({
        title: "Успех",
        message: "Вы успешно вошли",
        isSuccess: true
      });

      console.log("Успешный вход, токен:", token);
      return token;

    } catch (err: any) {
      console.error("Ошибка: ", err.message);
      setAuthResponse({
        title: "Ошибка",
        message: err.message || "Неизвестная ошибка",
        isSuccess: false
      });
    }
  }

  //Send registration request
  const registerFromHook = async (login: string, password: string) => {
    try{
        const anonUserId = sessionStorage.getItem("anonUserId");

        const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/registrate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: anonUserId,
              authType: 0,
              email: "",
              phone: "",
              username: login,
              password: password
            }),
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error("Ошибка регистрации");
        }

        const token = await response.text();
        localStorage.setItem("authToken", token);
        return token;
    } catch (err) {
      console.error("Error registration:", err);
    }
  } 

  const checkStatusAuth = () => {
    const storedToken = localStorage.getItem("authToken");
    setIsAuthenticated(storedToken !== null && storedToken !== "error");
  }

  return {registerFromHook, checkStatusAuth, isAuthenticated, loginFromHook, authResponse}
}
