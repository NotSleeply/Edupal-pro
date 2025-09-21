import React, { useState } from "react";
import { CourseType, QuestionDetail } from "./types";
import { initialCourses } from "./data";
import CourseSelector from "./CourseSelector";
import CourseOverview from "./CourseOverview";
import TabNavigation from "./TabNavigation";
import StudentManagement from "./StudentManagement";
import HomeworkManagement from "./HomeworkManagement";
import ExamManagement from "./ExamManagement";

type TabType = "students" | "homeworks" | "exams";

const Course: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>(initialCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(courses[0]?.id ?? 1);
  const [activeTab, setActiveTab] = useState<TabType>("students");

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  // 添加学生
  const handleAddStudent = (name: string, studentId: string, email: string) => {
    if (!selectedCourse) return;
    const newStudent = { id: Date.now(), name, studentId, email };
    setCourses(cs =>
      cs.map(c =>
        c.id === selectedCourse.id
          ? { ...c, students: [...c.students, newStudent] }
          : c
      )
    );
  };

  // 添加作业（支持题目）
  const handleAddHomework = (title: string, description: string, deadline: string, questions: QuestionDetail[] = []) => {
    if (!selectedCourse) return;
    const newHomework = { 
      id: Date.now(), 
      title, 
      description, 
      deadline, 
      status: "draft" as const,
      questions // 新增题目列表
    };
    setCourses(cs =>
      cs.map(c =>
        c.id === selectedCourse.id
          ? { ...c, homeworks: [...c.homeworks, newHomework] }
          : c
      )
    );
  };

  // 发布作业
  const handlePublishHomework = (homeworkId: number) => {
    if (!selectedCourse) return;
    setCourses(cs =>
      cs.map(c =>
        c.id === selectedCourse.id
          ? {
              ...c,
              homeworks: c.homeworks.map(hw =>
                hw.id === homeworkId
                  ? { ...hw, status: "published" as const }
                  : hw
              )
            }
          : c
      )
    );
  };

  // 添加考试
  const handleAddExam = (title: string, description: string, date: string, duration: number) => {
    if (!selectedCourse) return;
    const newExam = { 
      id: Date.now(), 
      title, 
      description, 
      date, 
      duration, 
      status: "draft" as const
    };
    setCourses(cs =>
      cs.map(c =>
        c.id === selectedCourse.id
          ? { ...c, exams: [...c.exams, newExam] }
          : c
      )
    );
  };

  return (
    <div className="space-y-6">
      <CourseSelector
        courses={courses}
        selectedCourseId={selectedCourseId}
        onCourseChange={setSelectedCourseId}
      />

      {selectedCourse && (
        <>
          <CourseOverview course={selectedCourse} />
          
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "students" && (
            <StudentManagement
              students={selectedCourse.students}
              onAddStudent={handleAddStudent}
            />
          )}

          {activeTab === "homeworks" && (
            <HomeworkManagement
              homeworks={selectedCourse.homeworks}
              onAddHomework={handleAddHomework}
              onPublishHomework={handlePublishHomework}
            />
          )}

          {activeTab === "exams" && (
            <ExamManagement
              exams={selectedCourse.exams}
              onAddExam={handleAddExam}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Course;