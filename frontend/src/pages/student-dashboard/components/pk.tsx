import React, { useState, useEffect, useMemo } from 'react';
import { subjectOpponents, questionBank } from '../types/data';
import type { QuestionType } from '../types/types';
import PKMatching from './PKMatching';
import PKMatched from './PKMatched';
import PKWaitingOpponent from './PKWaitingOpponent';
import PKSummary from './PKSummary';
import PKResult from './PKResult';
import PKQuestionPanel from './PKQuestionPanel';
import PKStartPanel from './PKStartPanel';

// PK组件
const PKComponent = () => {
  const [subject, setSubject] = useState("语文");
  const [grade, setGrade] = useState("一年级");
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
  
  // 新增状态
  const [isMatching, setIsMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
  const [matchingTimer, setMatchingTimer] = useState(0);
  const [waitingTimer, setWaitingTimer] = useState(0);

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
    setTimer(15);
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
  }, [isPkStarted, isPkFinished, isAnswered, currentQuestion]);

  // 匹配计时器
  useEffect(() => {
    if (!isMatching) return;
    const interval = setInterval(() => {
      setMatchingTimer(prev => prev + 1);
    }, 1000);
    
    // 3-6秒后匹配成功
    const matchDelay = Math.random() * 3000 + 3000; // 3-6秒
    const timeout = setTimeout(() => {
      setIsMatching(false);
      setIsMatched(true);
    }, matchDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isMatching]);

  // 等待对手计时器
  useEffect(() => {
    if (!isWaitingForOpponent) return;
    const interval = setInterval(() => {
      setWaitingTimer(prev => prev + 1);
    }, 1000);
    
    // 2-4秒后对手准备完成
    const waitDelay = Math.random() * 2000 + 2000; // 2-4秒
    const timeout = setTimeout(() => {
      setIsWaitingForOpponent(false);
      startActualPK();
    }, waitDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isWaitingForOpponent]);

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
    setIsMatching(false);
    setIsMatched(false);
    setIsWaitingForOpponent(false);
    setMatchingTimer(0);
    setWaitingTimer(0);
  };

  const getRandomQuestions = (allQuestions: QuestionType[], count: number) => {
    const arr = [...allQuestions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, count);
  };

  const startMatching = () => {
    setIsMatching(true);
    setMatchingTimer(0);
  };

  const handleReady = () => {
    setIsMatched(false);
    setIsWaitingForOpponent(true);
    setWaitingTimer(0);
  };

  const startActualPK = () => {
    const all = questionBank[subject] || [];
    const randomQuestions = getRandomQuestions(all, 5);
    setQuestions(randomQuestions);
    setIsPkStarted(true);
    setCurrentQuestion(0);
    setUserScore(0);
    setOpponentScore(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setTimer(15);
    setIsPkFinished(false);
    setShowPKSummary(false);
    setUserAnswers(Array(5).fill(null));
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
          className="mt-5 w-full py-3 bg-black text-white rounded-lg hover:bg白 hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
          onClick={handleNextQuestion}
        >
          {currentQuestion >= 4 ? '查看结果' : '下一题'}
        </button>
      </div>
    );
  };

  // 匹配界面
  if (isMatching) {
    return (
      <PKMatching
        subject={subject}
        grade={grade}
        matchingTimer={matchingTimer}
        onCancel={() => setIsMatching(false)}
      />
    );
  }

  // 匹配成功界面
  if (isMatched) {
    return (
      <PKMatched
        grade={grade}
        subject={subject}
        opponent={currentOpponent}
        onReady={handleReady}
      />
    );
  }

  // 等待对手界面
  if (isWaitingForOpponent) {
    return (
      <PKWaitingOpponent
        opponent={currentOpponent}
        waitingTimer={waitingTimer}
      />
    );
  }

  // 初始选择界面
  if (!isPkStarted && !isPkFinished) {
    return (
      <PKStartPanel
        subject={subject}
        grade={grade}
        onSubjectChange={setSubject}
        onGradeChange={setGrade}
        onStart={startMatching}
      />
    );
  }

  if (showPKSummary) {
    return (
      <PKSummary
        questions={questions}
        userAnswers={userAnswers}
        onBack={() => setShowPKSummary(false)}
      />
    );
  }

  if (isPkFinished) {
    return (
      <PKResult
        userScore={userScore}
        opponentScore={opponentScore}
        opponent={currentOpponent}
        onRetry={resetPK}
        onShowSummary={() => setShowPKSummary(true)}
      />
    );
  }

  // PK答题主界面
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
      <PKQuestionPanel
        question={questions[currentQuestion]}
        userAnswer={userAnswer}
        isAnswered={isAnswered}
        onOptionClick={handleOptionClick}
        onInputChange={handleInputChange}
        onSubmitAnswer={handleSubmitAnswer}
        timer={timer}
      />
      {renderAnswerResult()}
    </div>
  );
};

export default PKComponent;