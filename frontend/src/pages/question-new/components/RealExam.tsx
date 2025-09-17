"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/my-selectinput";

export default function RealExam() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    // 假数据占位，后面你可以改成请求后端接口
    const fakeData = [
      "2022 年高考数学全国卷一 真题",
      "2021 年高考数学全国卷二 真题",
      "2020 年高考数学全国卷三 真题",
    ];

    const filtered = fakeData.filter((item) => {
      return (
        (subject ? item.includes(subject) : true) &&
        (year ? item.includes(year) : true) &&
        (keyword ? item.includes(keyword) : true)
      );
    });

    setResults(filtered);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>真题模拟</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 筛选条件 */}
        <div className="grid grid-cols-3 gap-4">
          <SelectInput
            id="subject"
            label="学科"
            value={subject}
            options={["数学", "语文", "英语", "物理", "化学", "生物", "历史", "地理", "政治"]}
            onChange={setSubject}
            placeholder="选择学科"
          />

          <SelectInput
            id="year"
            label="年份"
            value={year}
            options={[
              "2025", "2024", "2023", "2022", "2021",
              "2020", "2019", "2018", "2017", "2016"
            ]}
            onChange={setYear}
            placeholder="选择年份"
          />

          <div className="space-y-2">
            <Label htmlFor="keyword">关键字</Label>
            <Input
              id="keyword"
              placeholder="输入关键字"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* 搜索按钮 */}
        <Button className="w-full" onClick={handleSearch}>
          搜索真题
        </Button>

        {/* 搜索结果 */}
        <div className="space-y-2">
          <Label>搜索真题</Label>
          {results.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {results.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">暂无结果，请尝试调整筛选条件。</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
