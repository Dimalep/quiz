import { useRef, useState } from "react";

interface Props {
  value?: string | null;
  onChange: (image: string | null) => void;
}

export default function ImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const fileHandler = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) fileHandler(file);
  };

  const pasteHandler = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;

    for (const item of items) {
      if (item.type.startsWith("image")) {
        const file = item.getAsFile();
        if (file) fileHandler(file);
      }
    }
  };

  return (
    <div onPaste={pasteHandler}>
      {value ? (
        <img
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
          src={value}
          alt="preview"
        />
      ) : (
        <>
          <p>Вставьте изображение (Ctrl+V) или загрузите</p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
          />
        </>
      )}
    </div>
  );
}
