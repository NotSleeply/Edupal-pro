import React from "react";
import type { QuestionType } from "../types/types";

interface PKSummaryProps {
  questions: QuestionType[];
  userAnswers: (string | null)[];
  onBack: () => void;
}

const PKSummary: React.FC<PKSummaryProps> = ({ questions, userAnswers, onBack }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">PK解析与纠错</h2>
    {questions.map((q, idx) => (
      <div key={q.id} className="mb-8 border-b border-gray-100 pb-6">
        <div className="text-lg font-medium text-gray-800 mb-2">
          {`第${idx + 1}题：${q.question}`}
        </div>
        <div className="flex flex-wrap gap-3 items-center mb-2">
          {q.options && q.options.map(opt => (
            <span key={opt}
              className={`px-3 py-1 rounded-lg text-base
                ${opt === q.answer ? "bg-green-100 text-green-700 font-bold" : "bg-gray-100 text-gray-600"}
              `}>
              {opt}
            </span>
          ))}
        </div>
        <div className="text-base text-gray-700 mb-2">
          <span className="font-semibold">正确答案：</span>
          <span className="text-green-600 font-bold">{q.answer}</span>
        </div>
        <div className="text-base text-gray-700 mb-2">
          <span className="font-semibold">你的答案：</span>
          <span className={q.answer === (userAnswers[idx] ?? "") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {typeof userAnswers[idx] === "string" ? userAnswers[idx] : "未作答"}
          </span>
          {q.answer !== (userAnswers[idx] ?? "") && <span className="ml-2 text-red-500">（错误）</span>}
        </div>
        <div className="bg-gray-50 rounded p-3 mt-2">
          <span className="font-semibold text-gray-800">解析：</span>
          <span className="text-gray-700">{q.analysis}</span>
        </div>
      </div>
    ))}
    <button
      className="w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
      onClick={onBack}
    >
      返回结果页
    </button>
  </div>
);

export default PKSummary;