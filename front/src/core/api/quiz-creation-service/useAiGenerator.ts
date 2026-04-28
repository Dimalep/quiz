export default function useAiGenerator() {

  async function generateByThema(thema: string) {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/generator/by-thema`,{
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(thema)
    });

    if(!response.ok){
        console.log("Error generate");
        return null;
    }

    const data = await response.json();
    return data;
  }

  return {generateByThema}
}
