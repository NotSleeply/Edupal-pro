import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 题目数据结构（从主题库中复用格式）
const questionBank = {
  语文: [
    { id: 1, question: "《红楼梦》的作者是谁？", options: ["曹雪芹", "罗贯中", "吴承恩", "施耐庵"], answer: "曹雪芹", type: "选择题" },
    { id: 2, question: "下列哪个不是唐代诗人？", options: ["李白", "杜甫", "苏轼", "王维"], answer: "苏轼", type: "选择题" },
    { id: 3, question: "'床前明月光'的下一句是？", answer: "疑是地上霜", type: "填空题" },
    { id: 4, question: "'但愿人长久'出自苏轼的《水调歌头》？", options: ["是", "不是"], answer: "是", type: "判断题" },
    { id: 5, question: "《静夜思》的作者是？", options: ["李白", "杜甫", "白居易", "王维"], answer: "李白", type: "选择题" },
  ],
  数学: [
    { id: 1, question: "2+3×4=？", options: ["14", "20", "10", "18"], answer: "14", type: "选择题" },
    { id: 2, question: "三角形内角和是多少度？", options: ["90°", "180°", "270°", "360°"], answer: "180°", type: "选择题" },
    { id: 3, question: "15的平方是多少？", answer: "225", type: "计算题" },
    { id: 4, question: "0是自然数？", options: ["是", "不是"], answer: "是", type: "判断题" },
    { id: 5, question: "方程x²-4=0的解是？", options: ["2", "-2", "±2", "4"], answer: "±2", type: "选择题" },
  ],
  英语: [
    { id: 1, question: "'Hello'的中文意思是？", options: ["你好", "再见", "谢谢", "对不起"], answer: "你好", type: "选择题" },
    { id: 2, question: "What is the past tense of 'go'?", options: ["go", "went", "gone", "going"], answer: "went", type: "选择题" },
    { id: 3, question: "'苹果'的英文单词是？", answer: "apple", type: "填空题" },
    { id: 4, question: "'He are a student.'这句话是正确的？", options: ["是", "不是"], answer: "不是", type: "判断题" },
    { id: 5, question: "How many letters are there in 'English'?", options: ["6", "7", "8", "9"], answer: "7", type: "选择题" },
  ],
  物理: [
    { id: 1, question: "力的单位是？", options: ["牛顿", "千克", "米", "秒"], answer: "牛顿", type: "选择题" },
    { id: 2, question: "光在真空中的传播速度约为？", options: ["3×10^5 km/s", "3×10^5 m/s", "3×10^8 km/s", "3×10^6 km/s"], answer: "3×10^5 km/s", type: "选择题" },
    { id: 3, question: "1标准大气压约为多少帕斯卡？", answer: "101325", type: "计算题" },
    { id: 4, question: "摩擦力总是阻碍物体运动？", options: ["是", "不是"], answer: "不是", type: "判断题" },
    { id: 5, question: "下列哪个是导体？", options: ["塑料", "橡胶", "铜", "玻璃"], answer: "铜", type: "选择题" },
  ],
  化学: [
    { id: 1, question: "水的化学式是？", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O", type: "选择题" },
    { id: 2, question: "下列哪种气体是可燃的？", options: ["氧气", "氢气", "二氧化碳", "氮气"], answer: "氢气", type: "选择题" },
    { id: 3, question: "元素周期表中，原子序数为1的元素是？", answer: "氢", type: "填空题" },
    { id: 4, question: "铁在空气中会生锈是化学变化？", options: ["是", "不是"], answer: "是", type: "判断题" },
    { id: 5, question: "pH值为7的溶液呈？", options: ["酸性", "碱性", "中性", "无法判断"], answer: "中性", type: "选择题" },
  ],
  生物: [
    { id: 1, question: "人体最大的器官是？", options: ["心脏", "皮肤", "肝脏", "大脑"], answer: "皮肤", type: "选择题" },
    { id: 2, question: "光合作用的场所是？", options: ["线粒体", "叶绿体", "细胞核", "细胞质"], answer: "叶绿体", type: "选择题" },
    { id: 3, question: "DNA的中文名称是？", answer: "脱氧核糖核酸", type: "填空题" },
    { id: 4, question: "病毒属于生物？", options: ["是", "不是"], answer: "是", type: "判断题" },
    { id: 5, question: "下列哪个是哺乳动物？", options: ["鸡", "蛇", "狗", "青蛙"], answer: "狗", type: "选择题" },
  ],
  历史: [
    { id: 1, question: "鸦片战争发生在哪个世纪？", options: ["17世纪", "18世纪", "19世纪", "20世纪"], answer: "19世纪", type: "选择题" },
    { id: 2, question: "秦始皇统一中国后使用的文字是？", options: ["甲骨文", "金文", "小篆", "隶书"], answer: "小篆", type: "选择题" },
    { id: 3, question: "二战全面爆发的标志是德国入侵哪个国家？", answer: "波兰", type: "填空题" },
    { id: 4, question: "唐朝的开国皇帝是李世民？", options: ["是", "不是"], answer: "不是", type: "判断题" },
    { id: 5, question: "哥伦布发现新大陆是在哪个年份？", options: ["1492年", "1588年", "1640年", "1776年"], answer: "1492年", type: "选择题" },
  ],
  政治: [
    { id: 1, question: "中华人民共和国成立于哪一年？", options: ["1945年", "1949年", "1956年", "1978年"], answer: "1949年", type: "选择题" },
    { id: 2, question: "我国的根本政治制度是？", options: ["人民代表大会制度", "政治协商制度", "民族区域自治制度", "基层群众自治制度"], answer: "人民代表大会制度", type: "选择题" },
    { id: 3, question: "社会主义核心价值观中，国家层面的价值目标是富强、民主、文明和？", answer: "和谐", type: "填空题" },
    { id: 4, question: "法律是由国家制定或认可的？", options: ["是", "不是"], answer: "是", type: "判断题" },
    { id: 5, question: "我国的最高国家权力机关是？", options: ["国务院", "最高法院", "全国人大", "政协"], answer: "全国人大", type: "选择题" },
  ],
  地理: [
    { id: 1, question: "世界上最大的洲是？", options: ["亚洲", "非洲", "欧洲", "北美洲"], answer: "亚洲", type: "选择题" },
    { id: 2, question: "下列哪个是我国的内海？", options: ["黄海", "渤海", "东海", "南海"], answer: "渤海", type: "选择题" },
    { id: 3, question: "世界上最高的山峰是？", answer: "珠穆朗玛峰", type: "填空题" },
    { id: 4, question: "赤道是南北半球的分界线？", options: ["是", "不是"], answer: "是", type: "判断题" },
    { id: 5, question: "下列哪个国家是岛国？", options: ["中国", "法国", "日本", "德国"], answer: "日本", type: "选择题" },
  ],
  科学: [
    { id: 1, question: "地球围绕太阳公转一周的时间大约是？", options: ["一天", "一个月", "一年", "一小时"], answer: "一年", type: "选择题" },
    { id: 2, question: "下列哪种属于可再生能源？", options: ["煤炭", "石油", "太阳能", "天然气"], answer: "太阳能", type: "选择题" },
    { id: 3, question: "声音在空气中的传播速度约为每秒多少米？", answer: "340", type: "计算题" },
    { id: 4, question: "所有的金属都是固体？", options: ["是", "不是"], answer: "不是", type: "判断题" },
    { id: 5, question: "下列哪个是太阳系中的行星？", options: ["月球", "太阳", "金星", "冥王星"], answer: "金星", type: "选择题" },
  ]
};

// 模拟对手数据
const opponentData = {
  name: "匿名挑战者",
  avatar: "https://picsum.photos/id/64/100/100",
  score: 0
};

const PkPage: React.FC = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("语文");
  const [questions, setQuestions] = useState(questionBank[subject]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(15);
  const [isPkStarted, setIsPkStarted] = useState(false);
  const [isPkFinished, setIsPkFinished] = useState(false);

  // 当科目改变时重置题库
  useEffect(() => {
    setQuestions(questionBank[subject]);
    resetPK();
  }, [subject]);

  // 倒计时逻辑
  useEffect(() => {
    if (!isPkStarted || isPkFinished || isAnswered) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // 时间到未答题，自动判错
          handleTimeOut();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPkStarted, isPkFinished, isAnswered]);

  // 重置PK状态
  const resetPK = () => {
    setCurrentQuestion(0);
    setUserScore(0);
    setOpponentScore(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setTimer(15);
    setIsPkFinished(false);
  };

  // 开始PK
  const startPK = () => {
    setIsPkStarted(true);
    resetPK();
  };

  // 处理超时未答题
  const handleTimeOut = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    // 模拟对手答题，有70%概率正确
    simulateOpponentAnswer();
  };

  // 处理选项点击
  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    
    setUserAnswer(option);
    setIsAnswered(true);
    
    const isCorrectAnswer = option === questions[currentQuestion].answer;
    setIsCorrect(isCorrectAnswer);
    
    if (isCorrectAnswer) {
      setUserScore(prev => prev + 10);
    }
    
    // 模拟对手答题
    simulateOpponentAnswer();
  };

  // 处理填空题输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // 提交填空答案
  const handleSubmitAnswer = () => {
    if (!userAnswer || isAnswered) return;
    
    setIsAnswered(true);
    const isCorrectAnswer = userAnswer === questions[currentQuestion].answer;
    setIsCorrect(isCorrectAnswer);
    
    if (isCorrectAnswer) {
      setUserScore(prev => prev + 10);
    }
    
    // 模拟对手答题
    simulateOpponentAnswer();
  };

  // 模拟对手答题
  const simulateOpponentAnswer = () => {
    // 模拟对手思考时间
    setTimeout(() => {
      // 对手有70%概率答对
      const opponentCorrect = Math.random() > 0.3;
      if (opponentCorrect) {
        setOpponentScore(prev => prev + 10);
      }
    }, 1000);
  };

  // 下一题
  const handleNextQuestion = () => {
    if (currentQuestion >= 4) {
      // 最后一题完成，结束PK
      setIsPkFinished(true);
      return;
    }
    
    setCurrentQuestion(prev => prev + 1);
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setTimer(15);
  };

  // 渲染题目内容
  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    if (question.type === "选择题" || question.type === "判断题") {
      return (
        <div className="grid gap-3 mt-6">
          {question.options?.map((option) => (
            <button
              key={option}
              className={`px-6 py-3 rounded-lg text-left transition-all duration-200 ${
                isAnswered 
                  ? option === question.answer 
                    ? "bg-green-100 border-green-500 text-green-800 border" 
                    : userAnswer === option 
                      ? "bg-red-100 border-red-500 text-red-800 border"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  : "bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              }`}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
    
    if (question.type === "填空题" || question.type === "计算题") {
      return (
        <div className="mt-6">
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userAnswer || ''}
            onChange={handleInputChange}
            placeholder="请输入答案"
            disabled={isAnswered}
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            onClick={handleSubmitAnswer}
            disabled={!userAnswer || isAnswered}
          >
            提交答案
          </button>
        </div>
      );
    }
    
    return null;
  };

  // 渲染答题结果
  const renderAnswerResult = () => {
    if (!isAnswered) return null;
    
    return (
      <div className="mt-4 p-4 rounded-lg mb-6">
        <div className={`text-center font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? '回答正确！+10分' : `回答错误！正确答案是：${questions[currentQuestion].answer}`}
        </div>
        <div className="text-center text-gray-600 mt-2">
          对手得分: {opponentScore - (isPkFinished ? 0 : 10)} → {opponentScore}
        </div>
        <button
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleNextQuestion}
        >
          {currentQuestion >= 4 ? '查看结果' : '下一题'}
        </button>
      </div>
    );
  };

  // 渲染PK结果
  const renderPKResult = () => {
    const isWinner = userScore > opponentScore;
    
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {isWinner ? '恭喜你获胜！' : userScore === opponentScore ? '平局！' : '很遗憾，你输了！'}
        </h2>
        
        <div className="flex justify-center items-center gap-8 mb-6">
          <div>
            <p className="text-gray-600">你的得分</p>
            <p className="text-3xl font-bold text-blue-500">{userScore}</p>
          </div>
          <div className="text-2xl font-bold">VS</div>
          <div>
            <p className="text-gray-600">对手得分</p>
            <p className="text-3xl font-bold text-red-500">{opponentScore}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={startPK}
          >
            再来一局
          </button>
          <button
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => navigate('/student-dashboard')}
          >
            返回主页
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 背景图 */}
      <img
        src="https://api.kdcc.cn"
        alt="背景图片"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />

      {/* 顶部导航 */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm py-4 px-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/student-dashboard')}
          className="text-gray-700 hover:text-blue-500 transition-colors"
        >
          ← 返回
        </button>
        <h1 className="text-xl font-bold text-gray-800">知识PK对战</h1>
        <div className="w-6"></div> {/* 占位元素，保持标题居中 */}
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        {!isPkStarted ? (
          // 开始PK界面
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">准备开始PK</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">选择科目</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="语文">语文</option>
                <option value="数学">数学</option>
                <option value="英语">英语</option>
                <option value="物理">物理</option>
                <option value="化学">化学</option>
                <option value="生物">生物</option>
                <option value="历史">历史</option>
                <option value="政治">政治</option>
                <option value="地理">地理</option>
                <option value="科学">科学</option>
              </select>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">PK规则</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 每轮PK将随机抽取5道题目</li>
                <li>• 每道题有15秒答题时间</li>
                <li>• 答对一题得10分</li>
                <li>• 得分高者获胜</li>
              </ul>
            </div>
            
            <button
              onClick={startPK}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              开始挑战
            </button>
          </div>
        ) : isPkFinished ? (
          // PK结束界面
          renderPKResult()
        ) : (
          // 答题界面
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            {/* 得分面板 */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div className="text-center">
                <p className="text-sm text-gray-600">你的得分</p>
                <p className="text-2xl font-bold text-blue-500">{userScore}</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                  <img src="https://tongque.ocybers.com/img/logo.jpg" alt="你的头像" className="w-full h-full object-cover" />
                </div>
                <span className="font-medium">VS</span>
                <div className="w-10 h-10 rounded-full overflow-hidden ml-2">
                  <img src={opponentData.avatar} alt={opponentData.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">{opponentData.name}</p>
                <p className="text-2xl font-bold text-red-500">{opponentScore}</p>
              </div>
            </div>
            
            {/* 题目进度 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>题目 {currentQuestion + 1}/5</span>
                <span className={`font-medium ${timer <= 5 ? 'text-red-500' : ''}`}>
                  剩余时间: {timer}秒
                </span>
              </div>
              <progress
                value={currentQuestion + 1}
                max="5"
                className="w-full h-2 bg-gray-200 rounded-full"
              />
            </div>
            
            {/* 题目内容 */}
            <div className="mb-4">
              <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>
            </div>
            
            {/* 题目选项或输入框 */}
            {renderQuestion()}
            
            {/* 答题结果 */}
            {renderAnswerResult()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PkPage;
