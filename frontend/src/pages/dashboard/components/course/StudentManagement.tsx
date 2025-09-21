import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Student } from "./types";
import AddStudentForm from "./AddStudentForm";

interface StudentManagementProps {
  students: Student[];
  onAddStudent: (name: string, studentId: string, email: string) => void;
}

const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  onAddStudent,
}) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>学生列表</CardTitle>
          <CardDescription>管理课程中的学生</CardDescription>
        </div>
        <AddStudentForm onAdd={onAddStudent} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {students.map(student => (
          <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">{student.name}</div>
              <div className="text-sm text-muted-foreground">
               邮箱: {student.email}
              </div>
            </div>
            <Badge variant="secondary">已加入</Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default StudentManagement;