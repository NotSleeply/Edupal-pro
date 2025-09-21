import React from "react";

interface PKMatchingProps {
  subject: string;
  grade: string;
  matchingTimer: number;
  onCancel: () => void;
}

const PKMatching: React.FC<PKMatchingProps> = ({ subject, grade, matchingTimer, onCancel }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">正在匹配对手...</h2>
    <div className="mb-6">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
    </div>
    <div className="text-lg text-gray-600 mb-4">
      匹配条件：{subject} · {grade}
    </div>
    <div className="text-sm text-gray-500">
      已匹配 {matchingTimer} 秒...
    </div>
    <button
      onClick={onCancel}
      className="mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
    >
      取消匹配
    </button>
  </div>
);

export default PKMatching;