import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Folder } from "lucide-react";
import PKComponent from "./components/pk";
import MyCourses, { CourseCardProps } from "./components/courses";
import AddCourseDialog from "./components/AddCourseDialog";
import { defaultCourses, randomImg, randomTeacher, randomName } from "./types/data";

const StudentDashboard = () => {
  const [courses, setCourses] = useState<CourseCardProps[]>(defaultCourses);
  const [showDialog, setShowDialog] = useState(false);

  const handleAddCourse = (course: CourseCardProps) => {
    setCourses([...courses, course]);
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
          randomName={randomName}
          randomTeacher={randomTeacher}
          randomImg={randomImg}
        />

        <Tabs defaultValue="my-courses" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="my-courses">我的课程</TabsTrigger>
              <TabsTrigger value="homework">作业</TabsTrigger>
              <TabsTrigger value="tests">考试</TabsTrigger>
              <TabsTrigger value="schedule">课程表</TabsTrigger>
              <TabsTrigger value="grades">成绩</TabsTrigger>
              <TabsTrigger value="PK">PK</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="my-courses">
            <MyCourses courses={courses} />
          </TabsContent>
          <TabsContent value="homework">
            <div className="p-4 text-center text-muted-foreground">
              作业功能开发中...
            </div>
          </TabsContent>
          <TabsContent value="tests">
            <div className="p-4 text-center text-muted-foreground">
              考试功能开发中...
            </div>
          </TabsContent>
          <TabsContent value="schedule">
            <div className="p-4 text-center text-muted-foreground">
              课程表功能开发中...
            </div>
          </TabsContent>
          <TabsContent value="grades">
            <div className="p-4 text-center text-muted-foreground">
              成绩功能开发中...
            </div>
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
