import React from "react";
import { mockGrades } from "../types/data";



const CourseGrades: React.FC = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border rounded-lg">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-left">排名</th>
          <th className="py-2 px-4 border-b text-left">姓名</th>
          <th className="py-2 px-4 border-b text-left">成绩</th>
        </tr>
      </thead>
      <tbody>
        {mockGrades.map((item) => (
          <tr key={item.id} className={item.name === "你" ? "bg-yellow-50 font-bold" : ""}>
            <td className="py-2 px-4 border-b">{item.rank}</td>
            <td className="py-2 px-4 border-b">{item.name}</td>
            <td className="py-2 px-4 border-b">{item.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CourseGrades;