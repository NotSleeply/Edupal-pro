import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Homework } from "./types";
import AddHomeworkForm from "./AddHomeworkForm";

interface HomeworkManagementProps {
  homeworks: Homework[];
  onAddHomework: (title: string, description: string, deadline: string) => void;
}

const HomeworkManagement: React.FC<HomeworkManagementProps> = ({
  homeworks,
  onAddHomework,
}) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>作业列表</CardTitle>
          <CardDescription>管理课程作业</CardDescription>
        </div>
        <AddHomeworkForm onAdd={onAddHomework} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {homeworks.map(homework => (
          <div key={homework.id} className="p-4 border rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{homework.title}</h4>
                  <Badge variant={homework.status === "published" ? "default" : "secondary"}>
                    {homework.status === "published" ? "已发布" : "草稿"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{homework.description}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  截止时间: {homework.deadline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default HomeworkManagement;