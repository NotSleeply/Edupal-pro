import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">课程详情（ID: {id}）</h2>
      <Tabs defaultValue="homework" className="space-y-4">
        <TabsList>
          <TabsTrigger value="homework">作业</TabsTrigger>
          <TabsTrigger value="tests">考试</TabsTrigger>
          <TabsTrigger value="grades">成绩</TabsTrigger>
        </TabsList>
        <TabsContent value="homework">
          <div className="p-4 text-center text-muted-foreground">
            本课程作业功能开发中...
          </div>
        </TabsContent>
        <TabsContent value="tests">
          <div className="p-4 text-center text-muted-foreground">
            本课程考试功能开发中...
          </div>
        </TabsContent>
        <TabsContent value="grades">
          <div className="p-4 text-center text-muted-foreground">
            本课程成绩功能开发中...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetail;