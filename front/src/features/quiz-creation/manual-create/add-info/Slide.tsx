import {useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Button from "./components/Button";
import type { QuestionDto } from "../../../../core/models/QuestionDto";

interface Props{
  children: ReactNode;
  question: QuestionDto;
  onDelete: (id: number) => void;
  onUpdate: (question: QuestionDto) => void;
}

export default function Slide({onDelete, children} : Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1075);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1075);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{backgroundColor: "#1E1E2F", color: "#F8FAFC"}}>
      <div style={ styles.main }>
        <div style={isMobile ? styles.contentForMobile : styles.content}>
          <div style={{ display: "flex", gap: "10px", alignSelf: "end", justifyContent: "space-between"}}>
            <div style={{ display: "flex", gap: "10px", alignSelf: "end", justifySelf: "left"}}>
              <Button text="Заврешить" width={"auto"} height={50} backgroundColor={"#6C63FF"}/>
              <Button text="Изменить тип" width={"auto"} height={50} backgroundColor={"#A1946E"}/>
            </div>
            <Button text="Удалить" width="auto" height={50} backgroundColor="darkred" onDelete={onDelete}/>
          </div>
          <div style={ {...styles.content_item1, width: isMobile ? 400 : "auto"}}>
            <div style={{...styles.contentMedia, width: isMobile ? "360px" : "400px", height: isMobile ? "auto" : "100px"}}>
              <label style={{cursor: "pointer"}}>Добавить файл</label>
            </div>
          </div>
          <div style={{ ...styles.content_item2, width: isMobile ? 400 : 600}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export const styles : {main: CSSProperties, 
    content: CSSProperties,
    content_item1: CSSProperties,
    content_item2: CSSProperties,
    contentForMobile: CSSProperties,
    contentMedia: CSSProperties
  } = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifySelf: "center", 
    alignSelf: "center",
    minHeight: "80vh",
    paddingTop: 100,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: 15,
    alignItems: "start",
  },
  contentForMobile: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    alignItems: "flex-start"
  },
  content_item2: {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center",
    padding: "40px 15px",
    borderRadius: 8,
    gap: 10,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    position: "relative"
  },
  content_item1: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    gridRow: "1 / span 2"
  },
  contentMedia: {
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    margin: 5, 
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 4,
    fontSize: 14,
  }
}
