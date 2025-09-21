"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrueExamModule() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [keyword, setKeyword] = useState("");

  const [examSets, setExamSets] = useState<string[][]>([]);
  const [similarSet, setSimilarSet] = useState<string[]>([]);

  const handleSearch = () => {
    // 模拟生成 1~2 套占位真题
    const sets = [
      [
        `【真题 1】${subject || "某学科"} ${year || "某年份"} 基础题 ……`,
        `【真题 2】涉及 ${keyword || "某知识点"} 的考题 ……`,
      ],
      [
        `【真题 3】${subject || "学科"} ${year || "年份"} 进阶题 ……`,
        `【真题 4】与 ${keyword || "主题"} 相关的思考题 ……`,
      ],
    ];
    const count = Math.random() > 0.5 ? 2 : 1;
    setExamSets(sets.slice(0, count));

    // 相似题（右侧固定一套）
    setSimilarSet([
      `【AI 相似题 1】基于 ${subject || "学科"} 的变式题 ……`,
      `【AI 相似题 2】结合 ${keyword || "主题"} 的拓展题 ……`,
    ]);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 左侧：筛选 + 真题结果 */}
      <Card>
        <CardHeader>
          <CardTitle>真题筛选</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 筛选条件 */}
          <div className="space-y-4">
            <select
              className="border p-2 rounded w-full"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">选择学科</option>
              <option value="数学">数学</option>
              <option value="英语">英语</option>
            </select>

            <select
              className="border p-2 rounded w-full"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">选择年份</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>

            <Input
              placeholder="输入关键词"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <Button onClick={handleSearch} className="w-full">
              搜索真题
            </Button>
          </div>

          {/* 真题结果 */}
          <div className="space-y-4">
            {examSets.length === 0 ? (
              <p className="text-gray-400">暂无真题结果</p>
            ) : (
              examSets.map((set, i) => (
                <div key={i} className="border p-3 rounded">
                  <p className="font-bold mb-2">真题套卷 {i + 1}</p>
                  {set.map((q, j) => (
                    <p key={j} className="ml-2">
                      {q}
                    </p>
                  ))}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* 右侧：AI 相似题 */}
      <Card>
        <CardHeader>
          <CardTitle>AI 生成相似题</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {similarSet.length === 0 ? (
            <p className="text-gray-400">暂无生成题</p>
          ) : (
            similarSet.map((q, i) => (
              <p key={i} className="border p-2 rounded bg-gray-50">
                {q}
              </p>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
