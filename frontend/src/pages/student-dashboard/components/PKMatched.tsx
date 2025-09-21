import React from "react";
import type { OpponentType } from "../types/types";

interface PKMatchedProps {
  grade: string;
  subject: string;
  opponent: OpponentType;
  onReady: () => void;
}

const PKMatched: React.FC<PKMatchedProps> = ({ grade, subject, opponent, onReady }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">匹配成功！</h2>
    <div className="flex justify-center items-center gap-6 mb-8">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-500 mx-auto mb-2">
          <img src="https://tongque.ocybers.com/img/logo.jpg" alt="你的头像" className="w-full h-full object-cover" />
        </div>
        <p className="text-lg font-bold text-gray-800">你</p>
        <p className="text-sm text-gray-500">{grade}</p>
      </div>
      <div className="text-3xl font-bold text-green-600">VS</div>
      <div className="text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 mx-auto mb-2">
          <img src={opponent.avatar} alt={opponent.name} className="w-full h-full object-cover" />
        </div>
        <p className="text-lg font-bold text-gray-800">{opponent.name}</p>
        <p className="text-sm text-gray-500">{opponent.title}</p>
      </div>
    </div>
    <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
      <div className="text-green-800 font-medium mb-2">✓ 匹配成功</div>
      <div className="text-green-700 text-sm">科目：{subject} | 年级：{grade}</div>
    </div>
    <button
      onClick={onReady}
      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
    >
      准备就绪
    </button>
  </div>
);

export default PKMatched;