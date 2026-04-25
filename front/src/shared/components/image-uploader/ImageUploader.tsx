import { useRef } from "react";
import styles from "./ImgaeUploader.module.css";

interface Props {
  value?: string | null;
  onChange: (file: File) => void;
  backgroundColor?: string;
}

export default function ImageUploader({
  value,
  onChange,
  backgroundColor = "white",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function getFileTypeFromUrl(
    url: string,
  ): "image" | "pdf" | "doc" | "pptx" | "other" {
    const clean = url.split("?")[0].toLowerCase();

    if (clean.match(/\.(png|jpg|jpeg|gif|webp)$/)) return "image";
    if (clean.endsWith(".pdf")) return "pdf";
    if (clean.endsWith(".doc") || clean.endsWith(".docx")) return "doc";
    if (clean.endsWith(".ppt") || clean.endsWith(".pptx")) return "pptx";

    return "other";
  }

  const openInGoogleViewer = (url: string) => {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      url,
    )}&embedded=true`;

    window.open(viewerUrl, "_blank");
  };

  const fileType = value ? getFileTypeFromUrl(value) : null;

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  const pasteHandler = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;

    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) onChange(file);
      }
    }
  };

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: backgroundColor }}
      onPaste={pasteHandler}
    >
      {value ? (
        <div className={styles.previewBox}>
          {fileType === "image" ? (
            <img className={styles.image} src={value} alt="preview" />
          ) : fileType === "pdf" ? (
            <iframe className={styles.iframe} src={value} />
          ) : fileType === "doc" || fileType === "pptx" ? (
            <div className={styles.fileBlock}>
              <p className={styles.fileName}>📄 Документ</p>

              <div className={styles.actions}>
                <a className={styles.link} href={value} target="_blank">
                  Скачать
                </a>

                <button
                  className={styles.button}
                  onClick={() => openInGoogleViewer(value!)}
                >
                  Открыть
                </button>
              </div>
            </div>
          ) : (
            <a href={value} target="_blank">
              Скачать файл
            </a>
          )}
        </div>
      ) : (
        <div
          className={styles.uploadBox}
          style={{ backgroundColor: backgroundColor }}
          onClick={() => inputRef.current?.click()}
        >
          <p className={styles.text}>📁 Нажми или перетащи файл сюда</p>
          <p className={styles.subtext}>PNG, JPG, PDF, DOC, PPTX</p>

          <input
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.pptx"
            onChange={fileChangeHandler}
            className={styles.hiddenInput}
          />
        </div>
      )}
    </div>
  );
}
