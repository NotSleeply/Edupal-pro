
interface Student {
  id: number;
  name: string;
  studentId: string;
  email: string;
}

interface Homework {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: "draft" | "published";
}

interface Exam {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: number; // 分钟
  status: "draft" | "published";
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

export type { CourseType, Student, Homework, Exam };