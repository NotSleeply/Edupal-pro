import React from "react";
import type { QuestionType } from "../types/types";

interface PKQuestionPanelProps {
  question: QuestionType;
  userAnswer: string | null;
  isAnswered: boolean;
  timer: number;
  onOptionClick: (option: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitAnswer: () => void;
}

const PKQuestionPanel: React.FC<PKQuestionPanelProps> = ({
  question,
  userAnswer,
  isAnswered,
  timer,
  onOptionClick,
  onInputChange,
  onSubmitAnswer,
}) => {
  return (
    <div className="mt-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-medium text-gray-800">{question.question}</div>
        <div className={`font-bold ${timer <= 5 ? 'text-red-600' : 'text-gray-600'}`}>
          倒计时: {timer}s
        </div>
      </div>
      {question.type === "选择题" || question.type === "判断题" ? (
        <div className="grid gap-4">
          {question.options?.map((option) => (
            <button
              key={option}
              className={`px-6 py-4 rounded-lg text-left transition-all duration-200 text-lg font-normal w-full ${isAnswered
                  ? option === question.answer
                    ? "bg-gray-100 border-gray-600 text-gray-800 border-2"
                    : userAnswer === option
                      ? "bg-gray-200 border-gray-400 text-gray-600 border-2"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  : "bg-white border border-gray-300 hover:border-gray-500 hover:bg-gray-50"
                }`}
              onClick={() => onOptionClick(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 w-full max-w-2xl mx-auto">
          <input
            type="text"
            className="w-full px-6 py-4 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg"
            value={userAnswer || ''}
            onChange={onInputChange}
            placeholder="请输入答案"
            disabled={isAnswered}
          />
          <button
            className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 text-base w-full"
            onClick={onSubmitAnswer}
            disabled={!userAnswer || isAnswered}
          >
            提交答案
          </button>
        </div>
      )}
    </div>
  );
};

export default PKQuestionPanel;