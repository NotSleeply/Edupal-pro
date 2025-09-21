import React from "react";

interface PKStartPanelProps {
  subject: string;
  grade: string;
  onSubjectChange: (v: string) => void;
  onGradeChange: (v: string) => void;
  onStart: () => void;
}

const PKStartPanel: React.FC<PKStartPanelProps> = ({
  subject,
  grade,
  onSubjectChange,
  onGradeChange,
  onStart,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">准备开始PK</h2>
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">选择科目</label>
      <select
        value={subject}
        onChange={e => onSubjectChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-base"
      >
        <option value="语文">语文</option>
        <option value="数学">数学</option>
        <option value="英语">英语</option>
      </select>
      <label className="block text-gray-700 mb-2 mt-4">选择年级</label>
      <select
        value={grade}
        onChange={e => onGradeChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-base"
      >
        <option value="一年级">一年级</option>
        <option value="二年级">二年级</option>
        <option value="三年级">三年级</option>
        <option value="四年级">四年级</option>
        <option value="五年级">五年级</option>
        <option value="六年级">六年级</option>
        <option value="初一">初一</option>
        <option value="初二">初二</option>
        <option value="初三">初三</option>
        <option value="高一">高一</option>
        <option value="高二">高二</option>
        <option value="高三">高三</option>
        <option value="大学">大学</option>
      </select>
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
      onClick={onStart}
      className="w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
    >
      开始匹配
    </button>
  </div>
);

export default PKStartPanel;