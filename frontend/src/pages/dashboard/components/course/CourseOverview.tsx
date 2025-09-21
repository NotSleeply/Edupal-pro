import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar } from "lucide-react";
import { CourseType } from "./types";

interface CourseOverviewProps {
  course: CourseType;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => (
  <Card>
    <CardHeader>
      <CardTitle>{course.name}</CardTitle>
      <CardDescription>{course.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{course.students.length} 名学生</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{course.homeworks.length} 个作业</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{course.exams.length} 场考试</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CourseOverview;