import { useEffect, useState } from "react";

export interface AuthError{
  title: string;
  message: string;
  isSuccess: boolean;
} 

export interface authToken {
  accessToken: string;
  refreshToke: string;
  userid: string;
}

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResponse, setAuthResponse] = useState<AuthError>({title:"", message:"", isSuccess: false});

  useEffect(() => {
    checkStatusAuth();
  }, []);

  const refreshToken = async ()=> {
    const rowAuthToken = localStorage.getItem("authToken");
    if (!rowAuthToken) return null;

    const refreshTokenValue = JSON.parse(rowAuthToken).refreshToken;

    const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/refresh`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(refreshTokenValue)
    });

    if(!response.ok){
      console.log("Error 11");
      return;
    }

    const data: authToken = await response.json();

    localStorage.setItem("authToken", JSON.stringify(data));

    return data;
  }

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const rowAuthToken = localStorage.getItem("authToken");

    if(!rowAuthToken) {
      console.log("Token not found");
      return;
    };

    const accesToken = JSON.parse(rowAuthToken).accessToken;

    const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${accesToken}`
    }
  });

    if (response.status === 401) {
      const newToken = await refreshToken();
      if (!newToken) throw new Error("Не удалось обновить токен");

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          "Authorization": `Bearer ${newToken.accessToken}`
        }
      });
    }

    return response;
  };

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

      const token: authToken = await response.json();

      localStorage.setItem("authToken", JSON.stringify(token));
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
        const userId = localStorage.getItem("userId");

        const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/registrate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: userId,
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

        const token: authToken = await response.json();
        localStorage.setItem("authToken", JSON.stringify(token));
        return token;
    } catch (err) {
      console.error("Error registration:", err);
    }
  } 

  const checkStatusAuth = () => {
    const storedToken = localStorage.getItem("authToken");
    setIsAuthenticated(storedToken !== null && storedToken !== "error");
  }

  return {registerFromHook, checkStatusAuth, isAuthenticated, loginFromHook, authResponse, fetchWithAuth}
}
