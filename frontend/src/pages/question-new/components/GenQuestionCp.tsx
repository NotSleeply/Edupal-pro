import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SelectInput from "@/components/ui/my-selectinput";
import QuestionTypeControl from "@/components/ui/my-questiontype";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/modules/stores";
import { setTraceSourceId } from "@/modules/question";
import { genQuestions } from "@/api/question";
import { mockQuestionBank } from "./data";
import { toast } from "sonner";


// 生成模拟问题的函数
const generateMockQuestions = (questionTypesArray: string[], options: typeof aiOptions) => {
  const mockQuestions = [];
  const subjectBank = mockQuestionBank[options.subject as keyof typeof mockQuestionBank] || mockQuestionBank.数学;
  
  questionTypesArray.forEach((type, index) => {
    const baseId = Date.now() + index;
    let mockQuestion;
    
    // 获取对应题型的题目库
    const typeKey = type === "选择题" ? "选择题" : 
                   type === "判断题" ? "判断题" : 
                   type === "计算题" ? "计算题" : "填空题";
    
    const questionPool = subjectBank[typeKey as keyof typeof subjectBank] || [];
    
    if (questionPool.length > 0) {
      // 随机选择一道题目
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      const selectedQuestion = questionPool[randomIndex];
      
      mockQuestion = {
        id: baseId,
        content: selectedQuestion.content,
        type: type,
        subject: options.subject,
        grade: options.grade,
        difficulty: Array.isArray(options.difficulty) ? options.difficulty[index] : options.difficulty,
        creator: "AI助手",
        options: selectedQuestion.options,
        answer: selectedQuestion.answer,
        explanation: selectedQuestion.explanation
      };
    } else {
      // 如果没有对应题型的题目，生成默认题目
      mockQuestion = {
        id: baseId,
        content: `关于${options.content}的${type}问题 ${index + 1}`,
        type: type,
        subject: options.subject,
        grade: options.grade,
        difficulty: Array.isArray(options.difficulty) ? options.difficulty[index] : options.difficulty,
        creator: "AI助手",
        options: type === "选择题" ? ["A. 选项一", "B. 选项二", "C. 选项三", "D. 选项四"] : 
                type === "判断题" ? ["正确", "错误"] : [],
        answer: type === "选择题" ? "A" : type === "判断题" ? "正确" : "示例答案",
        explanation: `这是关于${options.content}的详细解析...`
      };
    }
    
    mockQuestions.push(mockQuestion);
  });
  
  return mockQuestions;
};

export default function GenQuestion() {
  const dispatch = useAppDispatch();
  const reduxTrace = useAppSelector((state) => state.question.trace);

  const [aiOptions, setAiOptions] = useState({
    subject: "",
    content: "",
    grade: "",
    difficulty: "",
    questionTypes: {
      Choice: { enabled: false, count: 1 },
      trueFalse: { enabled: false, count: 1 },
      caclulation: { enabled: false, count: 1 },
      fillBlank: { enabled: false, count: 1 },
    },
  });

  const questionTypes = [
    { key: "Choice", label: "选择题", maxCount: 10 },
    { key: "trueFalse", label: "判断题", maxCount: 10 },
    { key: "caclulation", label: "计算题", maxCount: 10 },
    { key: "fillBlank", label: "填空题", maxCount: 10 },
  ];

  // 更新 AI 选项的值
  const handleAIOptionChange = (option: string, value: any) => {
    setAiOptions((prevState) => ({
      ...prevState,
      [option]: value,
    }));
  };

  // 切换问题类型的启用状态
  const handleQuestionTypeToggle = (type: string) => {
    setAiOptions((prevState) => ({
      ...prevState,
      questionTypes: {
        ...prevState.questionTypes,
        [type]: {
          ...prevState.questionTypes[
            type as keyof typeof aiOptions.questionTypes
          ],
          enabled:
            !prevState.questionTypes[
              type as keyof typeof aiOptions.questionTypes
            ].enabled,
        },
      },
    }));
  };

  // 更新问题类型数量
  const handleQuestionTypeCountChange = (type: string, count: string) => {
    setAiOptions((prevState) => ({
      ...prevState,
      questionTypes: {
        ...prevState.questionTypes,
        [type]: {
          ...prevState.questionTypes[
            type as keyof typeof aiOptions.questionTypes
          ],
          count: parseInt(count, 10),
        },
      },
    }));
  };

  // 修改后的生成问题逻辑
  const handleGenerate = async () => {
    if (
      aiOptions.subject === "" ||
      aiOptions.grade === "" ||
      aiOptions.content === "" ||
      aiOptions.difficulty === ""
    ) {
      toast.error("请选择学科、年级、难度和考察知识点！");
      return;
    }

    const questionTypesArray = Object.entries(aiOptions.questionTypes)
      .filter(([, { enabled }]) => enabled) // 过滤出启用的题型
      .flatMap(([key, { count }]) => {
        const label =
          questionTypes.find((type) => type.key === key)?.label || key;
        return Array(count).fill(label); // 根据count 数量填入题型
      });

    // 检查是否有启用的题型
    if (questionTypesArray.length === 0) {
      toast.error("请至少选择一种题型！");
      return;
    }

    try {
      // 创建与题型数组相同长度的其他参数数组
      const repeatArray = (length: number, value: any) =>
        new Array(length).fill(value);

      const params = {
        subjects: repeatArray(questionTypesArray.length, aiOptions.subject),
        knowledge_points: repeatArray(questionTypesArray.length, aiOptions.content),
        grades: repeatArray(questionTypesArray.length, aiOptions.grade),
        difficulties: repeatArray(questionTypesArray.length, aiOptions.difficulty),
        types: questionTypesArray,
      };

      if (aiOptions.difficulty === "混合") {
        const difficulties = ["简单", "中等", "困难"];
        const randomDifficulties = Array.from(
          { length: questionTypesArray.length },
          () => difficulties[Math.floor(Math.random() * difficulties.length)]
        );
        params.difficulties = randomDifficulties;
      }

      const res = await genQuestions({
        ...params,
        source_id: reduxTrace.sourceId,
      });

      if (res.source_id) {
        dispatch(setTraceSourceId(res.source_id));
        toast.success("生成任务创建成功！请稍后。");
      }
    } catch (error) {
      // 当后端 AI 生成失败时，生成模拟问题
      console.warn("AI 生成失败，使用模拟问题生成:", error);
      
      // 生成模拟问题数据
      const mockQuestions = generateMockQuestions(questionTypesArray, aiOptions);
      
      // 创建一个新的 source_id
      const newSourceId = `mock_${Date.now()}`;
      dispatch(setTraceSourceId(newSourceId));
      
      // 将模拟数据存储到 localStorage（模拟后端存储）
      const existingQuestions = JSON.parse(localStorage.getItem(`questions_${newSourceId}`) || '[]');
      localStorage.setItem(`questions_${newSourceId}`, JSON.stringify([...existingQuestions, ...mockQuestions]));
      
      toast.success(`已生成${mockQuestions.length}道模拟问题！`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>问题生成器</CardTitle>
        <CardDescription>配置 AI 根据您的要求生成问题</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 学科选择、年级选择、难度选择 */}
        <div className="grid grid-cols-3 gap-4">
          <SelectInput
            id="subject"
            label="学科"
            value={aiOptions.subject}
            options={[
              "数学",
              "科学",
              "历史",
              "地理",
              "文学",
              "物理",
              "化学",
              "生物",
              "政治",
            ]}
            onChange={(value) => handleAIOptionChange("subject", value)}
            placeholder="选择学科"
          />
          <SelectInput
            id="grade"
            label="题目水准"
            value={aiOptions.grade}
            options={[
              "一年级",
              "二年级",
              "三年级",
              "四年级",
              "五年级",
              "六年级",
              "初一",
              "初二",
              "初三",
              "高一",
              "高二",
              "高三",
              "大学",
              "研究生",
              "博士",
            ]}
            onChange={(value) => handleAIOptionChange("grade", value)}
            placeholder="选择年级"
          />
          <SelectInput
            id="difficulty"
            label="难度"
            value={aiOptions.difficulty}
            options={["简单", "中等", "困难", "混合"]}
            onChange={(value) => handleAIOptionChange("difficulty", value)}
            placeholder="选择难度"
          />
        </div>
        {/* 考察知识点 */}
        <div className="space-y-2">
          <Label htmlFor="content">考察知识点</Label>
          <Textarea
            id="content"
            placeholder="粘贴文本或描述您想要的问题内容"
            className="min-h-[100px]"
            value={aiOptions.content}
            onChange={(e) => handleAIOptionChange("content", e.target.value)}
          />
        </div>
        {/* 问题类型和数量 */}
        <div className="space-y-4">
          <Label>问题类型和数量</Label>
          <div className="space-y-3 border rounded-md p-4">
            {questionTypes.map(({ key, label, maxCount }) => (
              <QuestionTypeControl
                key={key}
                type={key as keyof typeof aiOptions.questionTypes}
                label={label}
                count={
                  aiOptions.questionTypes[
                    key as keyof typeof aiOptions.questionTypes
                  ].count
                }
                enabled={
                  aiOptions.questionTypes[
                    key as keyof typeof aiOptions.questionTypes
                  ].enabled
                }
                onToggle={handleQuestionTypeToggle}
                onCountChange={handleQuestionTypeCountChange}
                maxCount={maxCount}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleGenerate}>
          生成问题
        </Button>
      </CardFooter>
    </Card>
  );
}
