import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Folder } from "lucide-react";
import PKComponent from "./components/pk";
import MyCourses from "./components/courses";

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加课程
            </Button>
            <Button variant="outline">
              <Folder className="mr-2 h-4 w-4" />
              新建文件夹
            </Button>
          </div>
        </div>

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
            <MyCourses />
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
