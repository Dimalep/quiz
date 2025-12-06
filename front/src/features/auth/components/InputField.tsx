import { motion } from "framer-motion";
import { useState, type CSSProperties } from "react";

interface Props {
  key: string;
  placeholder: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}

export default function InputField({
  key,
  value,
  setValue,
  type,
  placeholder,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {type === "password" ? (
        <motion.div style={{ position: "relative" }}>
          <motion.input
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={styles.input}
          />
          <motion.span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 10,
              cursor: "pointer",
              top: "25%",
              userSelect: "none",
              transform: "trasnlateY(-50%)",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </motion.span>
        </motion.div>
      ) : (
        <motion.input
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={styles.input}
        />
      )}
    </>
  );
}

const styles = {
  input: {
    border: "3px solid black",
    width: "100%",
    fontSize: 16,
    borderRadius: "8px",
    height: 50,
    outline: "none",
  } as CSSProperties,
};
