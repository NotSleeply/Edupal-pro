import React, { useState } from "react";

interface PkMatchProps {
  updatePkScore: (points: number) => void;
}

const PkMatch: React.FC<PkMatchProps> = ({ updatePkScore }) => {
  const [selectedPkAnswer, setSelectedPkAnswer] = useState<string | null>(null);
  const [matchFinished, setMatchFinished] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  
  const handlePkAnswerChange = (answer: string) => {
    setSelectedPkAnswer(answer);
  };

  const handlePkSubmit = () => {
    if (selectedPkAnswer === "a") { // 假设正确答案为'a'
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
                checked={selectedPkAnswer === "a"}
                onChange={() => handlePkAnswerChange("a")}
              />
              a. 1/2 * 底 * 高
            </label>
            <label>
              <input
                type="radio"
                name="pk-answer"
                value="b"
                checked={selectedPkAnswer === "b"}
                onChange={() => handlePkAnswerChange("b")}
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

export default PkMatch;
