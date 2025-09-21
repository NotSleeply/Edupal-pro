import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Folder } from "lucide-react";
import PKComponent from "./components/pk";
import MyCourses, { CourseCardProps } from "./components/courses";
import AddCourseDialog from "./components/AddCourseDialog";
import { defaultCourses } from "./types/data";

const LOCAL_KEY = "student_dashboard_courses";

const StudentDashboard = () => {
  // 初始化时从 localStorage 读取
  const [courses, setCourses] = useState<CourseCardProps[]>(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.warn("无法解析本地存储的课程数据");
      }
    }
    return defaultCourses;
  });
  const [showDialog, setShowDialog] = useState(false);

  // 每次课程变化时保存
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(courses));
  }, [courses]);

  const handleAddCourse = (course: CourseCardProps) => {
    setCourses((prev) => [...prev, course]);
    setShowDialog(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              添加课程
            </Button>
            <Button variant="outline">
              <Folder className="mr-2 h-4 w-4" />
              新建文件夹
            </Button>
          </div>
        </div>

        <AddCourseDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          onAdd={handleAddCourse}
        />

        <Tabs defaultValue="my-courses" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="my-courses">我的课程</TabsTrigger>
              <TabsTrigger value="PK">PK</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="my-courses">
            <MyCourses courses={courses} />
          </TabsContent>
          <TabsContent value="PK">
            <PKComponent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
