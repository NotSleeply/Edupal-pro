import type { QuestionType, OpponentType,CourseCardProps } from "./types";

// 课程数据
const defaultCourses: CourseCardProps[] = [
  {
    id: 1,
    title: "语文",
    teacher: "张云",
    niandu: "翻斗天才小学",
    image: "https://th.bing.com/th/id/OIP.hh4ARKCOB9m3xOhU3DEMNwHaE8?w=281&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    id: 2,
    title: "数学",
    teacher: "李念",
    niandu: "翻斗天才小学",
    image: "https://tse3.mm.bing.net/th/id/OIP.nFlgcnsegrc1dlWl3YxwnAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 3,
    title: "英语",
    teacher: "王老吉",
    niandu: "翻斗天才小学",
    image: "https://tse1.mm.bing.net/th/id/OIP.IKAnaprVXSqeObyfGErQ8AHaFL?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 4,
    title: "物理",
    teacher: "赵娣",
    niandu: "翻斗天才小学",
    image: "https://th.bing.com/th/id/OIP.oWs7cQlJmp7B6AfAWgTmFgHaE8?w=270&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    id: 5,
    title: "化学",
    teacher: "钱唐",
    niandu: "翻斗天才小学",
    image: "https://th.bing.com/th/id/OIP.znz76e61VN7fyDKOJYwvvgHaE7?w=282&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
      id: 6,
    title: "地理",
    teacher: "吴心语",
    niandu: "翻斗天才小学",
    image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.NEXlqYnzW1HEVQ3zX2q8DgHaEK?w=303&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
      id: 7,
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

// PK 对手
const subjectOpponents: OpponentType[] = [
  {
    name: "文言达人",
    avatar: "https://picsum.photos/id/23/100/100",
    title: "古诗文爱好者",
    description: "擅长中国古典文学，对四大名著了如指掌"
  },
  {
    name: "数学学霸",
    avatar: "https://picsum.photos/id/45/100/100",
    title: "奥数竞赛获奖者",
    description: "精通四则运算与方程求解，计算速度超快"
  },
  {
    name: "英语达人",
    avatar: "https://picsum.photos/id/67/100/100",
    title: "雅思8.5分持有者",
    description: "熟悉英语基础词汇与语法，口语流利"
  },
  {
    name: "我是大耳朵图图",
    avatar: "https://picsum.photos/id/101/100/100",
    title: "幼儿园扛把子",
    description: "梦想是成为像樱木花道一样厉害的人"
  },
  {
    name: "不爱吃胡萝卜",
    avatar: "https://picsum.photos/id/102/100/100",
    title: "挑食大王",
    description: "只喜欢吃肉，但答题速度飞快"
  },
  {
    name: "学霸是我的昵称",
    avatar: "https://picsum.photos/id/103/100/100",
    title: "伪装者",
    description: "擅长出其不意，可能上一秒还在玩泥巴，下一秒就答对了"
  },
  {
    name: "宇宙无敌小可爱",
    avatar: "https://picsum.photos/id/104/100/100",
    title: "人见人爱花见花开",
    description: "性格开朗，知识面广，尤其擅长科学常识"
  },
  {
    name: "今天不想写作业",
    avatar: "https://picsum.photos/id/105/100/100",
    title: "拖延症晚期",
    description: "总是在最后一刻才提交答案，但正确率惊人"
  },
  {
    name: "爱吃薯条的小明",
    avatar: "https://picsum.photos/id/106/100/100",
    title: "美食家",
    description: "通过吃各种食物来获取能量，所以答题速度时快时慢"
  },
  {
    name: "我的滑板鞋时尚",
    avatar: "https://picsum.photos/id/107/100/100",
    title: "街头潮流达人",
    description: "答题风格酷炫，喜欢用最短的时间解决问题"
  },
  {
    name: "每天都想睡懒觉",
    avatar: "https://picsum.photos/id/108/100/100",
    title: "睡眠充足星人",
    description: "答题时反应迟钝，但偶尔会爆发出超常的智慧"
  },
  {
    name: "我是幼儿园小班长",
    avatar: "https://picsum.photos/id/109/100/100",
    title: "班级小领袖",
    description: "擅长号召大家一起答题，有很强的团队精神"
  },
  {
    name: "偷偷学习的学渣",
    avatar: "https://picsum.photos/id/110/100/100",
    title: "隐藏大佬",
    description: "看起来漫不经心，其实已经背完了所有课文"
  },
  {
    name: "不想上班的杰瑞",
    avatar: "https://picsum.photos/id/111/100/100",
    title: "职场新人",
    description: "偶尔会把职场上的经验用在答题上"
  },
  {
    name: "月亮不睡我不睡",
    avatar: "https://picsum.photos/id/112/100/100",
    title: "熬夜冠军",
    description: "白天昏昏欲睡，晚上精神百倍"
  },
  {
    name: "吃瓜群众小王",
    avatar: "https://picsum.photos/id/113/100/100",
    title: "八卦小能手",
    description: "对各种新鲜事了如指掌"
  },
  {
    name: "今天也是元气满满",
    avatar: "https://picsum.photos/id/114/100/100",
    title: "能量满满小太阳",
    description: "不管遇到什么难题，总是笑着面对"
  },
  {
    name: "我爱学习，学习爱我",
    avatar: "https://picsum.photos/id/115/100/100",
    title: "口号喊得响",
    description: "喜欢在答题前喊口号，给自己打气"
  },
  {
    name: "懒癌晚期",
    avatar: "https://picsum.photos/id/116/100/100",
    title: "能坐着就不站着",
    description: "喜欢用最简单的方式解决问题，所以思路特别清奇"
  },
  {
    name: "我是你的小可爱",
    avatar: "https://picsum.photos/id/117/100/100",
    title: "萌新小白",
    description: "刚开始玩，什么都不懂，所以可能会答错"
  },
  {
    name: "不折腾不舒服斯基",
    avatar: "https://picsum.photos/id/118/100/100",
    title: "探险家",
    description: "喜欢挑战各种高难度题目，越难越兴奋"
  },
  {
    name: "我的猫咪是学霸",
    avatar: "https://picsum.photos/id/119/100/100",
    title: "铲屎官",
    description: "答题前会先和猫咪商量一下"
  },
  {
    name: "我是隔壁老王",
    avatar: "https://picsum.photos/id/120/100/100",
    title: "低调高手",
    description: "平时不声不响，关键时刻总能答对"
  }
];

// 题库
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
    {
      id: 6,
      question: "《出师表》的作者是？",
      options: ["诸葛亮", "司马迁", "杜甫", "李白"],
      answer: "诸葛亮",
      type: "选择题",
      analysis: "本题考查古文名篇与作者的对应关系。《出师表》是三国时期蜀汉丞相诸葛亮上表刘禅的著名文章。"
    },
    {
      id: 7,
      question: "《三国演义》的作者是谁？",
      options: ["罗贯中", "曹雪芹", "施耐庵", "吴承恩"],
      answer: "罗贯中",
      type: "选择题",
      analysis: "《三国演义》是中国古典四大名著之一，作者是元末明初的罗贯中。"
    },
    {
      id: 8,
      question: "“人生自古谁无死”出自哪位诗人？",
      options: ["文天祥", "陆游", "辛弃疾", "苏轼"],
      answer: "文天祥",
      type: "选择题",
      analysis: "“人生自古谁无死，留取丹心照汗青”出自文天祥的《过零丁洋》。"
    },
    {
      id: 9,
      question: "“大江东去，浪淘尽，千古风流人物”出自哪首词？",
      options: ["念奴娇·赤壁怀古", "水调歌头", "青玉案·元夕", "永遇乐·京口北固亭怀古"],
      answer: "念奴娇·赤壁怀古",
      type: "选择题",
      analysis: "“大江东去，浪淘尽，千古风流人物”出自苏轼的《念奴娇·赤壁怀古》。"
    },
    {
      id: 10,
      question: "“桃花潭水深千尺，不及汪伦送我情”是谁写的？",
      options: ["李白", "杜甫", "白居易", "王之涣"],
      answer: "李白",
      type: "选择题",
      analysis: "这句诗出自李白的《赠汪伦》。"
    },
    {
      id: 11,
      question: "“会当凌绝顶，一览众山小”出自哪座山？",
      options: ["泰山", "华山", "嵩山", "衡山"],
      answer: "泰山",
      type: "选择题",
      analysis: "“会当凌绝顶，一览众山小”出自杜甫的《望岳》，写的是泰山。"
    },
    {
      id: 12,
      question: "“天生我材必有用，千金散尽还复来”是谁的诗句？",
      options: ["李白", "杜甫", "白居易", "王维"],
      answer: "李白",
      type: "选择题",
      analysis: "这句诗出自李白的《将进酒》。"
    },
    {
      id: 13,
      question: "“劝君更尽一杯酒，西出阳关无故人”是谁写的？",
      options: ["王维", "李白", "杜甫", "白居易"],
      answer: "王维",
      type: "选择题",
      analysis: "这句诗出自王维的《送元二使安西》。"
    },
    {
      id: 14,
      question: "“春眠不觉晓，处处闻啼鸟”出自哪首诗？",
      answer: "春晓",
      type: "填空题",
      analysis: "“春眠不觉晓，处处闻啼鸟”出自孟浩然的《春晓》。"
    },
    {
      id: 15,
      question: "“白日依山尽，黄河入海流”是谁的诗句？",
      options: ["王之涣", "王维", "李白", "杜甫"],
      answer: "王之涣",
      type: "选择题",
      analysis: "这句诗出自王之涣的《登鹳雀楼》。"
    },
    {
      id: 16,
      question: "“举头望明月，低头思故乡”出自哪首诗？",
      answer: "静夜思",
      type: "填空题",
      analysis: "“举头望明月，低头思故乡”出自李白的《静夜思》。"
    },
    {
      id: 17,
      question: "“谁言寸草心，报得三春晖”表达了什么情感？",
      options: ["母爱", "友情", "爱情", "乡愁"],
      answer: "母爱",
      type: "选择题",
      analysis: "这句诗出自孟郊的《游子吟》，表达了对母爱的感激。"
    },
    {
      id: 18,
      question: "“路漫漫其修远兮，吾将上下而求索”是谁的诗句？",
      options: ["屈原", "李白", "杜甫", "陶渊明"],
      answer: "屈原",
      type: "选择题",
      analysis: "这句诗出自屈原的《离骚》。"
    },
    {
      id: 19,
      question: "“但使龙城飞将在，不教胡马度阴山”写的是哪位将军？",
      options: ["李广", "霍去病", "卫青", "班超"],
      answer: "李广",
      type: "选择题",
      analysis: "“飞将军”指的是汉朝名将李广。"
    },
    {
      id: 20,
      question: "“己所不欲，勿施于人”是谁的主张？",
      options: ["孔子", "孟子", "老子", "庄子"],
      answer: "孔子",
      type: "选择题",
      analysis: "“己所不欲，勿施于人”是孔子的仁爱思想。"
    },
    {
      id: 21,
      question: "“海内存知己，天涯若比邻”是谁写的？",
      options: ["王勃", "王之涣", "王维", "李白"],
      answer: "王勃",
      type: "选择题",
      analysis: "这句诗出自王勃的《送杜少府之任蜀州》。"
    },
    {
      id: 22,
      question: "“莫愁前路无知己，天下谁人不识君”是谁的诗句？",
      options: ["高适", "王昌龄", "王维", "李白"],
      answer: "高适",
      type: "选择题",
      analysis: "这句诗出自高适的《别董大》。"
    },
    {
      id: 23,
      question: "“采菊东篱下，悠然见南山”是谁的诗句？",
      options: ["陶渊明", "王维", "李白", "杜甫"],
      answer: "陶渊明",
      type: "选择题",
      analysis: "这句诗出自陶渊明的《饮酒》。"
    },
    {
      id: 24,
      question: "“人生若只如初见”是谁的词句？",
      options: ["纳兰性德", "李清照", "苏轼", "辛弃疾"],
      answer: "纳兰性德",
      type: "选择题",
      analysis: "“人生若只如初见”出自纳兰性德的《木兰花令·拟古决绝词》。"
    },
    {
      id: 25,
      question: "“无可奈何花落去，似曾相识燕归来”是谁的诗句？",
      options: ["晏殊", "欧阳修", "苏轼", "李清照"],
      answer: "晏殊",
      type: "选择题",
      analysis: "这句诗出自晏殊的《浣溪沙》。"
    },
    {
      id: 26,
      question: "“问君能有几多愁？恰似一江春水向东流”是谁的词句？",
      options: ["李煜", "李清照", "苏轼", "辛弃疾"],
      answer: "李煜",
      type: "选择题",
      analysis: "这句词出自李煜的《虞美人》。"
    },
    {
      id: 27,
      question: "“人生得意须尽欢，莫使金樽空对月”是谁的诗句？",
      options: ["李白", "杜甫", "白居易", "王维"],
      answer: "李白",
      type: "选择题",
      analysis: "这句诗出自李白的《将进酒》。"
    },
    {
      id: 28,
      question: "“千里江陵一日还”描述的是哪条江？",
      options: ["长江", "黄河", "珠江", "淮河"],
      answer: "长江",
      type: "选择题",
      analysis: "“千里江陵一日还”出自李白的《早发白帝城》，描述的是长江。"
    },
    {
      id: 29,
      question: "“落霞与孤鹜齐飞，秋水共长天一色”是谁的诗句？",
      options: ["王勃", "王之涣", "王维", "李白"],
      answer: "王勃",
      type: "选择题",
      analysis: "这句诗出自王勃的《滕王阁序》。"
    },
    {
      id: 30,
      question: "“羌笛何须怨杨柳，春风不度玉门关”是谁的诗句？",
      options: ["王之涣", "王维", "李白", "杜甫"],
      answer: "王之涣",
      type: "选择题",
      analysis: "这句诗出自王之涣的《凉州词》。"
    }
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
    {
      id: 6,
      question: "下列哪些数是质数？",
      options: ["2", "3", "4", "5"],
      answer: "2,3,5",
      type: "多选题",
      analysis: "质数是只能被1和自身整除的自然数，2、3、5都是质数，4不是质数。【多选题】"
    },
    {
      id: 7,
      question: "下列哪些图形有对称轴？",
      options: ["正方形", "长方形", "三角形", "圆"],
      answer: "正方形,长方形,圆",
      type: "多选题",
      analysis: "正方形、长方形和圆都有对称轴，普通三角形一般没有对称轴。【多选题】"
    },
    {
      id: 8,
      question: "下列等式哪些是成立的？",
      options: ["2×3=6", "5+5=11", "9-4=5", "8÷2=4"],
      answer: "2×3=6,9-4=5,8÷2=4",
      type: "多选题",
      analysis: "2×3=6，9-4=5，8÷2=4 都成立，5+5=10，不成立。【多选题】"
    },
    {
      id: 9,
      question: "选择所有偶数。",
      options: ["1", "2", "3", "4"],
      answer: "2,4",
      type: "多选题",
      analysis: "偶数是能被2整除的数，这里2和4是偶数。【多选题】"
    },
    {
      id: 10,
      question: "下列哪些属于平面图形？",
      options: ["圆", "球", "正方形", "长方体"],
      answer: "圆,正方形",
      type: "多选题",
      analysis: "圆和正方形是平面图形，球和长方体是立体图形。【多选题】"
    },
    {
      id: 11,
      question: "π（圆周率）约等于多少？",
      answer: "3.14",
      type: "填空题",
      analysis: "圆周率π常用近似值为3.14。"
    },
    {
      id: 12,
      question: "5的平方根是______。",
      answer: "√5",
      type: "填空题",
      analysis: "5的平方根是√5。"
    },
    {
      id: 13,
      question: "100除以4等于______。",
      answer: "25",
      type: "填空题",
      analysis: "100÷4=25。"
    },
    {
      id: 14,
      question: "一个正方形有______条对称轴。",
      answer: "4",
      type: "填空题",
      analysis: "正方形有4条对称轴。"
    },
    {
      id: 15,
      question: "1千米等于______米。",
      answer: "1000",
      type: "填空题",
      analysis: "1千米=1000米。"
    },
    {
      id: 16,
      question: "三角形的面积公式是______。",
      answer: "底×高÷2",
      type: "填空题",
      analysis: "三角形面积=底×高÷2。"
    },
    {
      id: 17,
      question: "2的5次方等于______。",
      answer: "32",
      type: "填空题",
      analysis: "2的5次方是2×2×2×2×2=32。"
    },
    {
      id: 18,
      question: "直角三角形中，最大的角是______度。",
      answer: "90",
      type: "填空题",
      analysis: "直角三角形中最大的角是直角，即90度。"
    },
    {
      id: 19,
      question: "圆的半径是5，直径是______。",
      answer: "10",
      type: "填空题",
      analysis: "直径=半径×2=10。"
    },
    {
      id: 20,
      question: "0.25化成百分数是______%。",
      answer: "25",
      type: "填空题",
      analysis: "0.25=25%。"
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
    },
    {
      id: 7,
      question: "Which word is a synonym for 'happy'?",
      options: ["Sad", "Glad", "Angry", "Tired"],
      answer: "Glad",
      type: "选择题",
      analysis: "This question tests knowledge of synonyms. 'Glad' has a similar meaning to 'happy'."
    },
    {
      id: 8,
      question: "What is the opposite of 'big'?",
      options: ["Small", "Tall", "Long", "Wide"],
      answer: "Small",
      type: "选择题",
      analysis: "This question tests knowledge of antonyms. 'Small' is the opposite of 'big'."
    },
    {
      id: 9,
      question: "Translate to Chinese: 'Where is the bathroom?'",
      options: ["餐厅在哪里？", "浴室在哪里？", "厨房在哪里？", "卧室在哪里？"],
      answer: "浴室在哪里？",
      type: "选择题",
      analysis: "This question tests translation skills. 'Bathroom' translates to '浴室' in Chinese."
    },
    {
      id: 10,
      question: "'I have two cat.' Is this sentence correct?",
      options: ["Yes", "No"],
      answer: "No",
      type: "判断题",
      analysis: "This question tests plural forms. The correct sentence should be 'I have two cats'."
    },
    {
      id: 11,
      question: "Which of these is a fruit?",
      options: ["Carrot", "Potato", "Apple", "Broccoli"],
      answer: "Apple",
      type: "选择题",
      analysis: "This question tests vocabulary classification. An apple is a type of fruit."
    },
    {
      id: 12,
      question: "Fill in the blank: 'They ___ playing football now.'",
      options: ["is", "are", "am", "be"],
      answer: "are",
      type: "选择题",
      analysis: "This question tests present continuous tense. 'Are' is correct for plural subject 'they'."
    },
    {
      id: 13,
      question: "What is the past participle of 'eat'?",
      options: ["ate", "eaten", "eating", "eat"],
      answer: "eaten",
      type: "选择题",
      analysis: "This question tests verb forms. The past participle of 'eat' is 'eaten'."
    },
    {
      id: 14,
      question: "Which word is a verb?",
      options: ["Quickly", "Beautiful", "Run", "Table"],
      answer: "Run",
      type: "选择题",
      analysis: "This question tests parts of speech. 'Run' is an action verb."
    },
    {
      id: 15,
      question: "Translate to English: '明天会下雨吗？'",
      options: ["Is it raining tomorrow?", "Will it rain tomorrow?", "Does it rain tomorrow?", "Was it raining tomorrow?"],
      answer: "Will it rain tomorrow?",
      type: "选择题",
      analysis: "This question tests future tense translation. The correct form uses 'will' for future events."
    },
    {
      id: 16,
      question: "'She don't like coffee.' Is this sentence correct?",
      options: ["Yes", "No"],
      answer: "No",
      type: "判断题",
      analysis: "This question tests subject-verb agreement. Correct form: 'She doesn't like coffee'."
    },
    {
      id: 17,
      question: "What is the plural form of 'mouse'?",
      options: ["mouses", "mice", "mousees", "mouse"],
      answer: "mice",
      type: "选择题",
      analysis: "This question tests irregular plurals. The plural of 'mouse' is 'mice'."
    },
    {
      id: 18,
      question: "Which preposition completes this sentence: 'I'm good ___ swimming.'",
      options: ["in", "on", "at", "with"],
      answer: "at",
      type: "选择题",
      analysis: "This question tests preposition usage. The correct phrase is 'good at' for skills."
    },
    {
      id: 19,
      question: "What does 'expensive' mean?",
      options: ["Costing a lot of money", "Very small", "Easy to carry", "Tasting good"],
      answer: "Costing a lot of money",
      type: "选择题",
      analysis: "This question tests vocabulary meaning. 'Expensive' describes something that costs much money."
    },
    {
      id: 20,
      question: "'We are go to the park.' Is this sentence correct?",
      options: ["Yes", "No"],
      answer: "No",
      type: "判断题",
      analysis: "This question tests future tense. Correct form: 'We are going to the park'."
    },
    {
      id: 21,
      question: "Fill in the blank: '___ book is on the table?'",
      options: ["Who", "Which", "Whose", "Where"],
      answer: "Whose",
      type: "选择题",
      analysis: "This question tests interrogative pronouns. 'Whose' is used to ask about possession."
    },
    {
      id: 22,
      question: "Which of these is a country?",
      options: ["Paris", "Tokyo", "France", "Beijing"],
      answer: "France",
      type: "选择题",
      analysis: "This question tests geographical knowledge. France is a country; others are cities."
    },
    {
      id: 23,
      question: "Translate to Chinese: 'I have been studying English for 3 years.'",
      options: ["我学英语3年了。", "我将学英语3年。", "我正在学英语3年。", "我学英语3年。"],
      answer: "我学英语3年了。",
      type: "选择题",
      analysis: "This question tests present perfect continuous translation. The correct translation uses '了' to indicate completion."
    },
    {
      id: 24,
      question: "'He is taller than me.' Is this sentence correct?",
      options: ["Yes", "No"],
      answer: "Yes",
      type: "判断题",
      analysis: "This question tests comparative forms. The sentence correctly uses 'taller than'."
    },
    {
      id: 25,
      question: "What is the superlative form of 'fast'?",
      options: ["faster", "fastest", "more fast", "most fast"],
      answer: "fastest",
      type: "选择题",
      analysis: "This question tests superlative forms. For short adjectives, add '-est'."
    },
    {
      id: 26,
      question: "Which word is an adverb?",
      options: ["Happy", "Happily", "Happiness", "Happyly"],
      answer: "Happily",
      type: "选择题",
      analysis: "This question tests parts of speech. 'Happily' is an adverb (ends with '-ly')."
    },
    {
      id: 27,
      question: "Fill in the blank: 'If it ___ tomorrow, we will stay home.'",
      options: ["rain", "rains", "rained", "will rain"],
      answer: "rains",
      type: "选择题",
      analysis: "This question tests conditional sentences. Present simple is used in the 'if' clause."
    },
    {
      id: 28,
      question: "What does 'apologize' mean?",
      options: ["To say sorry", "To ask for help", "To give thanks", "To make a promise"],
      answer: "To say sorry",
      type: "选择题",
      analysis: "This question tests vocabulary meaning. 'Apologize' means to express regret for a mistake."
    },
    {
      id: 29,
      question: "Translate to English: '我昨天去了商店。'",
      options: ["I go to the store yesterday.", "I will go to the store yesterday.", "I went to the store yesterday.", "I was going to the store yesterday."],
      answer: "I went to the store yesterday.",
      type: "选择题",
      analysis: "This question tests past tense translation. 'Yesterday' requires past simple tense."
    },
    {
      id: 30,
      question: "'She has three childs.' Is this sentence correct?",
      options: ["Yes", "No"],
      answer: "No",
      type: "判断题",
      analysis: "This question tests irregular plurals. Correct form: 'She has three children'."
    },
    {
      id: 31,
      question: "Which preposition is correct: 'I'm interested ___ history.'",
      options: ["in", "on", "at", "for"],
      answer: "in",
      type: "选择题",
      analysis: "This question tests preposition collocations. The correct phrase is 'interested in'."
    },
    {
      id: 32,
      question: "What is the present participle of 'cook'?",
      options: ["cooked", "cooks", "cooking", "cook"],
      answer: "cooking",
      type: "选择题",
      analysis: "This question tests verb forms. Present participle of 'cook' is 'cooking'."
    },
    {
      id: 33,
      question: "Which of these is a verb tense?",
      options: ["Adjective", "Past perfect", "Noun", "Adverb"],
      answer: "Past perfect",
      type: "选择题",
      analysis: "This question tests grammar knowledge. 'Past perfect' is a verb tense."
    },
    {
      id: 34,
      question: "Fill in the blank: 'She ___ here since 2010.'",
      options: ["lives", "lived", "has lived", "will live"],
      answer: "has lived",
      type: "选择题",
      analysis: "This question tests present perfect tense. 'Since' indicates an action continuing to now."
    },
    {
      id: 35,
      question: "What does 'generous' mean?",
      options: ["Willing to give to others", "Very hungry", "Afraid of the dark", "Good at sports"],
      answer: "Willing to give to others",
      type: "选择题",
      analysis: "This question tests vocabulary meaning. 'Generous' describes someone who gives freely."
    },
    {
      id: 36,
      question: "'They are going to visiting their grandparents.' Is this sentence correct?",
      options: ["Yes", "No"],
      answer: "No",
      type: "判断题",
      analysis: "This question tests future plans. Correct form: 'They are going to visit their grandparents'."
    }
  ]
};

export { defaultCourses, randomImg, randomTeacher, randomName, questionBank, subjectOpponents };