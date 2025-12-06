import { useEffect, type CSSProperties } from "react";
import Footer from "../../../shared/components/footer/Footer";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
import SlideContainer from "./add-info/components/SlideContainer";
import Slide from "./add-info/Slide";
import useQuiz from "../../../core/hooks/useQuiz";
import SettingsSlide from "./add-info/components/slides-types/SettingsSlide";
import DefaultQuestionSlide from "./add-info/components/slides-types/DefaultQuestionSlide";
import useSlide from "../../../core/hooks/useSlide";

export default function ManualCreate() {
  const {slideItems,
    deleteQuestionSlideItem, 
    addQuestionSlideItem, 
    updateQuestionSlideItem,
    quizId,
    selectedQuestion,
    currentSlideId,
    isSelectedSlideId,
    selectSlide
  } = useSlide();

  const {currentQuiz, setCurrentQuiz} = useQuiz();

  useEffect(() => {
    setCurrentQuiz({id: Number(quizId), questions: []});
  }, [])

  return (
    <div style={{height: "auto"}}>
        <NavigationPanel backgroundColor="#1E1E2F"/>
              <div>
                  {selectedQuestion &&
                  <Slide question={selectedQuestion} 
                    onDelete={deleteQuestionSlideItem} 
                    onUpdate={updateQuestionSlideItem}>
                    {slideItems.find(el => el.id === currentSlideId)?.type === "settings" 
                    ? <SettingsSlide quiz={currentQuiz}/> 
                    : <DefaultQuestionSlide question={selectedQuestion} onUpdate={updateQuestionSlideItem}/>}
                  </Slide>}
              </div>
              <div style={styles.slideContainer}>
                <SlideContainer 
                  slides={slideItems} 
                  isSelectedSlideId={isSelectedSlideId} 
                  setIsSelectedSlideId={selectSlide}
                  addQuestionSlide={addQuestionSlideItem}
                />
              </div>
        <Footer/>
    </div>
  )
}

const styles : {slideContainer : CSSProperties} = {
  slideContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 20px",
    marginTop: "auto",
    backgroundColor: "#1E1E2F",
    border: "none"
  }
}