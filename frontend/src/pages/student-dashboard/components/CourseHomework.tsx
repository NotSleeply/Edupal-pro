import { useState, useEffect } from "react";
import type { QuestionType } from "../types/types";

const LOCAL_KEY = "course_homework_answers";

interface CourseHomeworkProps {
  questions: QuestionType[];
}

const CourseHomework: React.FC<CourseHomeworkProps> = ({ questions }) => {
  // 初始化时尝试从 localStorage 读取
  const [userAnswers, setUserAnswers] = useState<(string | string[] | null)[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        // 保证长度一致
        if (Array.isArray(arr) && arr.length === questions.length) return arr;
      } catch {
        console.warn("无法解析本地存储的作业答案");
      }
    }
    return Array(questions.length).fill(null);
  });
  const [showResult, setShowResult] = useState(false);

  // 每次作答变化时保存
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(userAnswers));
  }, [userAnswers]);

  const handleOption = (idx: number, option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[idx] = option;
    setUserAnswers(newAnswers);
  };

  const handleInput = (idx: number, val: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[idx] = val;
    setUserAnswers(newAnswers);
  };

  const handleMultiSelect = (idx: number, option: string) => {
    let selected = Array.isArray(userAnswers[idx]) ? [...(userAnswers[idx] as string[])] : [];
    if (selected.includes(option)) {
      selected = selected.filter(item => item !== option);
    } else {
      selected.push(option);
    }
    const newAnswers = [...userAnswers];
    newAnswers[idx] = selected;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  // 清空作答时也清空 localStorage
  const handleReset = () => {
    setShowResult(false);
    setUserAnswers(Array(questions.length).fill(null));
    localStorage.removeItem(LOCAL_KEY);
  };

  if (questions.length === 0) {
    return <div className="p-4 text-center text-muted-foreground text-xl">暂无作业题目</div>;
  }

  if (showResult) {
    return (
      <div className="p-12 max-w-4xl mx-auto bg-white rounded-xl shadow">
        <h3 className="text-3xl font-bold mb-10 text-center">作业结果</h3>
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-12 pb-6 border-b-2 last:border-b-0 last:pb-0">
            <div className="font-semibold text-2xl mb-4">{idx + 1}. {q.question}</div>
            <div className="mb-2 text-lg">
              <span className="mr-2">你的答案：</span>
              <span className={
                q.type === "多选题"
                  ? (Array.isArray(userAnswers[idx]) &&
                      userAnswers[idx]?.sort().join(",") === q.answer.split(",").sort().join(",")
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold")
                  : (userAnswers[idx] === q.answer
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold")
              }>
                {q.type === "多选题"
                  ? Array.isArray(userAnswers[idx]) ? userAnswers[idx].join(",") : "未作答"
                  : userAnswers[idx] ?? "未作答"}
              </span>
              {userAnswers[idx] !== q.answer && (
                <span className="ml-6 text-gray-700">正确答案：<span className="font-semibold">{q.answer}</span></span>
              )}
            </div>
            <div className="text-gray-500 text-base mt-2">解析：{q.analysis}</div>
          </div>
        ))}
        <button
          className="mt-10 px-8 py-3 bg-black text-white rounded-xl w-full text-2xl"
          onClick={handleReset}
        >
          再做一次
        </button>
      </div>
    );
  }

  return (
    <form
      className="max-w-4xl mx-auto p-12 bg-white rounded-xl shadow space-y-14"
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {questions.map((q, idx) => (
        <div key={q.id} className="mb-2">
          <div className="mb-4 font-semibold text-2xl">
            {idx + 1}. {q.question}
          </div>
          {q.type === "多选题" ? (
            <div className="space-y-3">
              {q.options?.map(opt => (
                <label key={opt} className="block cursor-pointer text-lg">
                  <input
                    type="checkbox"
                    name={`q_${idx}`}
                    value={opt}
                    checked={Array.isArray(userAnswers[idx]) && userAnswers[idx]?.includes(opt)}
                    onChange={() => handleMultiSelect(idx, opt)}
                    className="mr-3 accent-black scale-125"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : q.type === "选择题" || q.type === "判断题" ? (
            <div className="space-y-3">
              {q.options?.map(opt => (
                <label key={opt} className="block cursor-pointer text-lg">
                  <input
                    type="radio"
                    name={`q_${idx}`}
                    value={opt}
                    checked={userAnswers[idx] === opt}
                    onChange={() => handleOption(idx, opt)}
                    className="mr-3 accent-black scale-125"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <input
              className="w-full border-2 rounded px-4 py-3 text-lg"
              placeholder="请输入答案"
              value={userAnswers[idx] ?? ""}
              onChange={e => handleInput(idx, e.target.value)}
            />
          )}
          {/* 分割线 */}
          {idx !== questions.length - 1 && (
            <div className="my-8 border-b-2 border-gray-200"></div>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full mt-12 px-6 py-4 rounded-xl bg-black text-white text-2xl font-bold"
        disabled={userAnswers.some(ans => ans == null || ans === "")}
      >
        提交
      </button>
    </form>
  );
};

export default CourseHomework;