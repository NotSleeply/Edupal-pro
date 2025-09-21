import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { CourseType } from "./types";

interface CourseSelectorProps {
  courses: CourseType[];
  selectedCourseId: number;
  onCourseChange: (courseId: number) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  selectedCourseId,
  onCourseChange,
}) => (
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
            onClick={() => onCourseChange(course.id)}
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
);

export default CourseSelector;