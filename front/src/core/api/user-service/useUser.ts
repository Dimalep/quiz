import { useState } from "react";
import type { AuthToken } from "./useAuth";
import useAuth from "./useAuth";

export interface User{
  id: number;
  username: string;
  email: string;
  createAt: string; 
  updateAt: string;
  lastname?: string;
  firstname?: string;
  isRegistered: boolean;
}

export default function useUser() {
  const [currentUser, setCurrentUser] = useState<User>();

  const {fetchWithAuth} = useAuth();


  async function generateAnonUser() : Promise<User | undefined> {
    const rowUserId = localStorage.getItem("userId");
    if(rowUserId !== null) {
      const user = await getUserById(Number(JSON.parse(rowUserId)));

      return user; 
    };

    const response = await fetch(`${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/users/generate-anon-user`, {
      method: "POST",
      headers: {"Content-type" : "application/json"}
    });

    if(!response.ok){
      console.log("Error generate anon user");
      return undefined;
    }

    const user = await response.json();

    localStorage.setItem("userId", JSON.stringify(user.id));

    console.log("Current user - ", user);

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

  
  return { getUserById, currentUser, setCurrentUser, generateAnonUser}
}
