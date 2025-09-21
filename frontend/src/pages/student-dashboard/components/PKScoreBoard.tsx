import React from "react";
import type { OpponentType } from "../types/types";

interface PKScoreBoardProps {
  userScore: number;
  opponentScore: number;
  opponent: OpponentType;
}

const PKScoreBoard: React.FC<PKScoreBoardProps> = ({
  userScore,
  opponentScore,
  opponent,
}) => (
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
          <img src={opponent.avatar} alt={opponent.name} className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-medium text-gray-700 ml-1">{opponent.name}</span>
      </div>
    </div>
    <div className="text-center">
      <p className="text-sm text-gray-600">对手得分</p>
      <p className="text-2xl font-bold text-gray-800">{opponentScore}</p>
    </div>
  </div>
);

export default PKScoreBoard;