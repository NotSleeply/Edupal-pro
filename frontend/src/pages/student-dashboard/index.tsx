import React, { useState } from 'react';

const fakeQuestions = [
  {
    id: 1,
    question: "2 + 2 等于多少？",
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    id: 2,
    question: "地球是第几大行星？",
    options: ["第一", "第三", "第五", "第七"],
    answer: "第三",
  },
  {
    id: 3,
    question: "英语单词 'apple' 的中文意思是？",
    options: ["苹果", "香蕉", "橘子", "梨"],
    answer: "苹果",
  },
  // 可以继续添加更多题目
];

const StudentDashboard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === fakeQuestions[current].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current < fakeQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      {!finished ? (
        <div className="bg-white rounded shadow p-6">
          <div className="mb-4 font-semibold">
            题目 {current + 1}：{fakeQuestions[current].question}
          </div>
          <div className="grid gap-2 mb-4">
            {fakeQuestions[current].options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded border ${selected === option ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNext}
            disabled={!selected}
          >
            {current < fakeQuestions.length - 1 ? '下一题' : '提交'}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-xl mb-2">答题结束！</div>
          <div>你的得分：{score} / {fakeQuestions.length}</div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;