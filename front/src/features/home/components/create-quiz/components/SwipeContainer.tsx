import { AnimatePresence, motion } from "framer-motion";
import React, {
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface Props {
  children: ReactNode[];
  setType: Dispatch<SetStateAction<number>>;
  type: number;
}

export default function SwipeContainer({ children, setType, type }: Props) {
  const swipeConfidence = 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setType((prev) => {
      const next = prev + newDirection;
      if (next < 0) return 0;
      if (next > 1) return 1;
      return next;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) paginate(1);
    else if (e.deltaY < 0) paginate(-1);
  };

  return (
    <AnimatePresence custom={type}>
      <motion.div
        key={type}
        custom={type}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -swipeConfidence) paginate(1);
          else if (info.offset.x > swipeConfidence) paginate(-1);
        }}
        style={styles.content}
        onWheel={handleWheel}
      >
        {children[type]}
      </motion.div>
    </AnimatePresence>
  );
}

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    border: "2px solid black",
    borderRadius: "17px",
    padding: "30px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.34)",
  } as CSSProperties,
};
