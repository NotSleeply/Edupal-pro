import {CourseType} from "./types";

const initialCourses: CourseType[] = [
  {
    id: 1,
    name: "高等数学",
    description: "高等数学基础课程，包括微积分、线性代数等内容",
    createdAt: "2024-09-01",
    students: [
      { id: 1, name: "张三", studentId: "2024001", email: "zhangsan@example.com" },
      { id: 2, name: "李四", studentId: "2024002", email: "lisi@example.com" },
      { id: 3, name: "王五", studentId: "2024003", email: "wangwu@example.com" },
    ],
    homeworks: [
      { 
        id: 1, 
        title: "第一章练习", 
        description: "完成教材第一章所有习题",
        deadline: "2025-09-30", 
        status: "published" 
      },
      { 
        id: 2, 
        title: "微积分作业", 
        description: "求解给定函数的导数和积分",
        deadline: "2025-10-05", 
        status: "draft" 
      },
    ],
    exams: [
      { 
        id: 1, 
        title: "期中考试", 
        description: "第1-5章内容测试",
        date: "2025-10-15", 
        duration: 120,
        status: "published" 
      },
    ],
  },
  {
    id: 2,
    name: "计算机程序设计",
    description: "C++程序设计基础课程",
    createdAt: "2024-09-01",
    students: [
      { id: 4, name: "赵六", studentId: "2024004", email: "zhaoliu@example.com" },
      { id: 5, name: "孙七", studentId: "2024005", email: "sunqi@example.com" },
    ],
    homeworks: [
      { 
        id: 3, 
        title: "基础语法练习", 
        description: "完成C++基础语法练习题",
        deadline: "2025-10-01", 
        status: "published" 
      },
    ],
    exams: [
      { 
        id: 2, 
        title: "程序设计实践考试", 
        description: "现场编程测试",
        date: "2025-10-20", 
        duration: 180,
        status: "draft" 
      },
    ],
  },
];
export { initialCourses };