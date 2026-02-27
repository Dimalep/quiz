export default function useUser() {
  const generateAnonymousUser = async () => { 
    const anonUserId = sessionStorage.getItem("anonUserId");
    const userId = localStorage.getItem("userId");

    // if(anonUserId) return;
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

  return { generateAnonymousUser}
}
