import MainContainerGame from "../../../../../../../../common-components/main-container-game/MainContainerGame";
import styles from "./Media.module.css";

export default function Media({ imageUrl }: { imageUrl?: string }) {
  if (!imageUrl) {
    return <MainContainerGame title="Медиа">Нет файла</MainContainerGame>;
  }

  const base = import.meta.env.VITE_QUIZ_CREATION_ADDRESS;
  const src = `${base}${imageUrl}`;

  const extension = imageUrl.split(".").pop()?.toLowerCase();

  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
    extension || "",
  );
  const isPdf = extension === "pdf";
  const isDoc = ["doc", "docx"].includes(extension || "");
  const isPpt = ["ppt", "pptx"].includes(extension || "");

  const googleViewer = `https://docs.google.com/gview?url=${encodeURIComponent(
    src,
  )}&embedded=true`;

  let content;

  if (isImage) {
    content = (
      <div className={styles.wrapper}>
        <img src={src} alt="media" className={styles.image} />
      </div>
    );
  } else if (isPdf) {
    content = (
      <div className={styles.wrapper}>
        <iframe src={src} className={styles.viewer} title="PDF viewer" />
        <div className={styles.actions}>
          <a href={src} download>
            Скачать PDF
          </a>
          <a href={src} target="_blank" rel="noreferrer">
            Открыть
          </a>
        </div>
      </div>
    );
  } else if (isDoc || isPpt) {
    content = (
      <div className={styles.wrapper}>
        <iframe src={googleViewer} className={styles.viewer} />
        <div className={styles.actions}>
          <a href={src} download>
            Скачать файл
          </a>
          <a href={googleViewer} target="_blank" rel="noreferrer">
            Открыть через Google
          </a>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={styles.wrapper}>
        <div>Неизвестный формат</div>
        <div className={styles.actions}>
          <a href={src} download>
            Скачать
          </a>
        </div>
      </div>
    );
  }

  return <MainContainerGame title="Медиа">{content}</MainContainerGame>;
}
