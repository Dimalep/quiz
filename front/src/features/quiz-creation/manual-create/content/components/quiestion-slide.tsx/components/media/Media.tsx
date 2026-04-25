import { useEffect, useState } from "react";
import ImageUploader from "../../../../../../../../shared/components/image-uploader/ImageUploader";
import styles from "./Media.module.css";
import useQuizApi from "../../../../../../../../core/api/quiz-creation-service/useQuizApi";
import { useCreateContext } from "../../../../../create-context/CreateProvider";

export default function Media() {
  const [image, setImage] = useState<string | null>(null); // preview
  const [imageUrl, setImageUrl] = useState<string | null>(null); // backend
  const { upload, deleteFile } = useQuizApi();
  const { dispatch, state } = useCreateContext();

  useEffect(() => {
    setImage(
      state.currentQuestion?.imageUrl
        ? `${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}${state.currentQuestion.imageUrl}`
        : null,
    );
  }, [state.currentQuestion]);

  const uploadHandler = async (file: File) => {
    // preview
    setImage(URL.createObjectURL(file));

    // upload
    const fileUrl = await upload(file);

    console.log("File uploaded: ", fileUrl);

    setImageUrl(fileUrl);

    if (fileUrl)
      dispatch({ type: "UPLOAD_FILE", payload: { imageUrl: fileUrl } });
  };

  const deleteFileHandler = async () => {
    if (!imageUrl) return;

    const fileName = imageUrl.split("/").pop();

    if (fileName) {
      await deleteFile(fileName);
      setImage(null);
      setImageUrl(null);
    } else alert("Ошибка удаленя файла");

    dispatch({ type: "UPLOAD_FILE", payload: { imageUrl: "" } });
  };

  return (
    <>
      <h3 className={styles.title}>Медиа</h3>
      <div className={styles.main}>
        {image && (
          <span className={styles.remove} onClick={deleteFileHandler}>
            Убрать
          </span>
        )}
        <div className={styles.content}>
          <ImageUploader
            backgroundColor="#160d27"
            value={image}
            onChange={(file: File) => uploadHandler(file)}
          />
        </div>
      </div>
    </>
  );
}
