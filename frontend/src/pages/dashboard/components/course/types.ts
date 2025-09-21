interface Student {
  id: number;
  name: string;
  studentId: string;
  email: string;
}

interface QuestionDetail {
  id: string | number;
  content: string;
  type: string;
  subject: string;
  difficulty: string;
  grade: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Homework {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: "draft" | "published";
  questions?: QuestionDetail[]; // 新增题目列表
}

interface Exam {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: number; // 分钟
  status: "draft" | "published";
  questions?: QuestionDetail[]; // 考试也可以有题目
}

interface CourseType {
  id: number;
  name: string;
  description: string;
  students: Student[];
  homeworks: Homework[];
  exams: Exam[];
  createdAt: string;
}

export type { CourseType, Student, Homework, Exam, QuestionDetail };