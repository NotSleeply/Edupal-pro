import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddStudentFormProps {
  onAdd: (name: string, studentId: string, email: string) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && studentId.trim() && email.trim()) {
      onAdd(name.trim(), studentId.trim(), email.trim());
      setName("");
      setStudentId("");
      setEmail("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        添加学生
      </Button>
    );
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-base">添加学生</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="学生姓名"
              required
            />
          </div>
          <div>
            <Label htmlFor="studentId">学号</Label>
            <Input
              id="studentId"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder="学生学号"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="学生邮箱"
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

export default AddStudentForm;