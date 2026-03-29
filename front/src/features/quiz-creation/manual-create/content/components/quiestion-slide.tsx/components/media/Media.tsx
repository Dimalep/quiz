import { useState } from "react";
import ImageUploader from "../../../../../../../../shared/components/image-uploader/ImageUploader";
import styles from "./Media.module.css";

export default function Media() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <>
      <h3 className={styles.title}>Медиа</h3>
      <div className={styles.main}>
        {image && (
          <span className={styles.remove} onClick={() => setImage(null)}>
            Убрать
          </span>
        )}
        <div className={styles.content}>
          <ImageUploader value={image} onChange={setImage} />
        </div>
      </div>
    </>
  );
}
