//import type User from "../../models/User";
import useSessionStorage from "../useSessionStorage";

export default function useUser() {
  const { getItemFromSS, setItemInSS } = useSessionStorage();

  //Create anonymous user
  const generateAnonymousUser = async () => { 
    const anonUserId = getItemFromSS("anonUserId");

    if(anonUserId) return 

    try{
      const res = await fetch(
        `${import.meta.env.VITE_USER_SERVICE_ADDRESS}api/users/generateAnonUser`, 
        {method: "POST" }
      );

      if(!res.ok) throw new Error(`Error on server: ${res.status}`);

      const id: number = await res.json();
      setItemInSS("anonUserId", id.toString());
    }catch(error){
        console.log("Error adding anonymous user: ", error);
    }
  }

  // const getUserById = async (id: string) => {
  //   try{
  //     const response = await fetch(`http://localhost:8089/api/users/${id}`, {
  //       method: "GET",
  //     });

  //     if(!response.ok){
  //       throw new Error(`Error http: ${response.status}`);
  //     }

  //     const data: User = await response.json();
  //     return data;

  //   }catch(error){
  //     console.log("Not found user by id: ", id);
  //     return null;
  //   }
  // }

  return { generateAnonymousUser}
}
