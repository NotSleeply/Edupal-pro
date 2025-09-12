import React, { useState } from "react";

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
}

interface QuizProps {
  questions: Question[];
  updateScore: (points: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, updateScore }) => {
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

export default Quiz;
