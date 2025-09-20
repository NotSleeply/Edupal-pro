import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Folder } from "lucide-react";
import PKComponent from "./components/pk";

const CourseCard = ({
  title,
  teacher,
  niandu,
  image,
}: {
  title: string;
  teacher: string;
  niandu: string;
  image: string;
}) => (
  <div className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
    <div
      className="h-40 bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-1">教师: {teacher}</p>
      <p className="text-sm text-muted-foreground">{niandu}</p>
    </div>
  </div>
);

const MyCourses = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <CourseCard
      title="语文"
      teacher="张云"
      niandu="2025——2026-1"
      image="https://th.bing.com/th/id/OIP.hh4ARKCOB9m3xOhU3DEMNwHaE8?w=281&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
    />
    <CourseCard
      title="数学"
      teacher="李念"
      niandu="2025——2026-1"
      image="https://tse3.mm.bing.net/th/id/OIP.nFlgcnsegrc1dlWl3YxwnAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
    />
    <CourseCard
      title="英语"
      teacher="王老吉"
      niandu="2025——2026-1"
      image="https://tse1.mm.bing.net/th/id/OIP.IKAnaprVXSqeObyfGErQ8AHaFL?rs=1&pid=ImgDetMain&o=7&rm=3"
    />
    <CourseCard
      title="物理"
      teacher="赵娣"
      niandu="2025——2026-1"
      image="https://th.bing.com/th/id/OIP.oWs7cQlJmp7B6AfAWgTmFgHaE8?w=270&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
    />
    <CourseCard
      title="化学"
      teacher="钱唐"
      niandu="2025——2026-1"
      image="https://th.bing.com/th/id/OIP.znz76e61VN7fyDKOJYwvvgHaE7?w=282&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
    />
    <CourseCard
      title="地理"
      teacher="吴心语"
      niandu="2025——2026-1"
      image="https://tse2-mm.cn.bing.net/th/id/OIP-C.NEXlqYnzW1HEVQ3zX2q8DgHaEK?w=303&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
    />
    <CourseCard
      title="科学"
      teacher="郑丰源"
      niandu="2025——2026-1"
      image="https://tse4-mm.cn.bing.net/th/id/OIP-C.o69xavy65VhcESGCe1GVygHaEd?w=254&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
    />
  </div>
);

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
