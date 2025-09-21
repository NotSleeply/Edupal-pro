import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send, Eye } from "lucide-react";
import { Homework, QuestionDetail } from "./types";
import AddHomeworkForm from "./AddHomeworkForm";

interface HomeworkManagementProps {
  homeworks: Homework[];
  onAddHomework: (title: string, description: string, deadline: string, questions: QuestionDetail[]) => void;
  onPublishHomework?: (homeworkId: number) => void; // 新增发布功能
}

const HomeworkManagement: React.FC<HomeworkManagementProps> = ({
  homeworks,
  onAddHomework,
  onPublishHomework,
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
              
              {/* 操作按钮 */}
              <div className="flex items-center gap-2 ml-4">
                {homework.status === "draft" ? (
                  <Button
                    size="sm"
                    onClick={() => onPublishHomework?.(homework.id)}
                    className="flex items-center gap-1"
                  >
                    <Send className="h-4 w-4" />
                    发布
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    已发布
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default HomeworkManagement;