export type QuizDTO = {
    id?: number;
    title: string;
    description: string;
    quantityQuestions: number;
}

export type QuestionDTO = {
  id?: number;
  title: string;
  quizId: number;
  type: string;
} 

export type AnswerDTO = {
  id?: number;
  text: string;
  isCorrect: boolean
  questionId: number;
} 


export default function useQuizCreationService() {

  const createNewQuiz = async () : Promise<number | undefined> => {
    const response = await fetch("http://localhost:5050/api/quizzes/create_new_empty_quiz", {
      method: "POST",
      headers: {"Content-type":"application/json"}
    })

    if(!response.ok){
      console.log("Errir create new quiz");
      return;
    }

    const quizId = await response.json();
    return quizId;
  }

  const createNewQuestion = async (quizId: number, type: string) : Promise<number | undefined> => {
    const response = await fetch("http://localhost:5050/api/questions", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        title: "",
        quizId: quizId,
        type: type
      })
    })

    if(!response.ok){
      console.log("Error create new question");
      return;
    }

    const question: QuestionDTO = await response.json();
    return question.id;
  } 

  const getQuizById = async (quizId: number) : Promise<QuizDTO | undefined> =>  {
    const response = await fetch("", {
      method: "GET",
      headers: {"Content-type": "application/json"},
    });

    if(!response.ok){
      console.log("Error get quiz by id");
      return;
    }
  
    return undefined;
  }

  const addQuiz = async (quiz: QuizDTO) : Promise<QuizDTO | undefined> => {
    const response = await fetch("", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(quiz)
    });

    if(!response.ok){
      console.log("Error add quiz");
      return;
    }

    const data: QuizDTO = await response.json();

    return data;
  }

  return {getQuizById, addQuiz, createNewQuiz, createNewQuestion}
}
