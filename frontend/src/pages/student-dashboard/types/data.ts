import type { QuestionType, OpponentType,CourseCardProps } from "./types";

const defaultCourses: CourseCardProps[] = [
  {
    title: "语文",
    teacher: "张云",
    niandu: "翻斗天才小学",
    image: "https://th.bing.com/th/id/OIP.hh4ARKCOB9m3xOhU3DEMNwHaE8?w=281&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "数学",
    teacher: "李念",
    niandu: "翻斗天才小学",
    image: "https://tse3.mm.bing.net/th/id/OIP.nFlgcnsegrc1dlWl3YxwnAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "英语",
    teacher: "王老吉",
    niandu: "翻斗天才小学",
    image: "https://tse1.mm.bing.net/th/id/OIP.IKAnaprVXSqeObyfGErQ8AHaFL?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "物理",
    teacher: "赵娣",
    niandu: "翻斗天才小学",
    image: "https://th.bing.com/th/id/OIP.oWs7cQlJmp7B6AfAWgTmFgHaE8?w=270&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "化学",
    teacher: "钱唐",
    niandu: "翻斗天才小学",
    image: "https://th.bing.com/th/id/OIP.znz76e61VN7fyDKOJYwvvgHaE7?w=282&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "地理",
    teacher: "吴心语",
    niandu: "翻斗天才小学",
    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.NEXlqYnzW1HEVQ3zX2q8DgHaEK?w=303&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    title: "科学",
    teacher: "郑丰源",
    niandu: "翻斗天才小学",
    image: "https://tse4-mm.cn.bing.net/th/id/OIP-C.o69xavy65VhcESGCe1GVygHaEd?w=254&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
];

const randomImg = [
  "https://picsum.photos/300/180?random=1",
  "https://picsum.photos/300/180?random=2",
  "https://picsum.photos/300/180?random=3",
  "https://picsum.photos/300/180?random=4",
  "https://picsum.photos/300/180?random=5",
];
const randomTeacher = ["张伊宁", "李明", "王天棚", "赵二瞪", "钱三思", "孙四海", "周五福", "吴六郎"];
const randomName = [
  "Linux网络管理",
  "Windows系统管理",
  "C++程序设计",
  "周五体育足球",
  "Python编程",
  "数据结构",
  "操作系统",
  "计算机网络",
];

// PK功能相关数据
const subjectOpponents: Record<string, OpponentType> = {
  语文: {
    name: "文言达人",
    avatar: "https://picsum.photos/id/23/100/100",
    title: "古诗文爱好者",
    description: "擅长中国古典文学，对四大名著了如指掌"
  },
  数学: {
    name: "数学学霸",
    avatar: "https://picsum.photos/id/45/100/100",
    title: "奥数竞赛获奖者",
    description: "精通四则运算与方程求解，计算速度超快"
  },
  英语: {
    name: "英语达人",
    avatar: "https://picsum.photos/id/67/100/100",
    title: "雅思8.5分持有者",
    description: "熟悉英语基础词汇与语法，口语流利"
  }
};

const questionBank: Record<string, QuestionType[]> = {
  语文: [
    {
      id: 1,
      question: "《红楼梦》的作者是谁？",
      options: ["曹雪芹", "罗贯中", "吴承恩", "施耐庵"],
      answer: "曹雪芹",
      type: "选择题",
      analysis: "本题考查中国古典四大名著的作者。《红楼梦》是中国古典小说的巅峰之作，前80回由曹雪芹创作，后40回一般认为是高鹗续写。"
    },
    {
      id: 2,
      question: "下列哪个不是唐代诗人？",
      options: ["李白", "杜甫", "苏轼", "王维"],
      answer: "苏轼",
      type: "选择题",
      analysis: "本题考查唐宋主要诗人的朝代归属。李白、杜甫和王维都是唐代著名诗人，而苏轼是北宋时期的文学家。"
    },
    {
      id: 3,
      question: "'床前明月光'的下一句是？",
      answer: "疑是地上霜",
      type: "填空题",
      analysis: "本题考查唐诗名句的记忆。这两句诗出自李白的《静夜思》，是流传千古的五言绝句。"
    },
    {
      id: 4,
      question: "'但愿人长久'出自苏轼的《水调歌头》？",
      options: ["是", "不是"],
      answer: "是",
      type: "判断题",
      analysis: "本题考查宋词名句与作品的对应关系。'但愿人长久，千里共婵娟'出自苏轼的《水调歌头·明月几时有》。"
    },
    {
      id: 5,
      question: "《静夜思》的作者是？",
      options: ["李白", "杜甫", "白居易", "王维"],
      answer: "李白",
      type: "选择题",
      analysis: "本题考查唐诗作者与作品的对应。《静夜思》是唐代诗人李白的代表作之一。"
    },
  ],
  数学: [
    {
      id: 1,
      question: "2+3×4=？",
      options: ["14", "20", "10", "18"],
      answer: "14",
      type: "选择题",
      analysis: "本题考查四则运算的运算顺序。应先进行乘法运算：3×4=12，再进行加法运算：2+12=14。"
    },
    {
      id: 2,
      question: "三角形内角和是多少度？",
      options: ["90°", "180°", "270°", "360°"],
      answer: "180°",
      type: "选择题",
      analysis: "本题考查三角形的基本性质。任意一个三角形的内角和都是180度，这是三角形的基本定理。"
    },
    {
      id: 3,
      question: "15的平方是多少？",
      answer: "225",
      type: "计算题",
      analysis: "一个数的平方等于这个数乘以它本身，即15×15=225。"
    },
    {
      id: 4,
      question: "0是自然数？",
      options: ["是", "不是"],
      answer: "是",
      type: "判断题",
      analysis: "在现代数学定义中，自然数包括0和所有正整数（0,1,2,3,...）。"
    },
    {
      id: 5,
      question: "方程x²-4=0的解是？",
      options: ["2", "-2", "±2", "4"],
      answer: "±2",
      type: "选择题",
      analysis: "对方程x²-4=0进行变形可得x²=4，因此x=±2。"
    },
  ],
  英语: [
    {
      id: 1,
      question: "What is the capital of England?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      answer: "London",
      type: "选择题",
      analysis: "This question tests knowledge of world capitals. London is the capital city of England."
    },
    {
      id: 2,
      question: "The past tense of 'go' is?",
      options: ["goed", "went", "gone", "going"],
      answer: "went",
      type: "选择题",
      analysis: "This question tests knowledge of English verb tenses. The correct past tense of 'go' is 'went'."
    },
    {
      id: 3,
      question: "Translate to English: '我喜欢学习英语。'",
      options: ["I like studying English.", "I love studying English.", "I enjoy studying English.", "I hate studying English."],
      answer: "I like studying English.",
      type: "选择题",
      analysis: "This question tests knowledge of English translation. The correct translation is 'I like studying English.'."
    },
    {
      id: 4,
      question: "'She is a teacher.' Is this sentence correct?",
      options: ["Yes", "No"],
      answer: "Yes",
      type: "判断题",
      analysis: "本题考查英语句子的语法结构。'She is a teacher.' 是一个正确的英语句子。"
    },
    {
      id: 5,
      question: "What is the plural form of 'child'?",
      options: ["childs", "children", "childes", "child"],
      answer: "children",
      type: "选择题",
      analysis: "This question tests knowledge of English plural forms. The correct plural form of 'child' is 'children'."
    },
    {
      id: 6,
      question: "Fill in the blank: 'He ___ to school every day.'",
      options: ["go", "goes", "going", "gone"],
      answer: "goes",
      type: "选择题",
      analysis: "This question tests knowledge of subject-verb agreement. The correct form is 'goes' for the third person singular."
    }
  ]
};

export { defaultCourses, randomImg, randomTeacher, randomName, questionBank, subjectOpponents };