import { useEffect, useState } from "react";
import type { SlideItem } from "../models/SlideItem";
import type { QuestionDto } from "../models/QuestionDto";
import { useNavigate, useParams } from "react-router-dom";

export default function useSlide() {
  const {slideId, quizId} = useParams<{slideId: string, quizId: string}>()

  const navigate = useNavigate();
  const [slideItems, setSlideItems] = useState<SlideItem[]>([{id: 0, type: "settings"}]);

  const currentSlideId = slideId ? Number(slideId) : 0;
  const [isSelectedSlideId, setIsSelectedSlideId] = useState<number>(currentSlideId);

  useEffect(() => {
    setIsSelectedSlideId(currentSlideId)
  }, [currentSlideId]);

  useEffect(()=>{
    slideItems.map(el => console.log(el.data?.id));
  }, [slideItems]);

  const selectedQuestion = slideItems.find(el => el.id === isSelectedSlideId);

  //select current slide function
  const selectSlide = (id: number | undefined) => {
    if(id !== undefined){
      setIsSelectedSlideId(id);
      navigate(`/quiz/create/manual/${quizId}/${id}`);
    }
  };

  //add new slide
  const addQuestionSlideItem = () => {
    const tmpId = Date.now();
    setSlideItems(prev => [...prev, {id: tmpId, type: "question", data: {id: tmpId}}])
  };

  //update slide
  const updateQuestionSlideItem = (question: QuestionDto) => {
    setSlideItems(prev => prev.map(el => el.data?.id === question.id ? {...el, data: question } : el));
  };
  
  //delete slide
  const deleteQuestionSlideItem = (id: number) => {
    if(id === undefined) return;
  
    setSlideItems(prev => {
      let updated = id === 0 ? prev.slice(0, -1) : prev.filter(el => el.id !== id);
        
      if(updated.length === 0) return [{id: 0, type: "settings"}];
  
      const deleteIndex = prev.findIndex(el => el.id === id);
      const newIndex = Math.max(0, deleteIndex - 1);
      const newSelectedId = updated[newIndex].id;
  
      setIsSelectedSlideId(newSelectedId);
      navigate(`/quiz/create/manual/${quizId}/${newSelectedId}`);
  
      return updated;
    });
  };

  return {slideItems, 
    setSlideItems, 
    deleteQuestionSlideItem, 
    updateQuestionSlideItem, 
    addQuestionSlideItem,
    slideId,
    quizId,
    setIsSelectedSlideId,
    selectedQuestion,
    currentSlideId,
    isSelectedSlideId,
    selectSlide
  };
}
