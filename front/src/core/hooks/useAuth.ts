export default function useAuth() {
  const register = async (login: string, password: string) => {
    try{
        const response = await fetch("http://localhost:8089/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                login: login,
                password: password
            })
        });
        if (!response.ok) {
            throw new Error("Ошибка регистрации");
        }

        const data = await response.json();
        console.log("Успешная регистрация:", data);
        return data;
    } catch (err) {
      console.error("Error registration:", err);
    }
  } 

  return {register}
}
