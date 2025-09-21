import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { mockQuestionBank } from "../../../question-new/components/data";
import { QuestionDetail } from "./types";

interface AddHomeworkFormProps {
  onAdd: (title: string, description: string, deadline: string, questions: QuestionDetail[]) => void;
}

const AddHomeworkForm: React.FC<AddHomeworkFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [allQuestions, setAllQuestions] = useState<QuestionDetail[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());

  // 读取所有缓存题目（包括mockQuestionBank和localStorage）
  useEffect(() => {
    if (!isOpen) return;

    let questions: QuestionDetail[] = [];

    // 1. 从 mockQuestionBank 读取题目
    Object.entries(mockQuestionBank).forEach(([subject, subjectData]) => {
      Object.entries(subjectData).forEach(([type, questionList]) => {
        questionList.forEach((q, index) => {
          questions.push({
            id: `mock_${subject}_${type}_${index}`,
            content: q.content,
            type: type,
            subject: subject,
            difficulty: "中等", // 默认难度
            grade: "通用", // 默认年级
            options: q.options || [],
            answer: q.answer,
            explanation: q.explanation
          });
        });
      });
    });

    // 2. 从 localStorage 读取 AI 生成的题目
    const allMockKeys = Object.keys(localStorage).filter(key => key.startsWith("questions_mock_"));
    allMockKeys.forEach(key => {
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      const mappedArr = arr.map((item: any, idx: number) => ({
        id: `${key}_${idx}`,
        content: item.content || item.question || "",
        type: item.type || "未知",
        subject: item.subject || "未知",
        difficulty: item.difficulty || "未知",
        grade: item.grade || "未知",
        options: item.options || [],
        answer: item.answer || "",
        explanation: item.explanation || ""
      }));
      questions = questions.concat(mappedArr);
    });

    setAllQuestions(questions);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && deadline) {
      const selectedQuestions = allQuestions.filter(q => selectedQuestionIds.has(q.id.toString()));
      onAdd(title.trim(), description.trim(), deadline, selectedQuestions);
      setTitle("");
      setDescription("");
      setDeadline("");
      setSelectedQuestionIds(new Set());
      setIsOpen(false);
    }
  };

  const toggleQuestion = (questionId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // 阻止事件冒泡
    }
    
    const newSelected = new Set(selectedQuestionIds);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestionIds(newSelected);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        添加作业
      </Button>
    );
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-base">添加作业</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="hw-title">作业标题</Label>
            <Input
              id="hw-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="请输入作业标题"
              required
            />
          </div>
          <div>
            <Label htmlFor="hw-description">作业描述</Label>
            <Textarea
              id="hw-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="请输入作业描述和要求"
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="hw-deadline">截止时间</Label>
            <Input
              id="hw-deadline"
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label>选择题目 (已选择 {selectedQuestionIds.size} 道)</Label>
            <div className="max-h-60 overflow-y-auto border rounded-lg p-3 space-y-2">
              {allQuestions.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-4">
                  暂无可选题目
                </div>
              )}
              {allQuestions.map(q => (
                <div 
                  key={q.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedQuestionIds.has(q.id.toString()) 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleQuestion(q.id.toString())}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedQuestionIds.has(q.id.toString())}
                      onChange={(checked) => {
                        const newSelected = new Set(selectedQuestionIds);
                        if (checked) {
                          newSelected.add(q.id.toString());
                        } else {
                          newSelected.delete(q.id.toString());
                        }
                        setSelectedQuestionIds(newSelected);
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {q.type}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {q.subject}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {q.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{q.content}</p>
                      {q.options && q.options.length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          选项: {q.options.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" size="sm">
              确认 ({selectedQuestionIds.size} 道题目)
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddHomeworkForm;