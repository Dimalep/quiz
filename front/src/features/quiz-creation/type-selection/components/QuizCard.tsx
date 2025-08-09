import React from "react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  title: string;
  description: string;
  imageUrl: string;
  selectedType: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  imageUrl,
  selectedType,
}) => {
  const navigate = useNavigate();

  const selectTypeHandle = () => {
    switch (selectedType) {
      case 1:
        navigate("/quiz/create/manual/info");
        break;
      case 2:
        navigate("/quiz/create/ai");
        break;
      case 3:
        navigate("/quiz/create/docs");
        break;
    }
  };

  return (
    <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <div className="flex flex-[2_2_0px] flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[#111518] text-base font-bold leading-tight">
            {title}
          </p>
          <p className="text-[#637c88] text-sm font-normal leading-normal">
            {description}
          </p>
        </div>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer 
                    items-center justify-center overflow-hidden rounded-full 
                    h-8 px-4 flex-row-reverse bg-[#f0f3f4] text-[#111518] text-sm 
                    font-medium leading-normal w-fit"
          onClick={selectTypeHandle}
        >
          <span className="truncate">Создать</span>
        </button>
      </div>
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      ></div>
    </div>
  );
};

export default QuizCard;
