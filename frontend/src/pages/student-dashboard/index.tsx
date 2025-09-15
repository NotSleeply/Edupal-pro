import React, { useState, useEffect } from 'react';

// 新增更多题目
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
  {
    id: 4,
    question: "1 + 1 等于多少？",
    options: ["1", "2", "3", "4"],
    answer: "2",
  },
  {
    id: 5,
    question: "世界上最大的动物是什么？",
    options: ["大象", "蓝鲸", "长颈鹿", "人类"],
    answer: "蓝鲸",
  },
  {
    id: 6,
    question: "太阳系中最小的行星是哪颗？",
    options: ["水星", "火星", "金星", "土星"],
    answer: "水星",
  },
];

const StudentDashboard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(30);
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null);
  const [timeWarning, setTimeWarning] = useState(false); // 时间警告

  useEffect(() => {
    if (current < fakeQuestions.length && !finished) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            handleNext(); // 自动跳到下一题
            return 30; // 重置时间
          }
          if (prev <= 10 && !timeWarning) {
            setTimeWarning(true); // 10秒提醒
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval); // 清理定时器
    }
  }, [current, finished, timeWarning]);

  useEffect(() => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const state = JSON.parse(savedState);
      setCurrent(state.current);
      setSelected(state.selected);
      setScore(state.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quizState", JSON.stringify({ current, selected, score }));
  }, [current, selected, score]);

  const handleOptionClick = (option: string) => {
    if (!selected) {
      setSelected(option);
      if (option === fakeQuestions[current].answer) {
        setAnswerStatus("correct");
      } else {
        setAnswerStatus("incorrect");
      }
    }
  };

  const handleNext = () => {
    if (selected === fakeQuestions[current].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    setAnswerStatus(null);
    setTimeWarning(false); // 清除时间警告
    if (current < fakeQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handleSkip = () => {
    setSelected(null);
    setAnswerStatus(null);
    setTimeWarning(false); // 清除时间警告
    if (current < fakeQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/src/pages/student-dashboard/background.jpg')", // 使用相对路径
        backgroundSize: 'cover', // 背景图片铺满全屏
        backgroundPosition: 'center', // 背景居中显示
        backgroundAttachment: 'fixed', // 背景固定
        height: '100vh', // 确保容器高度是全屏
        display: 'flex', // 使用flex布局确保背景全屏显示
        justifyContent: 'center',
        alignItems: 'center', // 使答题框垂直居中
      }}
    >
      {/* PK 按钮 */}
      <div className="absolute top-4 right-4">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-full text-xl hover:bg-blue-600 transition-all">
          挑战PK
        </button>
      </div>

      {/* 学生答题部分 */}
      {!finished ? (
        <div className="bg-white rounded shadow p-6 opacity-90 max-w-xl w-full mx-auto">
          {/* 进度条 */}
          <div className="mb-4">
            <progress value={current + 1} max={fakeQuestions.length} className="w-full" />
            <div className="text-sm text-right">{current + 1} / {fakeQuestions.length}</div>
          </div>

          <div className="mb-4 font-semibold">
            题目 {current + 1}：{fakeQuestions[current].question}
          </div>

          {/* 剩余时间 */}
          <div className="text-sm mb-2">
            剩余时间：{timer}秒
            {timeWarning && <span className="text-red-500 ml-2">时间快到了！</span>}
          </div>

          {/* 选项按钮 */}
          <div className="grid gap-2 mb-4">
            {fakeQuestions[current].options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded border ${selected === option ? 'bg-blue-100 border-blue-500' : 'border-gray-300'} ${selected ? 'cursor-not-allowed' : ''}`}
                onClick={() => handleOptionClick(option)}
                disabled={!!selected} // 禁用所有选项
              >
                {option}
              </button>
            ))}
          </div>

          {/* 答案反馈 */}
          <div className={answerStatus === "correct" ? "text-green-500" : answerStatus === "incorrect" ? "text-red-500" : ""}>
            {answerStatus === "correct" ? "正确!" : answerStatus === "incorrect" ? "错误!" : ""}
          </div>

          {/* 按钮部分 */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded w-1/3"
              onClick={handleSkip}
            >
              跳过
            </button>

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded w-1/3"
              onClick={handleNext}
              disabled={!selected}
            >
              {current < fakeQuestions.length - 1 ? '下一题' : '提交'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded shadow p-6 text-center opacity-90 max-w-xl w-full mx-auto">
          <div className="text-xl mb-2">答题结束！</div>
          <div>你的得分：{score} / {fakeQuestions.length}</div>

          {/* 答题回顾 */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">答题回顾</h3>
            {fakeQuestions.map((question, index) => (
              <div key={index} className="mb-2">
                <p>{question.question}</p>
                <p>你的答案：{selected === question.answer ? "正确" : "错误"}</p>
                <p>正确答案：{question.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
