import type User from "../models/User";
import useSessionStorage from "./useSessionStorage";

export default function useUser() {
  const { getItemFromSS } = useSessionStorage();

  const addUser = async () => {
    const anonUserId = getItemFromSS("anonUserId");
    if(anonUserId) return;
    try{
        await fetch("http://localhost:8089/api/users/create/anonymous", {method: "POST"})
        .then((res) => res.json())
        .then((data) => {
            sessionStorage.setItem("anonUserId", data.id);
        });
    }catch(error){
        console.log("Error adding anonymous user: ", error);
    }
  }

  const getUserById = async (id: string) => {
    try{
      const response = await fetch(`http://localhost:8089/api/users/${id}`, {
        method: "GET",
      });

      if(!response.ok){
        throw new Error(`Error http: ${response.status}`);
      }

      const data: User = await response.json();
      return data;

    }catch(error){
      console.log("Not found user by id: ", id);
      return null;
    }
  }

  return {addUser, getUserById}
}
