import React from "react";
import type { OpponentType } from "../types/types";

interface PKWaitingOpponentProps {
  opponent: OpponentType;
  waitingTimer: number;
}

const PKWaitingOpponent: React.FC<PKWaitingOpponentProps> = ({ opponent, waitingTimer }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">等待对手准备...</h2>
    <div className="flex justify-center items-center gap-6 mb-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500 mx-auto mb-2">
          <img src="https://tongque.ocybers.com/img/logo.jpg" alt="你的头像" className="w-full h-full object-cover" />
        </div>
        <div className="text-xs text-green-600 font-medium">✓ 已准备</div>
      </div>
      <div className="text-2xl font-bold text-gray-400">VS</div>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 mx-auto mb-2">
          <img src={opponent.avatar} alt={opponent.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-xs text-gray-500">准备中...</div>
      </div>
    </div>
    <div className="text-lg text-gray-600 mb-4">
      {opponent.name} 正在准备中
    </div>
    <div className="text-sm text-gray-500 mb-6">
      等待时间：{waitingTimer} 秒
    </div>
    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
      <div className="text-yellow-800 text-sm">请稍等，对手即将准备完成...</div>
    </div>
  </div>
);

export default PKWaitingOpponent;