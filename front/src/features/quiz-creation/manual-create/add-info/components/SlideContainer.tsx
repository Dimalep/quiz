import { useEffect, useState, type CSSProperties } from "react";
import type { Question } from "../../../../../core/models/Questoin";
import MiniSlide from "./MiniSlide";

interface Props {
    slides: Question[];
    isSelectedSlideId: number | undefined;
    setIsSelectedSlideId: (id: number | undefined) => void;
    addQuestionSlide: () => void;
}

export default function SlideContainer( {slides, isSelectedSlideId, setIsSelectedSlideId, addQuestionSlide} : Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1075)
  const [isHoverR, setisHoverR] = useState(false);
  const [isHoverL, setisHoverL] = useState(false);
  let number = 0;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1075);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[])

  return (
    <div style={{...styles.main, maxWidth: isMobile ? 400 : window.innerWidth - 400}}>
        <div style={styles.content}>
            <button style={{
                    ...styles.buttonL,
                    backgroundColor: isHoverL ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                    transform: isHoverL ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setisHoverL(true)}
                onMouseLeave={() => setisHoverL(false)}
                >{"<<"}</button>
            <div style={{
                    ...styles.slideContainer,
                    maxWidth: isMobile ? 400 : window.innerWidth - 400,
                }}>{
                    slides.map((el, id) => (
                        <MiniSlide key={id} question={el} number={number++} setIsSelected={setIsSelectedSlideId} isSelected={isSelectedSlideId}/>
                    ))}
            </div>
            <button style={{
                ...styles.buttonR,
                backgroundColor: isHoverR ?  "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                transform: isHoverR ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setisHoverR(true)}
            onMouseLeave={() => setisHoverR(false)}
            onClick={() => addQuestionSlide()}
            >{">>"}</button>
        </div>
    </div>
  )
}

const styles: { main: CSSProperties,
    buttonL: CSSProperties,
    buttonR: CSSProperties,
    content: CSSProperties,
    slideContainer: CSSProperties
} = {
    main: {
        display: "flex", 
        flexDirection: "column", 
        gap: 10,
    },
    buttonL: {
        border: "none", 
        borderTopLeftRadius: 8, 
        borderBottomLeftRadius: 8, 
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    buttonR:{
        border: "none",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
        cursor: "pointer",
        transition: "all 0.3s ease"
    },
    slideContainer: {
        display: "flex", 
        flexDirection: "row", 
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
        padding: 10, 
        gap: 10,
        overflowX: "auto",
        overflowY: "hidden",
        scrollbarWidth: "thin",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
    },
    content: {
        display: "flex", 
        flexDirection: "row", 
        gap: 10
    }
}