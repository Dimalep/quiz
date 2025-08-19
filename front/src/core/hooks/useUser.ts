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

  return {addUser}
}
