import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Folder } from "lucide-react";
import PKComponent from "./components/pk";
import MyCourses, { CourseCardProps } from "./components/courses";

const defaultCourses: CourseCardProps[] = [
  {
    title: "语文",
    teacher: "张云",
    niandu: "2025——2026-1",
    image: "https://th.bing.com/th/id/OIP.hh4ARKCOB9m3xOhU3DEMNwHaE8?w=281&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "数学",
    teacher: "李念",
    niandu: "2025——2026-1",
    image: "https://tse3.mm.bing.net/th/id/OIP.nFlgcnsegrc1dlWl3YxwnAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "英语",
    teacher: "王老吉",
    niandu: "2025——2026-1",
    image: "https://tse1.mm.bing.net/th/id/OIP.IKAnaprVXSqeObyfGErQ8AHaFL?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "物理",
    teacher: "赵娣",
    niandu: "2025——2026-1",
    image: "https://th.bing.com/th/id/OIP.oWs7cQlJmp7B6AfAWgTmFgHaE8?w=270&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "化学",
    teacher: "钱唐",
    niandu: "2025——2026-1",
    image: "https://th.bing.com/th/id/OIP.znz76e61VN7fyDKOJYwvvgHaE7?w=282&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "地理",
    teacher: "吴心语",
    niandu: "2025——2026-1",
    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.NEXlqYnzW1HEVQ3zX2q8DgHaEK?w=303&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "科学",
    teacher: "郑丰源",
    niandu: "2025——2026-1",
    image: "https://tse4-mm.cn.bing.net/th/id/OIP-C.o69xavy65VhcESGCe1GVygHaEd?w=254&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
];

const StudentDashboard = () => {
  const [courses, setCourses] = useState<CourseCardProps[]>(defaultCourses);
  const [showDialog, setShowDialog] = useState(false);
  const [school, setSchool] = useState("");
  const [courseId, setCourseId] = useState("");

  // 简单模拟图片和教师
  const randomImg = [
    "https://picsum.photos/300/180?random=1",
    "https://picsum.photos/300/180?random=2",
    "https://picsum.photos/300/180?random=3",
    "https://picsum.photos/300/180?random=4",
    "https://picsum.photos/300/180?random=5",
  ];
  const randomTeacher = ["张伊宁", "李明", "王天棚", "赵二瞪", "钱三思", "孙四海", "周五福", "吴六郎"];
  const randomName = ["Linux网络管理", "Windows系统管理", "C++程序设计", "周五体育足球", "Python编程", "数据结构", "操作系统", "计算机网络"];

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        title: randomName[Math.floor(Math.random() * randomName.length)],
        teacher: randomTeacher[Math.floor(Math.random() * randomTeacher.length)],
        niandu: school || "2025——2026-1",
        image: randomImg[Math.floor(Math.random() * randomImg.length)],
      },
    ]);
    setShowDialog(false);
    setSchool("");
    setCourseId("");
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

        {/* 弹窗 */}
        {showDialog && (
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
                <Button className="flex-1" onClick={handleAddCourse} disabled={!school || !courseId}>
                  确认
                </Button>
                <Button className="flex-1" variant="outline" onClick={() => setShowDialog(false)}>
                  取消
                </Button>
              </div>
            </div>
          </div>
        )}

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
