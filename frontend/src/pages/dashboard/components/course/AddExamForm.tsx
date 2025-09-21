import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddExamFormProps {
  onAdd: (title: string, description: string, date: string, duration: number) => void;
}

const AddExamForm: React.FC<AddExamFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && date && duration) {
      const durationNumber = parseInt(duration);
      if (durationNumber > 0) {
        onAdd(title.trim(), description.trim(), date, durationNumber);
        setTitle("");
        setDescription("");
        setDate("");
        setDuration("");
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        添加考试
      </Button>
    );
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-base">添加考试</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="exam-title">考试标题</Label>
            <Input
              id="exam-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="请输入考试标题"
              required
            />
          </div>
          <div>
            <Label htmlFor="exam-description">考试描述</Label>
            <Textarea
              id="exam-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="请输入考试范围和要求"
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="exam-date">考试时间</Label>
            <Input
              id="exam-date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="exam-duration">考试时长 (分钟)</Label>
            <Input
              id="exam-duration"
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="120"
              min="1"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">确认</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddExamForm;