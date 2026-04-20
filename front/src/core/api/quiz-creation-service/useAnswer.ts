export type AnswerDTO = {
  id?: number;
  text: string;
  isCorrect: boolean
  questionId: number;
} 

export default function useAnswer() {

  const updateAnswersBatch = async (answers: AnswerDTO[]) : Promise<boolean> => {
      const response = await fetch("http://localhost:5051/api/answers/batch", {
        method: "PUT",
        headers: {"Content-type" :"application/json"},
        body: JSON.stringify(answers)
      });
  
      if(!response.ok){
        console.log("Error add batch answers");
        return false;
      }
  
      return true;
  }

  const addAnswer = async (answer: AnswerDTO) : Promise<AnswerDTO | undefined> => {
    const response = await fetch("http://localhost:5051/api/answers", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(answer)
    });

    if(!response.ok){
        console.log("Error add answer");
        return; 
    }

    const data: AnswerDTO = await response.json();

    return data;
  }

  return {updateAnswersBatch, addAnswer}
}
