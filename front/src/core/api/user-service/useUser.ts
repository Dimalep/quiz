import { useState } from "react";
import type { AuthResponse, AuthToken } from "./useAuth";
import useAuth from "./useAuth";

export interface EditUserRequest{
  username?: string;
  password?: string;
}

export interface User{
  id: number;
  username: string;
  email: string;
  createAt: string; 
  updateAt: string;
  isRegistered: boolean;
}

export default function useUser() {
  const [currentUser, setCurrentUser] = useState<User>();

  const {fetchWithAuth} = useAuth();

  // PATCH USER
  async function patchUser(userId: number, req: EditUserRequest): Promise<User | AuthResponse> {
    console.log("Updated password: ", req);

    const response = await fetch(
      `${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/users/patch/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    );

    const data = await response.json(); // <-- читаем тело всегда

    if (!response.ok) {
      const errorData = data as {
        statusCode: number;
        code: string;
        message: string;
      };

      return {
        title: "Ошибка",
        message: errorData.message,
        isSuccess: false,
      };
    }

    return data as User;
  }

  // GENERATE OR GET EXISTS USER
  async function generateAnonUser() : Promise<User | undefined> {
    const rowUserId = localStorage.getItem("userId");
    if(rowUserId !== null) {
      const user = await getUserById(Number(JSON.parse(rowUserId)));

      return user; 
    };

    const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/users/generate-anon-user`, {
      method: "POST",
    });

    if(!response.ok){
      console.log("Error generate anon user");
      return undefined;
    }

    const user = await response.json();

    localStorage.setItem("userId", JSON.stringify(user.id));

    return user;
  } 
  

  async function getUserById(userId: number) : Promise<User | undefined> {
    const rowAuthToken = localStorage.getItem("authToken");
    if(rowAuthToken === null){
      console.log("Error get acces token from localstorage");      
      return undefined;
    }

    const accessToken: AuthToken = JSON.parse(rowAuthToken).accessToken; 
    console.log(accessToken);

    const response = await fetchWithAuth(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if(!response){
      console.log("Error get user by id");
      return undefined;
    }

    const data: User = await response.json();
    return data;
  };

  
  return { getUserById, currentUser, setCurrentUser, generateAnonUser, patchUser}
}
