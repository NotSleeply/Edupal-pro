import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type Question = {
  id: number;
  question: string;
  options?: string[];
  answer: string;
  type: string;
};
const questionBank: Record<string, Question[]> = {
  语文: [
    {
      id: 1,
      question: "《红楼梦》是谁写的？",
      options: ["曹雪芹", "鲁迅", "老舍", "巴金"],
      answer: "曹雪芹",
      type: "选择题"
    },
    {
      id: 2,
      question: "‘白雪歌送武判官归京’出自哪位诗人的作品？",
      options: ["杜甫", "李白", "王之涣", "岑参"],
      answer: "岑参",
      type: "选择题"
    },
    {
      id: 3,
      question: "‘白日依山尽，黄河入海流’出自哪位诗人的作品？",
      answer: "王之涣",
      type: "填空题"
    },
    {
      id: 4,
      question: "《西游记》是否由明代作家吴承恩创作？",
      options: ["是", "不是"],
      answer: "是",
      type: "判断题"
    },
    {
      id: 5,
      question: "请用一句话概括《红楼梦》的主题。",
      answer: "贾宝玉与林黛玉的爱情故事",
      type: "填空题"
    },
    {
      id: 6,
      question: "请给出‘桃花潭水深千尺，不及汪伦送我情’的作者。",
      options: ["杜甫", "李白", "王之涣", "岑参"],
      answer: "李白",
      type: "选择题"
    },
  ],
  数学: [
    {
      id: 1,
      question: "2 + 3 = ?",
      options: ["3", "5", "6", "7"],
      answer: "5",
      type: "选择题"
    },
    {
      id: 2,
      question: "1 + 1 = 2， 1 + 1 = 2，是不是正确的？",
      options: ["是", "不是"],
      answer: "是",
      type: "判断题"
    },
    {
      id: 3,
      question: "请计算：5 × 6 = ?",
      answer: "30",
      type: "计算题"
    },
    {
      id: 4,
      question: "5 - 2 = ?",
      options: ["2", "3", "4", "5"],
      answer: "3",
      type: "选择题"
    },
    {
      id: 5,
      question: "10 ÷ 2 = ?",
      options: ["3", "5", "6", "7"],
      answer: "5",
      type: "选择题"
    },
    {
      id: 6,
      question: "2 × 3 × 4 = ?",
      answer: "24",
      type: "计算题"
    },
  ],
  英语: [
    {
      id: 1,
      question: "‘hello’ 的中文意思是？",
      options: ["你好", "再见", "早上好", "谢谢"],
      answer: "你好",
      type: "选择题"
    },
    {
      id: 2,
      question: "‘It’s raining’ 意思是？",
      options: ["下雨了", "下雪了", "天晴了", "刮风了"],
      answer: "下雨了",
      type: "判断题"
    },
    {
      id: 3,
      question: "‘apple’ 的中文意思是？",
      answer: "苹果",
      type: "填空题"
    },
    {
      id: 4,
      question: "‘How are you?’ 是什么意思？",
      options: ["你好吗?", "你叫什么?", "你是做什么的?", "你几岁了?"],
      answer: "你好吗?",
      type: "选择题"
    },
    {
      id: 5,
      question: "‘She is a teacher’ 是不是对的？",
      options: ["是", "不是"],
      answer: "是",
      type: "判断题"
    },
    {
      id: 6,
      question: "‘I like to play basketball’ 请翻译成中文。",
      answer: "我喜欢打篮球",
      type: "填空题"
    },
  ],
  物理: [
    {
      id: 1,
      question: "光的速度是多少？",
      options: ["3.0 × 10^8 m/s", "2.5 × 10^8 m/s", "3.5 × 10^8 m/s", "4.0 × 10^8 m/s"],
      answer: "3.0 × 10^8 m/s",
      type: "选择题"
    },
    {
      id: 2,
      question: "电流的单位是？",
      options: ["安培", "伏特", "欧姆", "焦耳"],
      answer: "安培",
      type: "选择题"
    },
    {
      id: 3,
      question: "下列哪个是电磁波？",
      options: ["光波", "水波", "声波", "引力波"],
      answer: "光波",
      type: "选择题"
    },
    {
      id: 4,
      question: "质点的运动是否总是沿着直线进行？",
      options: ["是", "不是"],
      answer: "不是",
      type: "判断题"
    },
    {
      id: 5,
      question: "声音在空气中的传播速度约为多少米每秒？",
      answer: "340",
      type: "计算题"
    },
    {
      id: 6,
      question: "请计算：1000克水加热1摄氏度需要多少卡路里？",
      answer: "1000",
      type: "计算题"
    },
  ],
  化学: [
    {
      id: 1,
      question: "水的化学式是？",
      options: ["H2O", "CO2", "O2", "H2"],
      answer: "H2O",
      type: "选择题"
    },
    {
      id: 2,
      question: "盐酸是强酸吗？",
      options: ["是", "不是"],
      answer: "是",
      type: "判断题"
    },
    {
      id: 3,
      question: "‘H2SO4’ 是哪种化学物质？",
      answer: "硫酸",
      type: "填空题"
    },
    {
      id: 4,
      question: "氢气的分子式是什么？",
      options: ["H2", "O2", "CO2", "N2"],
      answer: "H2",
      type: "选择题"
    },
    {
      id: 5,
      question: "二氧化碳是氧化物吗？",
      options: ["是", "不是"],
      answer: "是",
      type: "判断题"
    },
    {
      id: 6,
      question: "请计算：氢气的分子质量是多少？",
      answer: "2",
      type: "计算题"
    },
  ],
  生物: [
    {
      id: 1,
      question: "DNA 是由哪几部分组成的？",
      options: ["adenine, thymine, guanine, cytosine", "adenine, thymine, uracil, guanine", "adenine, cytosine, guanine, thymine", "adenine, thymine, uracil, cytosine"],
      answer: "adenine, thymine, guanine, cytosine",
      type: "选择题"
    },
    {
      id: 2,
      question: "DNA 的 strand 是什么？",
      options: ["DNA strand", "RNA strand", "protein strand", "adenine strand"],
      answer: "DNA strand",
      type: "选择题"
    },
    {
      id: 3,
      question: "人体内最常见的细胞类型是哪种？",
      answer: "红细胞",
      type: "填空题"
    },
    {
      id: 4,
      question: "‘自然选择’理论是谁提出的？",
      options: ["达尔文", "孟德尔", "沃森", "海克尔"],
      answer: "达尔文",
      type: "选择题"
    },
    {
      id: 5,
      question: "基因突变是指什么？",
      options: ["基因结构或序列的变化", "基因的复制", "基因的修复", "基因的继承"],
      answer: "基因结构或序列的变化",
      type: "选择题"
    },
    {
      id: 6,
      question: "人体的最大免疫器官是哪个？",
      answer: "脾脏",
      type: "填空题"
    },
  ],
  历史: [
    {
      id: 1,
      question: "《史记》是由谁编写的？",
      options: ["班固", "司马迁", "赵鼎", "李时中"],
      answer: "司马迁",
      type: "选择题"
    },
    {
      id: 2,
      question: "古埃及的法老金字塔位于哪个城市附近？",
      options: ["开罗", "卢克索", "孟菲斯", "亚历山大"],
      answer: "开罗",
      type: "选择题"
    },
    {
      id: 3,
      question: "明朝的‘靖难之役’是哪位皇帝发动的？",
      options: ["洪武帝", "明成祖", "建文帝", "崇祯帝"],
      answer: "明成祖",
      type: "选择题"
    },
    {
      id: 3,
      question: "中国历史上第一个统一的王朝是？",
      answer: "秦朝",
      type: "填空题"
    },
    {
      id: 4,
      question: "《大明一统志》是关于哪个朝代的地理志？",
      options: ["唐朝", "宋朝", "明朝", "清朝"],
      answer: "明朝",
      type: "选择题"
    },
    {
      id: 5,
      question: "‘马车的发明’最早出现在哪个文明中？",
      options: ["古埃及文明", "古巴比伦文明", "古印度文明", "古希腊文明"],
      answer: "古巴比伦文明",
      type: "选择题"
    },
    {
      id: 6,
      question: "‘文艺复兴’起源于哪个国家？",
      options: ["法国", "意大利", "德国", "英国"],
      answer: "意大利",
      type: "选择题"
    },
  ],
  政治:[
    {
        id: 1,
        question: "中华人民共和国的国旗是什么颜色的？",
        options: ["红色", "蓝色", "黄色", "绿色"],
        answer: "红色",
        type: "选择题"
    },
    {
        id: 2,
        question: "《中华人民共和国宪法》颁布的年份是？",
        options: ["1949年", "1954年", "1978年", "1982年"],
        answer: "1982年",
        type: "选择题"
    },
    {
        id: 3,
        question: "中国的‘四个现代化’指的是哪四个方面？",
        answer: "农业、工业、国防、科技",
        type: "填空题"
    },
    {
        id: 4,
        question: "美国的最高法院是由多少名法官组成的？",
        options: ["5名", "7名", "9名", "11名"],
        answer: "9名",
        type: "选择题"
    },
    {
        id: 5,
        question: "联合国的创始成员国有多少个？",
        options: ["33个", "50个", "51个", "70个"],
        answer: "51个",
        type: "选择题"
    },
    {
        id: 6,
        question: "‘人民代表大会制度’是中国的基本政治制度吗？",
        options: ["是", "不是"],
        answer: "是",
        type: "判断题"
    },
],
地理:[
    {
        id: 1,
        question: "世界上最大的沙漠是哪个？",
        options: ["撒哈拉沙漠", "戈壁沙漠", "阿拉伯沙漠", "南极沙漠"],
        answer: "撒哈拉沙漠",
        type: "选择题"
    },
    {
        id: 2,
        question: "中国最长的河流是哪一条？",
        options: ["长江", "黄河", "黑龙江", "珠江"],
        answer: "长江",
        type: "选择题"
    },
    {
        id: 3,
        question: "地球上最深的海洋是什么？",
        answer: "太平洋",
        type: "填空题"
    },
    {
        id: 4,
        question: "美国的首都是哪座城市？",
        options: ["纽约", "洛杉矶", "华盛顿D.C.", "芝加哥"],
        answer: "华盛顿D.C.",
        type: "选择题"
    },
    {
        id: 5,
        question: "‘珠穆朗玛峰’位于哪个山脉？",
        options: ["喜马拉雅山脉", "阿尔卑斯山脉", "安第斯山脉", "落基山脉"],
        answer: "喜马拉雅山脉",
        type: "选择题"
    },
    {
        id: 6,
        question: "世界上最大的湖泊是哪一个？",
        options: ["里海", "苏必利尔湖", "死海", "维多利亚湖"],
        answer: "里海",
        type: "选择题"
    },
],
科学:[
    {
        id: 1,
        question: "水的沸点是多少摄氏度？",
        options: ["90°C", "100°C", "110°C", "120°C"],
        answer: "100°C",
        type: "选择题"
    },
    {
        id: 2,
        question: "光的传播速度在真空中是？",
        options: ["3 × 10^6 m/s", "3 × 10^8 m/s", "2 × 10^8 m/s", "2 × 10^6 m/s"],
        answer: "3 × 10^8 m/s",
        type: "选择题"
    },
    {
        id: 3,
        question: "水的化学式是什么？",
        answer: "H2O",
        type: "填空题"
    },
    {
        id: 4,
        question: "地球表面大约有多少%的面积是被水覆盖的？",
        options: ["60%", "70%", "80%", "90%"],
        answer: "70%",
        type: "选择题"
    },
    {
        id: 5,
        question: "植物的光合作用主要发生在哪个细胞器中？",
        options: ["线粒体", "叶绿体", "细胞核", "内质网"],
        answer: "叶绿体",
        type: "选择题"
    },
    {
        id: 6,
        question: "常见的化学元素‘氧’的化学符号是什么？",
        answer: "O",
        type: "填空题"
    }
]
};

const StudentDashboard: React.FC = () => {
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [subject, setSubject] = useState("语文");
  const [questions, setQuestions] = useState<Question[]>(questionBank[subject]);
  const navigate = useNavigate();

  // 当选择不同学科时重置状态
  useEffect(() => {
    setQuestions(questionBank[subject]);
    setSelectedAnswers({});
    setScore(0);
    setSubmitted(false);
  }, [subject]);

  // 处理选择题和判断题的选项点击
  const handleOptionClick = (questionId: number, option: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  // 处理填空题和计算题的输入变化
  const handleInputChange = (questionId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: e.target.value
    }));
  };

  // 提交答案并计算得分
  const handleSubmit = () => {
    const newScore = questions.reduce((acc, question) => {
      return selectedAnswers[question.id] === question.answer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
    setSubmitted(true);
  };

  // 重置答题
  const handleReset = () => {
    setSelectedAnswers({});
    setScore(0);
    setSubmitted(false);
  };

  return (
    <div className="student-dashboard">
      {/* 左上角的学科选择框 */}
      <div className="subject-selection">
        <h2>选择学科</h2>
        <select 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          className="subject-select px-4 py-2 border border-black rounded bg-white text-black"
        >
          <option value="语文">语文</option>
          <option value="数学">数学</option>
          <option value="英语">英语</option>
          <option value="物理">物理</option>
          <option value="化学">化学</option>
          <option value="生物">生物</option>
          <option value="地理">地理</option>
          <option value="历史">历史</option>
          <option value="政治">政治</option>
          <option value="科学">科学</option>
        </select>
      </div>

      <div className="fullscreen-questions">
        {!submitted ? (
          <>
            <h2>{subject} - 答题区</h2>
            {/* 垂直滚动的答题区 */}
            <div className="questions-container">
              {questions.map((question, index) => (
                <div key={question.id} className="question-card">
                  <h3>题目 {index + 1}：{question.question}</h3>
                  
                  {question.type === "选择题" && (
                    <div className="options">
                      {question.options?.map(option => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(question.id, option)}
                          disabled={submitted}
                          className={`option-btn ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {question.type === "判断题" && (
                    <div className="options">
                      {["是", "不是"].map(option => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(question.id, option)}
                          disabled={submitted}
                          className={`option-btn ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {(question.type === "填空题" || question.type === "计算题") && (
                    <input
                      type="text"
                      value={selectedAnswers[question.id] || ""}
                      onChange={(e) => handleInputChange(question.id, e)}
                      disabled={submitted}
                      placeholder="请输入答案..."
                      className="answer-input"
                    />
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleSubmit} 
              className="submit-btn px-6 py-3 text-white rounded-lg"
            >
              提交答案
            </button>
          </>
        ) : (
          <div className="results-section">
            <h2>答题结束！</h2>
            <div className="score-display">
              你的得分：{score} / {questions.length}
            </div>
            
            <div className="answer-review">
              <h3>答题回顾</h3>
              {questions.map((question, index) => (
                <div key={question.id} className="review-item">
                  <p><strong>题目 {index + 1}：</strong>{question.question}</p>
                  <p>
                    <strong>你的答案：</strong>
                    {selectedAnswers[question.id] || "未作答"}
                    {selectedAnswers[question.id] === question.answer ? (
                      <span className="correct-mark"> ✔️ 正确</span>
                    ) : selectedAnswers[question.id] ? (
                      <span className="incorrect-mark"> ❌ 错误</span>
                    ) : null}
                  </p>
                  <p><strong>正确答案：</strong>{question.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="action-buttons">
              <button 
                onClick={handleReset} 
                className="reset-btn px-6 py-3 text-white rounded-lg mr-4"
              >
                重新答题
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="home-btn px-6 py-3 text-white rounded-lg"
              >
                返回首页
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .student-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
        }
        
        /* 左上角的学科选择框 */
        .subject-selection {
          margin-bottom: 30px;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .subject-selection h2 {
          margin: 0;
        }
        
        .subject-select {
          font-size: 16px;
          border: 1px solid #333;
        }
        
        .fullscreen-questions {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
        }
        
        /* 垂直滚动的答题区 */
        .questions-container {
          margin-bottom: 30px;
        }
        
        /* 单个题目卡片 */
        .question-card {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 25px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }
        
        /* 选项按钮 - 黑白风格 */
        .option-btn {
          padding: 10px;
          border: 1px solid #999;
          border-radius: 4px;
          background-color: white;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }
        
        /* 选中状态 - 黑白风格 */
        .option-btn.selected {
          background-color: #e0e0e0;
          border-color: #666;
          font-weight: bold;
        }
        
        .option-btn:hover:not(:disabled) {
          background-color: #f0f0f0;
        }
        
        .answer-input {
          margin-top: 15px;
          padding: 10px;
          width: 100%;
          border: 1px solid #999;
          border-radius: 4px;
        }
        

        .submit-btn {
          margin-top: 20px;
          font-size: 16px;
          cursor: pointer;
          background-color: #333;
          transition: background-color 0.2s;
        }
        
        .submit-btn:hover {
          background-color: #555;
        }
        
        .results-section {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .score-display {
          font-size: 24px;
          margin: 20px 0;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 8px;
          color: #333;
        }
        
        .answer-review {
          margin-top: 30px;
          text-align: left;
        }
        
        .review-item {
          background-color: white;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .correct-mark {
          color: #333;
          font-weight: bold;
        }
        
        .incorrect-mark {
          color: #333;
          font-weight: bold;
        }
        
        .action-buttons {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        
        /* 重新答题按钮 - 黑白风格 */
        .reset-btn {
          cursor: pointer;
          font-size: 16px;
          background-color: #666;
          transition: background-color 0.2s;
        }
        
        .reset-btn:hover {
          background-color: #888;
        }
        
        /* 返回首页按钮 - 黑白风格 */
        .home-btn {
          cursor: pointer;
          font-size: 16px;
          background-color: #999;
          transition: background-color 0.2s;
        }
        
        .home-btn:hover {
          background-color: #bbb;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;