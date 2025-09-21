import React from "react";
import type { OpponentType } from "../types/types";

interface PKResultProps {
  userScore: number;
  opponentScore: number;
  opponent: OpponentType;
  onRetry: () => void;
  onShowSummary: () => void;
}

const PKResult: React.FC<PKResultProps> = ({
  userScore,
  opponentScore,
  opponent,
  onRetry,
  onShowSummary,
}) => {
  const isWinner = userScore > opponentScore;
  return (
    <div className="text-center p-8 bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isWinner
          ? `恭喜你战胜${opponent.name}！`
          : userScore === opponentScore
          ? `与${opponent.name}战平！`
          : `很遗憾，你输给了${opponent.name}！`}
      </h2>
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
          <img src={opponent.avatar} alt={opponent.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-left">
          <p className="text-lg font-bold text-gray-800">{opponent.name}</p>
          <p className="text-sm text-gray-500">{opponent.title}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-8 mb-8">
        <div>
          <p className="text-gray-600">你的得分</p>
          <p className="text-3xl font-bold text-gray-800">{userScore}</p>
        </div>
        <div className="text-2xl font-bold text-gray-700">VS</div>
        <div>
          <p className="text-gray-600">{opponent.name} 得分</p>
          <p className="text-3xl font-bold text-gray-800">{opponentScore}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
          onClick={onRetry}
        >
          再挑战一次
        </button>
        <button
          className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
          onClick={onShowSummary}
        >
          查看解析
        </button>
      </div>
    </div>
  );
};

export default PKResult;