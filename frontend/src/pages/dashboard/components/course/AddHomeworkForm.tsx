import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddHomeworkFormProps {
  onAdd: (title: string, description: string, deadline: string) => void;
}

const AddHomeworkForm: React.FC<AddHomeworkFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && deadline) {
      onAdd(title.trim(), description.trim(), deadline);
      setTitle("");
      setDescription("");
      setDeadline("");
      setIsOpen(false);
    }
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
    <Card className="w-80">
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

export default AddHomeworkForm;