"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus } from "lucide-react";

interface User {
  id: number;
  name: string;
  studentId: string;
  class: string;
  role: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "张三", studentId: "2023001", class: "高一(1)班", role: "学生" },
    { id: 2, name: "李四", studentId: "2023002", class: "高一(2)班", role: "学生" },
  ]);

  const [search, setSearch] = useState("");

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now(),
      name: "新用户",
      studentId: "2023xxx",
      class: "未分班",
      role: "学生",
    };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>教师端用户管理</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 搜索和新增 */}
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="search">搜索用户</Label>
            <Input
              id="search"
              placeholder="输入姓名或学号"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={handleAddUser}>
            <Plus className="w-4 h-4 mr-1" /> 新增用户
          </Button>
        </div>

        {/* 用户列表 */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>学号</TableHead>
              <TableHead>班级</TableHead>
              <TableHead>角色</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              .filter(
                (u) =>
                  u.name.includes(search) || u.studentId.includes(search)
              )
              .map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.studentId}</TableCell>
                  <TableCell>{u.class}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(u.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
