import React, { useState } from "react";
import './styles.css';  // 引入 student-new 页面相关的样式

// 定义 Option 类型
interface Option {
  id: string;
  text: string;
}

// 定义 Question 类型
interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

// 模拟题目数据
const initialQuestions: Question[] = [
  {
    id: 1,
    question: "勾股定理的公式是?",
    options: [
      { id: 'a', text: "a² + b² = c²" },
      { id: 'b', text: "a² - b² = c²" },
      { id: 'c', text: "a² + c² = b²" }
    ],
    correctAnswer: "a",
    explanation: "勾股定理说明在一个直角三角形中，两个直角边的平方和等于斜边的平方。"
  },
  {
    id: 2,
    question: "三角形面积公式是什么?",
    options: [
      { id: 'a', text: "1/2 * 底 * 高" },
      { id: 'b', text: "底 * 高" },
      { id: 'c', text: "1/2 * 底 * 斜边" }
    ],
    correctAnswer: "a",
    explanation: "三角形面积的公式为 1/2 * 底 * 高。"
  },
  // 更多题目
];

const StudentNewPage = () => {
  const [score, setScore] = useState<number>(0);  // 学生积分
  const [rank, setRank] = useState("初学者");  // 学生段位
  const [pkScore, setPkScore] = useState(0);  // 答题PK中的积分

  // 更新学生积分和段位
  const updateScore = (points: number) => {
    setScore(prevScore => prevScore + points);
    if (score >= 100) {
      setRank("专家");
    } else if (score >= 50) {
      setRank("中级");
    } else {
      setRank("初学者");
    }
  };

  // 更新PK对战积分
  const updatePkScore = (points: number) => {
    setPkScore(prevScore => prevScore + points);
  };

  return (
    <div className="student-new-page">
      <Navbar score={score} />
      <div className="content">
        <Quiz questions={initialQuestions} updateScore={updateScore} />
        <PkMatch updatePkScore={updatePkScore} rank={rank} />
      </div>
    </div>
  );
};

// 导航栏组件（只显示积分）
const Navbar: React.FC<{ score: number }> = ({ score }) => (
  <div className="navbar">
    <div className="logo">学生答题系统</div>
    <div className="score-info">
      <p>积分: {score}</p>
    </div>
  </div>
);

// 答题组件
const Quiz: React.FC<{ questions: Question[], updateScore: (points: number) => void }> = ({ questions, updateScore }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      updateScore(10);  // 答对加分
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="quiz-container">
      <h2>线上答题</h2>
      {quizFinished ? (
        <div className="quiz-finished">
          <h3>答题完成!</h3>
        </div>
      ) : (
        <div className="question">
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option: Option) => (
              <label key={option.id}>
                <input
                  type="radio"
                  name="answer"
                  value={option.id}
                  checked={selectedAnswer === option.id}
                  onChange={() => handleAnswerChange(option.id)}
                />
                {option.text}
              </label>
            ))}
          </div>
          <button onClick={handleSubmit}>提交</button>
        </div>
      )}
    </div>
  );
};

// 答题PK组件（显示段位）
const PkMatch: React.FC<{ updatePkScore: (points: number) => void, rank: string }> = ({ updatePkScore, rank }) => {
  const [selectedPkAnswer, setSelectedPkAnswer] = useState<string | null>(null);
  const [matchFinished, setMatchFinished] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);

  const handlePkAnswerChange = (answer: string) => {
    setSelectedPkAnswer(answer);
  };

  const handlePkSubmit = () => {
    if (selectedPkAnswer === 'a') { // 假设正确答案为'a'
      updatePkScore(10);
      setPlayerScore(playerScore + 10);
    } else {
      updatePkScore(-5);
      setPlayerScore(playerScore - 5);
    }
    setMatchFinished(true);
  };

  return (
    <div className="pk-container">
      <h2>专项答题PK</h2>
      <div className="pk-rank">当前段位：{rank}</div>
      {matchFinished ? (
        <div className="match-result">
          <h3>比赛结束！你获得了 {playerScore} 分。</h3>
        </div>
      ) : (
        <div className="pk-question">
          <p>求解三角形面积的公式?</p>
          <div className="pk-options">
            <label>
              <input
                type="radio"
                name="pk-answer"
                value="a"
                checked={selectedPkAnswer === 'a'}
                onChange={() => handlePkAnswerChange('a')}
              />
              a. 1/2 * 底 * 高
            </label>
            <label>
              <input
                type="radio"
                name="pk-answer"
                value="b"
                checked={selectedPkAnswer === 'b'}
                onChange={() => handlePkAnswerChange('b')}
              />
              b. 底 * 高
            </label>
          </div>
          <button onClick={handlePkSubmit}>提交</button>
        </div>
      )}
    </div>
  );
};

export default StudentNewPage;
