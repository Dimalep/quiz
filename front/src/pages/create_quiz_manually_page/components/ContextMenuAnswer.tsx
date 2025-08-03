import React, { useEffect, useRef } from "react";

interface Props {
  onDelete: (id: number) => void;
  elementId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContextMenuAnswer({
  setIsOpen,
  isOpen,
  elementId,
  onDelete,
}: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-8 w-40 bg-white border border-gray-200 rounded shadow-lg z-50"
        >
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Редактировать
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onDelete(elementId)}
            >
              Удалить
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
