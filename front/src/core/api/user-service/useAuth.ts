import { useEffect, useState } from "react";
import type { User } from "./useUser";

export interface AuthRequest{
  value: string;
  password: string;
  userId: number;
}

export interface AuthResponse{
  title: string;
  message: string;
  isSuccess: boolean;
} 

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResponse, setAuthResponse] = useState<AuthResponse>({title:"", message:"", isSuccess: true});

  useEffect(() => {
    checkStatusAuth();
  }, []);

  function clearAuthResponse(){
    setAuthResponse({title:"", message:"", isSuccess: true});
  }


  async function login(req: AuthRequest) : Promise<User | undefined> {
    try{
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/login`,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(req),
        credentials: "include"
      });

      // Error from server
      if(!response.ok){
        const error = await response.json();

        setAuthResponse({
          title:"Ошибка", 
          message: error.message, 
          isSuccess: false
        });

        return undefined;
      }

      // Success
      const data = await response.json();

      setAuthResponse({
        title: "Успех",
        message: "Успешный вход",
        isSuccess: false,
      });

      // Set tokens in localstorage
      localStorage.setItem("authToken", JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }));

      return data.user;

    }catch(error: any){
       // Global error 
      setAuthResponse({
        title: "Ошибка сети",
        message: "Сервер недоступен или нет интернета",
        isSuccess: false,
      });

      return undefined;
    }
  }


  async function registration (req: AuthRequest) : Promise<User | undefined> {
    try{
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/registrate`,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(req),
        credentials: "include"
      });

      // Error from server
      if(!response.ok){
        const error = await response.json();

        setAuthResponse({
          title:"Ошибка", 
          message: error.message, 
          isSuccess: false
        });

        return undefined;
      }

      // Success
      const data = await response.json();

      setAuthResponse({
        title: "Успех",
        message: "Регистрация прошла успешно",
        isSuccess: false,
      });

      // Set tokens in localstorage
      localStorage.setItem("authToken", JSON.stringify({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }));

      return data.user;

    }catch(error: any){
      // Global error 
      setAuthResponse({
        title: "Ошибка сети",
        message: "Сервер недоступен или нет интернета",
        isSuccess: false,
      });

      return undefined;
    }
  }


  async function sendConfirmCode (confirmCode: string, email: string, anonUserId: number) : Promise<AuthToken | undefined> {
    try{
      const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/confirmation`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email, code: confirmCode, anonUserId})
      });

      if(!response.ok){
        console.log("Error send code to email");
        return;
      }

      const data: AuthToken = await response.json();

      localStorage.setItem("authToken", JSON.stringify(data.accessToken));
      setIsAuthenticated(true);
      setAuthResponse({
        title: "Успех",
        message: "Вы успешно вошли",
        isSuccess: true
      });

      console.log("Успешный вход, токен:", data.accessToken);
      return data;

    }catch(err: any){
      console.error("Ошибка: ", err.message);
      setAuthResponse({
        title: "Ошибка",
        message: err.message || "Неизвестная ошибка",
        isSuccess: false
      });
    }
  }


  async function sendCodeToEmail(email: string, anonUserId: number) {
    const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/send-code`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({email, anonUserId})
    });

    if(!response.ok){
      console.log("Error send code to email");
      return;
    }

  }

  async function refreshToken() {
    const rowAuthToken = localStorage.getItem("authToken");
    if (!rowAuthToken) return null;

  
    const refreshTokenValue = JSON.parse(rowAuthToken).refreshToken;

    console.log(rowAuthToken);

    const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/auth/refresh`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(refreshTokenValue)
    });

    if(!response.ok){
      console.log("Error 11");
      return;
    }

    const data: AuthToken = await response.json();

    // Set tokens in localstorage
    localStorage.setItem("authToken", JSON.stringify({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    }));

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

  const checkStatusAuth = () => {
    const storedToken = localStorage.getItem("authToken");
    setIsAuthenticated(storedToken !== null && storedToken !== "error");
  }

  return { 
    checkStatusAuth, 
    isAuthenticated, 
    authResponse, 
    fetchWithAuth, 
    sendCodeToEmail, 
    sendConfirmCode, 
    registration, 
    login,
    clearAuthResponse
  };
}