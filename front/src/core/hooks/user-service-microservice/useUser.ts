import type { authToken } from "./useAuth";
import useAuth from "./useAuth";

export interface User{
  id: number;
  username: string;
  email: string;
  phone: string;
  createAt: string; 
  updateAt: string;
  lastname: string; 
  middlename: string; 
  firstname: string
}

export default function useUser() {
  const {fetchWithAuth} = useAuth();

  const generateAnonymousUser = async () => { 
    const userId = localStorage.getItem("userId");

    if(userId) return; 

    try{
      const res = await fetch(
        `${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/users/generateAnonUser`, 
        {method: "POST" }
      );

      if(!res.ok) throw new Error(`Error on server: ${res.status}`);

      const id: number = await res.json();
      // sessionStorage.setItem("anonUserId", id.toString());
      localStorage.setItem("userId", id.toString());
    }catch(error){
        console.log("Error adding anonymous user: ", error);
    }
  }

  const getUserById = async (userId: number) : Promise<User | undefined> => {
    const rowAuthToken = localStorage.getItem("authToken");
    if(rowAuthToken === null){
      console.log("Error get acces token from localstorage");      
      return undefined;
    }

    const accessToken: authToken = JSON.parse(rowAuthToken).accessToken; 
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

  return { generateAnonymousUser, getUserById}
}
