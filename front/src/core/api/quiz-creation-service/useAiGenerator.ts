export default function useAiGenerator() {

  async function generateByThema(thema: string) {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/generator/by-thema/${thema}`,{
        method: "POST"
    });

    if(!response.ok){
        console.log("Error generate");
        return null;
    }
  }

  return {generateByThema}
}
