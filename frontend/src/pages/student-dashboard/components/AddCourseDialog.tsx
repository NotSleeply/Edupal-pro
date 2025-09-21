import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CourseCardProps } from "./courses";
import { CourseMeta } from "../types/data";

interface AddCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (course: CourseCardProps) => void;
}

const AddCourseDialog: React.FC<AddCourseDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [school, setSchool] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState("");

  // 根据输入的id查找CourseMeta
  const matched = CourseMeta.find(c => String(c.id) === courseId);

  const handleConfirm = () => {
    if (!matched) {
      setError("课程ID不存在，请输入有效ID");
      return;
    }
    if (!school || school.trim().length < 2) {
      setError("请输入正确的学校名称");
      return;
    }
    onAdd({
      id: matched.id,
      title: matched.title,
      teacher: matched.teacher,
      niandu: school || matched.niandu,
      image: matched.image,
    });
    setSchool("");
    setCourseId("");
    setError("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs">
        <h2 className="text-lg font-bold mb-4">添加课程</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm">课程ID</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={courseId}
            onChange={e => {
              setCourseId(e.target.value);
              setError("");
            }}
            placeholder="请输入课程ID"
          />
        </div>
        {matched && (
          <div className="mb-4 text-sm text-gray-700">
            <div>课程名：{matched.title}</div>
            <div>教师：{matched.teacher}</div>
            <div>
              <img src={matched.image} alt={matched.title} className="w-24 h-14 object-cover rounded mt-1" />
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 text-sm">学校</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={school}
            onChange={e => setSchool(e.target.value)}
            placeholder="请输入学校"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex gap-2">
          <Button className="flex-1" onClick={handleConfirm} disabled={!school || !courseId}>
            确认
          </Button>
          <Button className="flex-1" variant="outline" onClick={onClose}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseDialog;