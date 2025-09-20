import React, { useState, useEffect, useMemo } from 'react';
import { subjectOpponents, questionBank,  } from '../types/data';
import type { QuestionType } from '../types/types';


// PK组件
const PKComponent = () => {
  const [subject, setSubject] = useState("语文");
  const [questions, setQuestions] = useState<QuestionType[]>(questionBank[subject]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(15);
  const [isPkStarted, setIsPkStarted] = useState(false);
  const [isPkFinished, setIsPkFinished] = useState(false);
  const [showPKSummary, setShowPKSummary] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([null, null, null, null, null]);

  const currentOpponent = useMemo(() => {
    return subjectOpponents[subject] || {
      name: "匿名挑战者",
      avatar: "https://picsum.photos/id/64/100/100",
      title: "未知挑战者",
      description: "神秘的PK对手"
    };
  }, [subject]);

  useEffect(() => {
    setQuestions(questionBank[subject] || []);
    resetPK();
  }, [subject]);

  useEffect(() => {
    if (!isPkStarted || isPkFinished || isAnswered) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPkStarted, isPkFinished, isAnswered]);

  const resetPK = () => {
    setCurrentQuestion(0);
    setUserScore(0);
    setOpponentScore(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setTimer(15);
    setIsPkFinished(false);
    setShowPKSummary(false);
    setUserAnswers([null, null, null, null, null]);
  };

  const startPK = () => {
    setIsPkStarted(true);
    resetPK();
  };

  const handleTimeOut = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    simulateOpponentAnswer();
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setUserAnswer(option);
    setIsAnswered(true);
    const isCorrectAnswer = option === questions[currentQuestion].answer;
    setIsCorrect(isCorrectAnswer);
    if (isCorrectAnswer) setUserScore(prev => prev + 10);
    simulateOpponentAnswer();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer || isAnswered) return;
    setIsAnswered(true);
    const isCorrectAnswer = userAnswer === questions[currentQuestion].answer;
    setIsCorrect(isCorrectAnswer);
    if (isCorrectAnswer) setUserScore(prev => prev + 10);
    simulateOpponentAnswer();
  };

  const simulateOpponentAnswer = () => {
    setTimeout(() => {
      const opponentCorrect = Math.random() > 0.3;
      if (opponentCorrect) setOpponentScore(prev => prev + 10);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= 4) {
      setIsPkFinished(true);
      setShowPKSummary(false);
      return;
    }
    setCurrentQuestion(prev => prev + 1);
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setTimer(15);
  };

  useEffect(() => {
    if (!isAnswered) return;
    setUserAnswers(prev => {
      const newArr = [...prev];
      newArr[currentQuestion] = userAnswer ?? null;
      return newArr;
    });
  }, [isAnswered, currentQuestion, userAnswer]);

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === "选择题" || question.type === "判断题") {
      return (
        <div className="grid gap-4 mt-6 w-full max-w-3xl mx-auto">
          {question.options?.map((option) => (
            <button
              key={option}
              className={`px-6 py-4 rounded-lg text-left transition-all duration-200 text-lg font-normal w-full ${
                isAnswered
                  ? option === question.answer
                    ? "bg-gray-100 border-gray-600 text-gray-800 border-2"
                    : userAnswer === option
                      ? "bg-gray-200 border-gray-400 text-gray-600 border-2"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  : "bg-white border border-gray-300 hover:border-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
    if (question.type === "填空题" || question.type === "计算题") {
      return (
        <div className="mt-6 w-full max-w-2xl mx-auto">
          <input
            type="text"
            className="w-full px-6 py-4 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg"
            value={userAnswer || ''}
            onChange={handleInputChange}
            placeholder="请输入答案"
            disabled={isAnswered}
          />
          <button
            className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 text-base w-full"
            onClick={handleSubmitAnswer}
            disabled={!userAnswer || isAnswered}
          >
            提交答案
          </button>
        </div>
      );
    }
    return null;
  };

  const renderAnswerResult = () => {
    if (!isAnswered) return null;
    return (
      <div className="mt-6 p-6 rounded-lg mb-6 border border-gray-200 w-full max-w-2xl mx-auto">
        <div className={`text-center font-medium text-xl ${
          isCorrect ? 'text-gray-800 font-semibold' : 'text-gray-600'
        }`}>
          {isCorrect ? '回答正确！+10分' : `回答错误！正确答案是：${questions[currentQuestion].answer}`}
        </div>
        <div className="text-center text-gray-500 mt-3 text-base">
          {currentOpponent.name} 得分: {opponentScore - (isPkFinished ? 0 : 10)} → {opponentScore}
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-700 text-base">
          <div className="font-semibold mb-1 text-gray-800">题目解析</div>
          <div>{questions[currentQuestion].analysis}</div>
          {!isCorrect && (
            <div className="mt-2 text-red-600 font-medium">你的答案：{userAnswer ?? "未作答"}（错误）</div>
          )}
        </div>
        <button
          className="mt-5 w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
          onClick={handleNextQuestion}
        >
          {currentQuestion >= 4 ? '查看结果' : '下一题'}
        </button>
      </div>
    );
  };

  const renderPKSummary = () => {
    return (
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
          onClick={() => setShowPKSummary(false)}
        >
          返回结果页
        </button>
      </div>
    );
  };

  const renderPKResult = () => {
    const isWinner = userScore > opponentScore;
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isWinner ? `恭喜你战胜${currentOpponent.name}！` : userScore === opponentScore ? `与${currentOpponent.name}战平！` : `很遗憾，你输给了${currentOpponent.name}！`}
        </h2>

        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
            <img src={currentOpponent.avatar} alt={currentOpponent.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-gray-800">{currentOpponent.name}</p>
            <p className="text-sm text-gray-500">{currentOpponent.title}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 mb-8">
          <div>
            <p className="text-gray-600">你的得分</p>
            <p className="text-3xl font-bold text-gray-800">{userScore}</p>
          </div>
          <div className="text-2xl font-bold text-gray-700">VS</div>
          <div>
            <p className="text-gray-600">{currentOpponent.name} 得分</p>
            <p className="text-3xl font-bold text-gray-800">{opponentScore}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
            onClick={startPK}
          >
            再挑战一次
          </button>

          <button
            className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
            onClick={() => setShowPKSummary(true)}
          >
            查看解析
          </button>
        </div>
      </div>
    );
  };

  if (!isPkStarted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">准备开始PK</h2>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">选择科目</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-base"
          >
            <option value="语文">语文</option>
            <option value="数学">数学</option>
            <option value="英语">英语</option>
          </select>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-100">
          <h3 className="font-medium mb-3 text-gray-800">你的对手</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
              <img src={currentOpponent.avatar} alt={currentOpponent.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{currentOpponent.name}</p>
              <p className="text-sm text-gray-500">{currentOpponent.title}</p>
              <p className="text-xs text-gray-400 mt-1">{currentOpponent.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
          <h3 className="font-medium mb-2 text-gray-800">PK规则</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 每轮PK将随机抽取5道题目</li>
            <li>• 每道题有15秒答题时间</li>
            <li>• 答对一题得10分</li>
            <li>• 得分高者获胜</li>
          </ul>
        </div>

        <button
          onClick={startPK}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
        >
          挑战 {currentOpponent.name}
        </button>
      </div>
    );
  }

  if (showPKSummary) {
    return renderPKSummary();
  }

  if (isPkFinished) {
    return renderPKResult();
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">你的得分</p>
          <p className="text-2xl font-bold text-gray-800">{userScore}</p>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-2 border border-gray-200">
            <img src="https://tongque.ocybers.com/img/logo.jpg" alt="你的头像" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-gray-700">VS</span>
          <div className="flex items-center ml-2">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
              <img src={currentOpponent.avatar} alt={currentOpponent.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-gray-700 ml-1">{currentOpponent.name}</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">对手得分</p>
          <p className="text-2xl font-bold text-gray-800">{opponentScore}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700">题目 {currentQuestion + 1}/5</span>
          <span className={`font-medium ${timer <= 5 ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
            剩余时间: {timer}秒
          </span>
        </div>
        <progress
          value={currentQuestion + 1}
          max="5"
          className="w-full h-2 bg-gray-200 rounded-full"
        />
      </div>

      <div className="mb-6 text-center">
        <h3 className="text-xl font-medium text-gray-800">{questions[currentQuestion].question}</h3>
      </div>

      {renderQuestion()}
      {renderAnswerResult()}
    </div>
  );
};

export default PKComponent;