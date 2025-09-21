import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, BookOpen, FileText, Calendar } from "lucide-react";

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

interface Course {
  id: number;
  name: string;
  description: string;
  students: Student[];
  homeworks: Homework[];
  exams: Exam[];
  createdAt: string;
}

const initialCourses: Course[] = [
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

const Course: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(courses[0]?.id ?? 1);
  const [activeTab, setActiveTab] = useState<"students" | "homeworks" | "exams">("students");

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  // 添加学生
  const handleAddStudent = (name: string, studentId: string, email: string) => {
    if (!selectedCourse) return;
    const newStudent: Student = { id: Date.now(), name, studentId, email };
    setCourses(cs =>
      cs.map(c =>
        c.id === selectedCourse.id
          ? { ...c, students: [...c.students, newStudent] }
          : c
      )
    );
  };

  // 添加作业
  const handleAddHomework = (title: string, description: string, deadline: string) => {
    if (!selectedCourse) return;
    const newHomework: Homework = { 
      id: Date.now(), 
      title, 
      description, 
      deadline, 
      status: "draft" 
    };
    setCourses(cs =>
      cs.map(c =>
        c.id === selectedCourse.id
          ? { ...c, homeworks: [...c.homeworks, newHomework] }
          : c
      )
    );
  };

  // 添加考试
  const handleAddExam = (title: string, description: string, date: string, duration: number) => {
    if (!selectedCourse) return;
    const newExam: Exam = { 
      id: Date.now(), 
      title, 
      description, 
      date, 
      duration, 
      status: "draft" 
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
      {/* 课程选择器 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            我的课程
          </CardTitle>
          <CardDescription>
            管理您的课程、学生、作业和考试
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {courses.map(course => (
              <Button
                key={course.id}
                variant={selectedCourseId === course.id ? "default" : "outline"}
                onClick={() => setSelectedCourseId(course.id)}
                className="h-auto flex-col items-start p-4"
              >
                <div className="font-medium">{course.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {course.students.length} 名学生
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCourse && (
        <>
          {/* 课程信息概览 */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedCourse.name}</CardTitle>
              <CardDescription>{selectedCourse.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCourse.students.length} 名学生</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCourse.homeworks.length} 个作业</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCourse.exams.length} 场考试</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 标签页导航 */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === "students" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("students")}
            >
              <Users className="h-4 w-4 mr-2" />
              学生管理
            </Button>
            <Button
              variant={activeTab === "homeworks" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("homeworks")}
            >
              <FileText className="h-4 w-4 mr-2" />
              作业管理
            </Button>
            <Button
              variant={activeTab === "exams" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("exams")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              考试管理
            </Button>
          </div>

          {/* 学生管理 */}
          {activeTab === "students" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>学生列表</CardTitle>
                    <CardDescription>管理课程中的学生</CardDescription>
                  </div>
                  <AddStudentForm onAdd={handleAddStudent} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCourse.students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          学号: {student.studentId} | 邮箱: {student.email}
                        </div>
                      </div>
                      <Badge variant="secondary">已加入</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 作业管理 */}
          {activeTab === "homeworks" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>作业列表</CardTitle>
                    <CardDescription>管理课程作业</CardDescription>
                  </div>
                  <AddHomeworkForm onAdd={handleAddHomework} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCourse.homeworks.map(homework => (
                    <div key={homework.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{homework.title}</h4>
                            <Badge variant={homework.status === "published" ? "default" : "secondary"}>
                              {homework.status === "published" ? "已发布" : "草稿"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{homework.description}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            截止时间: {homework.deadline}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 考试管理 */}
          {activeTab === "exams" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>考试列表</CardTitle>
                    <CardDescription>管理课程考试</CardDescription>
                  </div>
                  <AddExamForm onAdd={handleAddExam} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCourse.exams.map(exam => (
                    <div key={exam.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{exam.title}</h4>
                            <Badge variant={exam.status === "published" ? "default" : "secondary"}>
                              {exam.status === "published" ? "已发布" : "草稿"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{exam.description}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                            <span>考试时间: {exam.date}</span>
                            <span>时长: {exam.duration} 分钟</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

// 添加学生表单
const AddStudentForm: React.FC<{ onAdd: (name: string, studentId: string, email: string) => void }> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && studentId.trim() && email.trim()) {
      onAdd(name.trim(), studentId.trim(), email.trim());
      setName("");
      setStudentId("");
      setEmail("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        添加学生
      </Button>
    );
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-base">添加学生</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="学生姓名"
              required
            />
          </div>
          <div>
            <Label htmlFor="studentId">学号</Label>
            <Input
              id="studentId"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder="学生学号"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="学生邮箱"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">确认</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// 添加作业表单
const AddHomeworkForm: React.FC<{ onAdd: (title: string, description: string, deadline: string) => void }> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && deadline) {
      onAdd(title.trim(), description.trim(), deadline);
      setTitle("");
      setDescription("");
      setDeadline("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        添加作业
      </Button>
    );
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-base">添加作业</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="hw-title">标题</Label>
            <Input
              id="hw-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="作业标题"
              required
            />
          </div>
          <div>
            <Label htmlFor="hw-description">描述</Label>
            <Input
              id="hw-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="作业描述"
              required
            />
          </div>
          <div>
            <Label htmlFor="hw-deadline">截止时间</Label>
            <Input
              id="hw-deadline"
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">确认</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// 添加考试表单
const AddExamForm: React.FC<{ onAdd: (title: string, description: string, date: string, duration: number) => void }> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && date && duration) {
      onAdd(title.trim(), description.trim(), date, parseInt(duration));
      setTitle("");
      setDescription("");
      setDate("");
      setDuration("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        添加考试
      </Button>
    );
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-base">添加考试</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="exam-title">标题</Label>
            <Input
              id="exam-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="考试标题"
              required
            />
          </div>
          <div>
            <Label htmlFor="exam-description">描述</Label>
            <Input
              id="exam-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="考试描述"
              required
            />
          </div>
          <div>
            <Label htmlFor="exam-date">考试时间</Label>
            <Input
              id="exam-date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="exam-duration">时长(分钟)</Label>
            <Input
              id="exam-duration"
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="120"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">确认</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Course;