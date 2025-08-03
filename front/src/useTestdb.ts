const loadQuestions = async () => {
  const res = await fetch("http://localhost:3001/questions");
  const data = await res.json();
  console.log("Вопросы:", data);
  return data;
};

const saveQuestions = async (questions: any[]) => {
  await fetch("http://localhost:3001/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(questions),
  });
};

export { loadQuestions, saveQuestions };