import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import type { CourseCardProps } from "./courses";

interface AddCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (course: CourseCardProps) => void;
  randomName: string[];
  randomTeacher: string[];
  randomImg: string[];
}

const AddCourseDialog: React.FC<AddCourseDialogProps> = ({
  open,
  onClose,
  onAdd,
  randomName,
  randomTeacher,
  randomImg,
}) => {
  const [school, setSchool] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleConfirm = () => {
    onAdd({
      title: randomName[Math.floor(Math.random() * randomName.length)],
      teacher: randomTeacher[Math.floor(Math.random() * randomTeacher.length)],
      niandu: school || "辽宁省实验中学",
      image: randomImg[Math.floor(Math.random() * randomImg.length)],
    });
    setSchool("");
    setCourseId("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs">
        <h2 className="text-lg font-bold mb-4">添加课程</h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm">学校</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={school}
            onChange={e => setSchool(e.target.value)}
            placeholder="请输入学校"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm">课程ID</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            placeholder="请输入课程ID"
          />
        </div>
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