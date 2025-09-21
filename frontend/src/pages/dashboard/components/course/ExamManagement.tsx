import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Exam } from "./types";
import AddExamForm from "./AddExamForm";

interface ExamManagementProps {
  exams: Exam[];
  onAddExam: (title: string, description: string, date: string, duration: number) => void;
}

const ExamManagement: React.FC<ExamManagementProps> = ({
  exams,
  onAddExam,
}) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>考试列表</CardTitle>
          <CardDescription>管理课程考试</CardDescription>
        </div>
        <AddExamForm onAdd={onAddExam} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {exams.map(exam => (
          <div key={exam.id} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{exam.title}</h4>
                  <Badge variant={exam.status === "published" ? "default" : "secondary"}>
                    {exam.status === "published" ? "已发布" : "草稿"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{exam.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                  <span>考试时间: {exam.date}</span>
                  <span>时长: {exam.duration} 分钟</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ExamManagement;