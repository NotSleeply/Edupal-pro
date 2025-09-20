import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defaultCourses, questionBank } from "../types/data";
import type { QuestionType } from "../types/types";
import CourseHomework from "./CourseHomework";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const course = defaultCourses.find(c => String(c.id) === id);
  const questions: QuestionType[] = course ? questionBank[course.title] || [] : [];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">
        {course ? `${course.title}详情` : "课程详情"}
      </h2>
      <Tabs defaultValue="homework" className="space-y-4">
        <TabsList>
          <TabsTrigger value="homework">作业</TabsTrigger>
          <TabsTrigger value="tests">考试</TabsTrigger>
          <TabsTrigger value="grades">成绩</TabsTrigger>
        </TabsList>
        <TabsContent value="homework">
          {!course ? (
            <div className="p-4 text-center text-muted-foreground">未找到课程</div>
          ) : (
            <CourseHomework questions={questions} />
          )}
        </TabsContent>
        <TabsContent value="tests">
          <div className="p-4 text-center text-muted-foreground">
            本课程未发布考试...
          </div>
        </TabsContent>
        <TabsContent value="grades">
          <div className="p-4 text-center text-muted-foreground">
            本课程未发布成绩...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetail;