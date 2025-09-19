import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 题目数据结构
const questionBank = {
  语文: [
    { 
      id: 1, 
      question: "《红楼梦》的作者是谁？", 
      options: ["曹雪芹", "罗贯中", "吴承恩", "施耐庵"], 
      answer: "曹雪芹", 
      type: "选择题",
      analysis: "本题考查中国古典四大名著的作者。《红楼梦》是中国古典小说的巅峰之作，前80回由曹雪芹创作，后40回一般认为是高鹗续写。其他选项中，罗贯中是《三国演义》的作者，吴承恩是《西游记》的作者，施耐庵是《水浒传》的作者。因此正确答案是曹雪芹。"
    },
    { 
      id: 2, 
      question: "下列哪个不是唐代诗人？", 
      options: ["李白", "杜甫", "苏轼", "王维"], 
      answer: "苏轼", 
      type: "选择题",
      analysis: "本题考查唐宋主要诗人的朝代归属。李白、杜甫和王维都是唐代著名诗人，其中李白被誉为“诗仙”，杜甫被誉为“诗圣”，王维以山水田园诗著称。而苏轼是北宋时期的文学家、书画家，是“唐宋八大家”之一，其词开创了豪放一派。因此正确答案是苏轼。"
    },
    { 
      id: 3, 
      question: "'床前明月光'的下一句是？", 
      answer: "疑是地上霜", 
      type: "填空题",
      analysis: "本题考查唐诗名句的记忆。“床前明月光，疑是地上霜”出自李白的《静夜思》。这两句诗通过把月光比作霜，生动形象地描绘出夜晚的清冷，为后两句“举头望明月，低头思故乡”所表达的思乡之情做了铺垫。这是一首流传千古的五言绝句，是李白的代表作之一。"
    },
    { 
      id: 4, 
      question: "'但愿人长久'出自苏轼的《水调歌头》？", 
      options: ["是", "不是"], 
      answer: "是", 
      type: "判断题",
      analysis: "本题考查宋词名句与作品的对应关系。“但愿人长久，千里共婵娟”出自北宋文学家苏轼的《水调歌头·明月几时有》。这首词作于宋神宗熙宁九年的中秋，苏轼在密州任上，通过对明月的描绘和对亲人的思念，表达了对人生的深刻感悟。因此该说法正确。"
    },
    { 
      id: 5, 
      question: "《静夜思》的作者是？", 
      options: ["李白", "杜甫", "白居易", "王维"], 
      answer: "李白", 
      type: "选择题",
      analysis: "本题考查唐诗作者与作品的对应。《静夜思》是唐代诗人李白的代表作之一，全诗语言简洁朴素，却生动地表达了游子的思乡之情。杜甫以“三吏三别”等现实主义诗作著称，白居易的代表作有《长恨歌》《琵琶行》，王维则以山水田园诗闻名。因此正确答案是李白。"
    },
  ],
  数学: [
    { 
      id: 1, 
      question: "2+3×4=？", 
      options: ["14", "20", "10", "18"], 
      answer: "14", 
      type: "选择题",
      analysis: "本题考查四则运算的运算顺序。根据数学中的运算规则，在没有括号的情况下，应先进行乘法和除法运算，再进行加法和减法运算。因此，这道题应先计算3×4=12，再计算2+12=14。如果错误地按照从左到右的顺序计算（2+3=5，5×4=20），就会得到错误答案。正确答案是14。"
    },
    { 
      id: 2, 
      question: "三角形内角和是多少度？", 
      options: ["90°", "180°", "270°", "360°"], 
      answer: "180°", 
      type: "选择题",
      analysis: "本题考查三角形的基本性质。任意一个三角形的内角和都是180度，这是三角形的一个基本定理。可以通过将三角形的三个角剪下来拼在一起，形成一个平角（180度）来验证。90°是直角三角形中直角的度数，360°是四边形的内角和。因此正确答案是180°。"
    },
    { 
      id: 3, 
      question: "15的平方是多少？", 
      answer: "225", 
      type: "计算题",
      analysis: "本题考查平方的计算。一个数的平方等于这个数乘以它本身，即15的平方=15×15。计算时可以分解为(10+5)×(10+5)=10×10 + 10×5 + 5×10 + 5×5=100+50+50+25=225。15的平方是数学中常用的数值，建议记忆。正确答案是225。"
    },
    { 
      id: 4, 
      question: "0是自然数？", 
      options: ["是", "不是"], 
      answer: "是", 
      type: "判断题",
      analysis: "本题考查自然数的定义。在现代数学定义中，自然数是指用以计量事物的件数或表示事物次序的数，包括0和所有正整数（0,1,2,3,...）。这一定义被国际广泛采用，也是我国教材目前的标准定义。过去曾有定义将0排除在自然数之外，但现已更新。因此“0是自然数”这一说法正确。"
    },
    { 
      id: 5, 
      question: "方程x²-4=0的解是？", 
      options: ["2", "-2", "±2", "4"], 
      answer: "±2", 
      type: "选择题",
      analysis: "本题考查一元二次方程的求解。对方程x²-4=0进行变形可得x²=4。一个数的平方等于4，这个数可以是2（因为2²=4），也可以是-2（因为(-2)²=4）。因此方程的解是x=2或x=-2，即±2。如果只考虑正数解而忽略负数解，就会得到错误答案。正确答案是±2。"
    },
  ],
  英语: [
    { 
      id: 1, 
      question: "'Hello'的中文意思是？", 
      options: ["你好", "再见", "谢谢", "对不起"], 
      answer: "你好", 
      type: "选择题",
      analysis: "本题考查基础英语问候语的翻译。“Hello”是英语中最常用的问候语之一，用于见面时打招呼，对应的中文意思是“你好”。“再见”对应的英文是“Goodbye”或“Bye”，“谢谢”是“Thank you”，“对不起”是“Sorry”或“Excuse me”。因此正确答案是“你好”。"
    },
    { 
      id: 2, 
      question: "What is the past tense of 'go'?", 
      options: ["go", "went", "gone", "going"], 
      answer: "went", 
      type: "选择题",
      analysis: "本题考查不规则动词的过去式。“go”是一个不规则动词，其过去式是“went”，过去分词是“gone”。选项中“go”是动词原形，“going”是现在分词形式。不规则动词的过去式和过去分词需要特殊记忆，不能简单地加“-ed”。因此正确答案是“went”。"
    },
    { 
      id: 3, 
      question: "'苹果'的英文单词是？", 
      answer: "apple", 
      type: "填空题",
      analysis: "本题考查基础英语词汇的掌握。“苹果”对应的英文单词是“apple”。需要注意其拼写，不要误写为“appel”或“aple”。“apple”是一个可数名词，复数形式是“apples”，常见的搭配有“an apple”（一个苹果）、“apple tree”（苹果树）等。这是英语学习中最基础的词汇之一，需要熟练掌握。"
    },
    { 
      id: 4, 
      question: "'He are a student.'这句话是正确的？", 
      options: ["是", "不是"], 
      answer: "不是", 
      type: "判断题",
      analysis: "本题考查英语中be动词的正确使用。在英语中，be动词的形式要与主语保持一致。当主语是第三人称单数（如he, she, it）时，be动词要用“is”；当主语是第二人称（you）或复数形式时，be动词用“are”；主语是第一人称单数（I）时，be动词用“am”。因此，正确的句子应该是“He is a student.”，题目中的句子不正确。"
    },
    { 
      id: 5, 
      question: "How many letters are there in 'English'?", 
      options: ["6", "7", "8", "9"], 
      answer: "7", 
      type: "选择题",
      analysis: "本题考查英文单词的字母计数。“English”这个单词的拼写是E-N-G-L-I-S-H，共有7个字母。需要注意不要漏数或多数字母，特别是结尾的“sh”是两个字母。“English”既可以表示“英语”，也可以表示“英国人”或“英国的”。正确答案是7。"
    },
  ],
  物理: [
    { 
      id: 1, 
      question: "力的单位是？", 
      options: ["牛顿", "千克", "米", "秒"], 
      answer: "牛顿", 
      type: "选择题",
      analysis: "本题考查物理量的单位。力的国际单位是牛顿，简称“牛”，符号是“N”，这个单位是为了纪念英国物理学家艾萨克·牛顿而命名的。千克是质量的单位，米是长度的单位，秒是时间的单位。因此正确答案是牛顿。"
    },
    { 
      id: 2, 
      question: "光在真空中的传播速度约为？", 
      options: ["3×10^5 km/s", "3×10^5 m/s", "3×10^8 km/s", "3×10^6 km/s"], 
      answer: "3×10^5 km/s", 
      type: "选择题",
      analysis: "本题考查光速的数值及单位。光在真空中的传播速度是一个重要的物理常量，约为3×10^8米/秒（m/s）。题目中选项使用的是千米/秒（km/s），由于1千米=1000米，所以3×10^8 m/s = 3×10^5 km/s。这个速度是宇宙中已知的最快速度。正确答案是3×10^5 km/s。"
    },
    { 
      id: 3, 
      question: "1标准大气压约为多少帕斯卡？", 
      answer: "101325", 
      type: "计算题",
      analysis: "本题考查标准大气压的数值。1标准大气压是指在0℃、海平面处的大气压强，其数值约为101325帕斯卡（Pa）。这个数值是通过测量标准大气压能支持760毫米高的水银柱计算得出的。在实际应用中，有时会近似为1×10^5帕斯卡，但精确值是101325帕斯卡。正确答案是101325。"
    },
    { 
      id: 4, 
      question: "摩擦力总是阻碍物体运动？", 
      options: ["是", "不是"], 
      answer: "不是", 
      type: "判断题",
      analysis: "本题考查摩擦力的作用。摩擦力的本质是阻碍物体之间的相对运动，而不是阻碍物体的绝对运动。在某些情况下，摩擦力甚至可以作为动力，帮助物体运动。例如，人走路时，脚向后蹬地，地面对脚的静摩擦力向前，推动人前进；汽车行驶时，主动轮受到的摩擦力也是动力。因此，“摩擦力总是阻碍物体运动”的说法不正确。"
    },
    { 
      id: 5, 
      question: "下列哪个是导体？", 
      options: ["塑料", "橡胶", "铜", "玻璃"], 
      answer: "铜", 
      type: "选择题",
      analysis: "本题考查导体与绝缘体的区分。导体是指容易导电的物质，通常含有大量可以自由移动的电荷。金属（如铜、铁、铝等）是典型的导体，因为它们含有自由电子。而塑料、橡胶和玻璃都是绝缘体，它们的内部几乎没有可以自由移动的电荷，不容易导电，常用于电器的绝缘部分。因此正确答案是铜。"
    },
  ],
  化学: [
    { 
      id: 1, 
      question: "水的化学式是？", 
      options: ["H2O", "CO2", "NaCl", "O2"], 
      answer: "H2O", 
      type: "选择题",
      analysis: "本题考查常见物质的化学式。水是由氢元素和氧元素组成的化合物，其化学式为H2O，表示一个水分子由2个氢原子和1个氧原子构成。CO2是二氧化碳的化学式，NaCl是氯化钠（食盐）的化学式，O2是氧气的化学式。因此正确答案是H2O。"
    },
    { 
      id: 2, 
      question: "下列哪种气体是可燃的？", 
      options: ["氧气", "氢气", "二氧化碳", "氮气"], 
      answer: "氢气", 
      type: "选择题",
      analysis: "本题考查常见气体的化学性质。氢气（H2）是一种具有可燃性的气体，在氧气中燃烧会生成水，并释放出大量的热量，化学方程式为2H2 + O2 点燃 2H2O。氧气是助燃气体，本身不能燃烧；二氧化碳和氮气都是不可燃气体，常用于灭火。因此正确答案是氢气。"
    },
    { 
      id: 3, 
      question: "元素周期表中，原子序数为1的元素是？", 
      answer: "氢", 
      type: "填空题",
      analysis: "本题考查元素周期表的基本常识。元素周期表是按照元素的原子序数（即原子核内的质子数）排列的，原子序数为1的元素是氢（H）。氢是宇宙中含量最丰富的元素，也是元素周期表中的第一个元素。氢原子的原子核内有1个质子，核外有1个电子。正确答案是氢。"
    },
    { 
      id: 4, 
      question: "铁在空气中会生锈是化学变化？", 
      options: ["是", "不是"], 
      answer: "是", 
      type: "判断题",
      analysis: "本题考查化学变化与物理变化的区分。化学变化的本质特征是有新物质生成。铁在空气中生锈，是铁与空气中的氧气和水发生化学反应，生成了铁锈（主要成分是Fe2O3·xH2O），铁锈是一种与铁性质不同的新物质。因此，铁生锈属于化学变化，该说法正确。"
    },
    { 
      id: 5, 
      question: "pH值为7的溶液呈？", 
      options: ["酸性", "碱性", "中性", "无法判断"], 
      answer: "中性", 
      type: "选择题",
      analysis: "本题考查pH值与溶液酸碱性的关系。pH值是衡量溶液酸碱性强弱的指标，其范围通常为0-14。当pH值小于7时，溶液呈酸性；当pH值大于7时，溶液呈碱性；当pH值等于7时，溶液呈中性。在常温下，纯水的pH值为7，呈中性。因此正确答案是中性。"
    },
  ],
  生物: [
    { 
      id: 1, 
      question: "人体最大的器官是？", 
      options: ["心脏", "皮肤", "肝脏", "大脑"], 
      answer: "皮肤", 
      type: "选择题",
      analysis: "本题考查人体器官的基本知识。皮肤是人体最大的器官，它覆盖全身，成人的皮肤面积约为1.5-2平方米，重量约占体重的16%。皮肤具有保护身体、调节体温、感受外界刺激、排泄废物等多种功能。心脏是循环系统的核心器官，肝脏是最大的内脏器官，大脑是神经系统的中枢。因此正确答案是皮肤。"
    },
    { 
      id: 2, 
      question: "光合作用的场所是？", 
      options: ["线粒体", "叶绿体", "细胞核", "细胞质"], 
      answer: "叶绿体", 
      type: "选择题",
      analysis: "本题考查植物细胞的细胞器功能。光合作用是绿色植物利用光能将二氧化碳和水转化为有机物，并释放出氧气的过程，这一过程发生在叶绿体中。叶绿体中含有叶绿素等光合色素，是进行光合作用的关键场所。线粒体是进行呼吸作用的场所，细胞核是细胞的控制中心，细胞质是细胞代谢的主要场所。因此正确答案是叶绿体。"
    },
    { 
      id: 3, 
      question: "DNA的中文名称是？", 
      answer: "脱氧核糖核酸", 
      type: "填空题",
      analysis: "本题考查生物大分子的名称。DNA是英文Deoxyribonucleic Acid的缩写，其中文名称是脱氧核糖核酸。它是主要的遗传物质，存在于细胞核中，携带着生物体的遗传信息。DNA与RNA（核糖核酸）的区别在于其所含的五碳糖是脱氧核糖而非核糖。正确答案是脱氧核糖核酸。"
    },
    { 
      id: 4, 
      question: "病毒属于生物？", 
      options: ["是", "不是"], 
      answer: "是", 
      type: "判断题",
      analysis: "本题考查生物的基本特征。生物具有以下基本特征：能够进行新陈代谢、能够生长和繁殖、具有遗传和变异能力等。病毒虽然不能独立生活，必须寄生在活细胞内才能进行生命活动，但它能够利用宿主细胞的物质进行自我复制（繁殖），并具有遗传和变异的特性，因此属于生物。该说法正确。"
    },
    { 
      id: 5, 
      question: "下列哪个是哺乳动物？", 
      options: ["鸡", "蛇", "狗", "青蛙"], 
      answer: "狗", 
      type: "选择题",
      analysis: "本题考查哺乳动物的特征。哺乳动物的主要特征包括：体表被毛、胎生、哺乳、体温恒定等。狗具有这些特征，属于哺乳动物。鸡属于鸟类，蛇属于爬行动物，青蛙属于两栖动物，它们都不具备胎生和哺乳的特征。因此正确答案是狗。"
    },
  ],
  历史: [
    { 
      id: 1, 
      question: "鸦片战争发生在哪个世纪？", 
      options: ["17世纪", "18世纪", "19世纪", "20世纪"], 
      answer: "19世纪", 
      type: "选择题",
      analysis: "本题考查历史事件的时间定位。鸦片战争发生于1840年至1842年，是英国对中国发动的一场侵略战争。世纪的计算方法是：年份的前两位加1，因此1840年属于19世纪（1801-1900年）。鸦片战争是中国近代史的开端，标志着中国开始沦为半殖民地半封建社会。正确答案是19世纪。"
    },
    { 
      id: 2, 
      question: "秦始皇统一中国后使用的文字是？", 
      options: ["甲骨文", "金文", "小篆", "隶书"], 
      answer: "小篆", 
      type: "选择题",
      analysis: "本题考查中国古代文字的演变。秦始皇统一六国后，推行“书同文”的政策，以秦国的小篆作为全国统一的标准文字。甲骨文是商朝时期的文字，刻在龟甲兽骨上；金文是周朝时期的文字，铸刻在青铜器上；隶书起源于秦朝，在汉朝时期盛行。因此正确答案是小篆。"
    },
    { 
      id: 3, 
      question: "二战全面爆发的标志是德国入侵哪个国家？", 
      answer: "波兰", 
      type: "填空题",
      analysis: "本题考查第二次世界大战的爆发标志。1939年9月1日，德国以“闪电战”的方式入侵波兰，随后英国、法国等国家对德国宣战，标志着第二次世界大战全面爆发。德国入侵苏联（1941年）和日本偷袭珍珠港（1941年）是二战规模扩大的标志，而非爆发标志。正确答案是波兰。"
    },
    { 
      id: 4, 
      question: "唐朝的开国皇帝是李世民？", 
      options: ["是", "不是"], 
      answer: "不是", 
      type: "判断题",
      analysis: "本题考查唐朝的建立者。唐朝的开国皇帝是李渊，即唐高祖。公元618年，李渊在长安称帝，建立唐朝。李世民是李渊的次子，通过“玄武门之变”继承皇位，即唐太宗，他开创了“贞观之治”，但并非唐朝的开国皇帝。因此该说法不正确。"
    },
    { 
      id: 5, 
      question: "哥伦布发现新大陆是在哪个年份？", 
      options: ["1492年", "1588年", "1640年", "1776年"], 
      answer: "1492年", 
      type: "选择题",
      analysis: "本题考查新航路开辟的重要事件。1492年，意大利航海家哥伦布在西班牙王室的资助下，率领船队横渡大西洋，到达了美洲的巴哈马群岛，发现了“新大陆”（美洲）。1588年是英国击败西班牙无敌舰队的年份，1640年是英国资产阶级革命开始的年份，1776年是美国《独立宣言》发表的年份。正确答案是1492年。"
    },
  ],
  政治: [
    { 
      id: 1, 
      question: "中华人民共和国成立于哪一年？", 
      options: ["1945年", "1949年", "1956年", "1978年"], 
      answer: "1949年", 
      type: "选择题",
      analysis: "本题考查中华人民共和国的成立时间。1949年10月1日，中华人民共和国开国大典在北京天安门广场举行，标志着新中国的正式成立。1945年是抗日战争胜利的年份，1956年是社会主义改造基本完成的年份，1978年是改革开放开始的年份。因此正确答案是1949年。"
    },
    { 
      id: 2, 
      question: "我国的根本政治制度是？", 
      options: ["人民代表大会制度", "政治协商制度", "民族区域自治制度", "基层群众自治制度"], 
      answer: "人民代表大会制度", 
      type: "选择题",
      analysis: "本题考查我国的政治制度。人民代表大会制度是我国的根本政治制度，它是我国人民当家作主的重要途径和最高实现形式，体现了我国一切权力属于人民的本质。政治协商制度、民族区域自治制度和基层群众自治制度是我国的基本政治制度，而非根本政治制度。因此正确答案是人民代表大会制度。"
    },
    { 
      id: 3, 
      question: "社会主义核心价值观中，国家层面的价值目标是富强、民主、文明和？", 
      answer: "和谐", 
      type: "填空题",
      analysis: "本题考查社会主义核心价值观的内容。社会主义核心价值观分为三个层面：国家层面的价值目标是富强、民主、文明、和谐；社会层面的价值取向是自由、平等、公正、法治；公民个人层面的价值准则是爱国、敬业、诚信、友善。这24个字是社会主义核心价值观的基本内容，需要准确记忆。正确答案是和谐。"
    },
    { 
      id: 4, 
      question: "法律是由国家制定或认可的？", 
      options: ["是", "不是"], 
      answer: "是", 
      type: "判断题",
      analysis: "本题考查法律的基本特征。法律是由国家专门机关（如立法机关）制定或认可的行为规范，这是法律区别于道德、习俗等其他社会规范的重要特征之一。“制定”是指国家机关通过立法活动创制新的法律规范；“认可”是指国家机关赋予某些既存的社会规范（如习惯）以法律效力。因此该说法正确。"
    },
    { 
      id: 5, 
      question: "我国的最高国家权力机关是？", 
      options: ["国务院", "最高法院", "全国人大", "政协"], 
      answer: "全国人大", 
      type: "选择题",
      analysis: "本题考查我国的国家机构。根据我国宪法规定，全国人民代表大会（简称全国人大）是我国的最高国家权力机关，行使国家立法权、决定权、任免权和监督权。国务院是最高国家行政机关，最高法院是最高国家审判机关，政协是中国人民爱国统一战线的组织，不属于国家机关。因此正确答案是全国人大。"
    },
  ],
  地理: [
    { 
      id: 1, 
      question: "世界上最大的洲是？", 
      options: ["亚洲", "非洲", "欧洲", "北美洲"], 
      answer: "亚洲", 
      type: "选择题",
      analysis: "本题考查世界大洲的面积比较。亚洲是世界上面积最大的大洲，面积约4400万平方千米，占世界陆地总面积的29.4%。亚洲不仅面积最大，人口也是最多的，涵盖了多样的地理环境和气候类型。非洲是世界第二大洲，欧洲和北美洲的面积更小。因此正确答案是亚洲。"
    },
    { 
      id: 2, 
      question: "下列哪个是我国的内海？", 
      options: ["黄海", "渤海", "东海", "南海"], 
      answer: "渤海", 
      type: "选择题",
      analysis: "本题考查我国的海域划分。内海是指深入大陆内部，被大陆或岛屿包围，仅通过狭窄水道与大洋相通的海域。渤海是我国的内海，它被辽东半岛和山东半岛所包围，通过渤海海峡与黄海相通。黄海、东海和南海都是我国的边缘海，而非内海。因此正确答案是渤海。"
    },
    { 
      id: 3, 
      question: "世界上最高的山峰是？", 
      answer: "珠穆朗玛峰", 
      type: "填空题",
      analysis: "本题考查世界地形的基本知识。珠穆朗玛峰位于中国与尼泊尔的边境线上，是喜马拉雅山脉的主峰，海拔约8848.86米，是世界上海拔最高的山峰。它被誉为“世界第三极”，因其极高的海拔和恶劣的环境而闻名世界。正确答案是珠穆朗玛峰。"
    },
    { 
      id: 4, 
      question: "赤道是南北半球的分界线？", 
      options: ["是", "不是"], 
      answer: "是", 
      type: "判断题",
      analysis: "本题考查地球的半球划分。赤道是地球表面最大的纬线圈，其纬度为0°。它将地球分为南北两个半球，赤道以北是北半球，赤道以南是南半球。这是国际公认的半球划分标准。因此该说法正确。"
    },
    { 
      id: 5, 
      question: "下列哪个国家是岛国？", 
      options: ["中国", "法国", "日本", "德国"], 
      answer: "日本", 
      type: "选择题",
      analysis: "本题考查国家的地理类型。岛国是指领土完全由岛屿组成，不与大陆相连的国家。日本由北海道、本州、四国、九州四大岛及众多小岛组成，是典型的岛国。中国、法国和德国都位于欧亚大陆上，属于大陆国家（中国是沿海国家，法国和德国也是沿海国家）。因此正确答案是日本。"
    },
  ],
  科学: [
    { 
      id: 1, 
      question: "地球围绕太阳公转一周的时间大约是？", 
      options: ["一天", "一个月", "一年", "一小时"], 
      answer: "一年", 
      type: "选择题",
      analysis: "本题考查地球的公转周期。地球有两种基本运动：自转和公转。地球围绕地轴自西向东旋转称为自转，自转一周的时间约为24小时，即一天；地球围绕太阳自西向东旋转称为公转，公转一周的时间约为365天5小时48分46秒，即一年。地球公转产生了四季更替等现象。因此正确答案是一年。"
    },
    { 
      id: 2, 
      question: "下列哪种属于可再生能源？", 
      options: ["煤炭", "石油", "太阳能", "天然气"], 
      answer: "太阳能", 
      type: "选择题",
      analysis: "本题考查能源的分类。可再生能源是指在自然界中可以不断再生、永续利用的能源，具有取之不尽、用之不竭的特点。太阳能是典型的可再生能源，它来自太阳的辐射能量，不会因使用而减少。煤炭、石油和天然气都是化石能源，它们是古代生物经过漫长的地质年代形成的，属于不可再生能源，储量有限，用完后无法在短时间内再生。因此正确答案是太阳能。"
    },
    { 
      id: 3, 
      question: "声音在空气中的传播速度约为每秒多少米？", 
      answer: "340", 
      type: "计算题",
      analysis: "本题考查声音的传播速度。声音的传播需要介质，在不同的介质中传播速度不同。在1标准大气压、15℃的空气中，声音的传播速度约为340米/秒。这个速度远小于光速（约3×10^8米/秒），这也是我们先看到闪电后听到雷声的原因。正确答案是340。"
    },
    { 
      id: 4, 
      question: "所有的金属都是固体？", 
      options: ["是", "不是"], 
      answer: "不是", 
      type: "判断题",
      analysis: "本题考查金属的物理状态。在常温（25℃）下，大多数金属都是固体，如铁、铜、铝等。但汞（俗称水银）是个例外，它在常温下呈液态，是唯一的液态金属。汞具有银白色的光泽，常温下易挥发，常用于温度计、血压计等仪器中。因此，“所有的金属都是固体”的说法不正确。"
    },
    { 
      id: 5, 
      question: "下列哪个是太阳系中的行星？", 
      options: ["月球", "太阳", "金星", "冥王星"], 
      answer: "金星", 
      type: "选择题",
      analysis: "本题考查太阳系的天体组成。太阳系有八大行星，按距离太阳由近及远依次为：水星、金星、地球、火星、木星、土星、天王星、海王星。金星是太阳系中的第二颗行星，属于类地行星。月球是地球的卫星，太阳是太阳系的中心恒星，冥王星在2006年被重新分类为矮行星，不再被视为行星。因此正确答案是金星。"
    },
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
  const [showPKSummary, setShowPKSummary] = useState(false); 
  // 修复：初始化userAnswers为5个null（对应5道题）
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([null, null, null, null, null]);

  // 科目切换时重置（保持不变）
  useEffect(() => {
    setQuestions(questionBank[subject]);
    resetPK();
  }, [subject]);

  // 倒计时逻辑（保持不变）
  useEffect(() => {
    if (!isPkStarted || isPkFinished || isAnswered) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPkStarted, isPkFinished, isAnswered]);

  // 重置PK状态（保持不变）
  const resetPK = () => {
    setCurrentQuestion(0);
    setUserScore(0);
    setOpponentScore(0);
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setTimer(15);
    setIsPkFinished(false);
    setShowPKSummary(false);
    setUserAnswers([null, null, null, null, null]); // 重置答题记录
  };

  // 开始PK（保持不变）
  const startPK = () => {
    setIsPkStarted(true);
    resetPK();
  };

  // 超时处理（保持不变）
  const handleTimeOut = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    simulateOpponentAnswer();
  };

  // 选择题/判断题点击（保持不变）
  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setUserAnswer(option);
    setIsAnswered(true);
    const isCorrectAnswer = option === questions[currentQuestion].answer;
    setIsCorrect(isCorrectAnswer);
    if (isCorrectAnswer) setUserScore(prev => prev + 10);
    simulateOpponentAnswer();
  };

  // 填空题输入（保持不变）
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  // 填空题提交（保持不变）
  const handleSubmitAnswer = () => {
    if (!userAnswer || isAnswered) return;
    setIsAnswered(true);
    const isCorrectAnswer = userAnswer === questions[currentQuestion].answer;
    setIsCorrect(isCorrectAnswer);
    if (isCorrectAnswer) setUserScore(prev => prev + 10);
    simulateOpponentAnswer();
  };

  // 模拟对手答题（保持不变）
  const simulateOpponentAnswer = () => {
    setTimeout(() => {
      const opponentCorrect = Math.random() > 0.3;
      if (opponentCorrect) setOpponentScore(prev => prev + 10);
    }, 1000);
  };

  // 下一题逻辑：最后一题点击"查看结果"后自动跳转解析
  const handleNextQuestion = () => {
    if (currentQuestion >= 4) {
      setIsPkFinished(true);
      // 核心修改1：删除延迟，点击"查看结果"后立即显示解析
      setShowPKSummary(true); 
      return;
    }
    setCurrentQuestion(prev => prev + 1);
    setUserAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setTimer(15);
  };

  // 渲染题目（保持不变）
  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === "选择题" || question.type === "判断题") {
      return (
        <div className="grid gap-4 mt-6 w-full max-w-3xl mx-auto">
          {question.options?.map((option) => (
            <button
              key={option}
              className={`px-6 py-4 rounded-lg text-left transition-all duration-200 text-lg font-normal w-full ${
                isAnswered 
                  ? option === question.answer 
                    ? "bg-gray-100 border-gray-600 text-gray-800 border-2" 
                    : userAnswer === option 
                      ? "bg-gray-200 border-gray-400 text-gray-600 border-2"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  : "bg-white border border-gray-300 hover:border-gray-500 hover:bg-gray-50"
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
        <div className="mt-6 w-full max-w-2xl mx-auto">
          <input
            type="text"
            className="w-full px-6 py-4 border-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg"
            value={userAnswer || ''}
            onChange={handleInputChange}
            placeholder="请输入答案"
            disabled={isAnswered}
          />
          <button
            className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 text-base w-full"
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

  // 渲染答题结果（保持不变）
  const renderAnswerResult = () => {
    if (!isAnswered) return null;
    return (
      <div className="mt-6 p-6 rounded-lg mb-6 border border-gray-200 w-full max-w-2xl mx-auto">
        <div className={`text-center font-medium text-xl ${
          isCorrect ? 'text-gray-800 font-semibold' : 'text-gray-600'
        }`}>
          {isCorrect ? '回答正确！+10分' : `回答错误！正确答案是：${questions[currentQuestion].answer}`}
        </div>
        <div className="text-center text-gray-500 mt-3 text-base">
          对手得分: {opponentScore - (isPkFinished ? 0 : 10)} → {opponentScore}
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-700 text-base">
          <div className="font-semibold mb-1 text-gray-800">题目解析</div>
          <div>{questions[currentQuestion].analysis}</div>
          {!isCorrect && (
            <div className="mt-2 text-red-600 font-medium">你的答案：{userAnswer ?? "未作答"}（错误）</div>
          )}
        </div>
        {/* 下一题/查看结果按钮：使用统一黑底白字样式 */}
        <button
          className="mt-5 w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
          onClick={handleNextQuestion}
        >
          {currentQuestion >= 4 ? '查看结果' : '下一题'}
        </button>
      </div>
    );
  };

  // 渲染PK解析与纠错（按钮样式统一）
  const renderPKSummary = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 w-[90vw] max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">PK解析与纠错</h2>
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-8 border-b border-gray-100 pb-6">
            <div className="text-lg font-medium text-gray-800 mb-2">
              {`第${idx + 1}题：${q.question}`}
            </div>
            <div className="flex flex-wrap gap-3 items-center mb-2">
              {q.options && q.options.map(opt => (
                <span key={opt}
                      className={`px-3 py-1 rounded-lg text-base
                        ${opt === q.answer ? "bg-green-100 text-green-700 font-bold" : "bg-gray-100 text-gray-600"}
                      `}>
                  {opt}
                </span>
              ))}
            </div>
            <div className="text-base text-gray-700 mb-2">
              <span className="font-semibold">正确答案：</span>
              <span className="text-green-600 font-bold">{q.answer}</span>
            </div>
            <div className="text-base text-gray-700 mb-2">
              <span className="font-semibold">你的答案：</span>
              <span className={q.answer === (userAnswers[idx] ?? "") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {typeof userAnswers[idx] === "string" ? userAnswers[idx] : "未作答"}
              </span>
              {q.answer !== (userAnswers[idx] ?? "") && <span className="ml-2 text-red-500">（错误）</span>}
            </div>
            <div className="bg-gray-50 rounded p-3 mt-2">
              <span className="font-semibold text-gray-800">解析：</span>
              <span className="text-gray-700">{q.analysis}</span>
            </div>
          </div>
        ))}
        {/* 核心修改2：统一按钮样式（黑底白字+悬浮白底黑字） */}
        <button
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
          onClick={() => setShowPKSummary(false)}
        >
          返回结果页
        </button>
      </div>
    );
  };

  // 记录每题用户答案（保持不变）
  useEffect(() => {
    if (!isAnswered) return;
    setUserAnswers(prev => {
      const newArr = [...prev];
      newArr[currentQuestion] = userAnswer ?? null;
      return newArr;
    });
    // eslint-disable-next-line
  }, [isAnswered]);

  // 渲染PK结果：统一三个按钮样式
  const renderPKResult = () => {
    const isWinner = userScore > opponentScore;
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg w-[90vw] max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isWinner ? '恭喜你获胜！' : userScore === opponentScore ? '平局！' : '很遗憾，你输了！'}
        </h2>
        <div className="flex justify-center items-center gap-8 mb-8">
          <div>
            <p className="text-gray-600">你的得分</p>
            <p className="text-3xl font-bold text-gray-800">{userScore}</p>
          </div>
          <div className="text-2xl font-bold text-gray-700">VS</div>
          <div>
            <p className="text-gray-600">对手得分</p>
            <p className="text-3xl font-bold text-gray-800">{opponentScore}</p>
          </div>
        </div>
        <div className="flex gap-4">
          {/* 核心修改3：统一三个按钮样式（黑底白字+悬浮切换） */}
          <button
            className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
            onClick={startPK}
          >
            再来一局
          </button>
          <button
            className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
            onClick={() => navigate('/student-dashboard')}
          >
            返回
          </button>
          <button
            className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
            onClick={() => setShowPKSummary(true)}
          >
            查看解析
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      {/* 顶部导航（保持不变） */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm shadow-sm py-4 px-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/student-dashboard')}
          className="text-gray-700 hover:text-gray-900 transition-colors text-base"
        >
          ← 返回
        </button>
        <h1 className="text-xl font-bold text-gray-800">知识PK对战</h1>
        <div className="w-6"></div>
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 w-full">
        {!isPkStarted ? (
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90vw] max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">准备开始PK</h2>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">选择科目</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-base"
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
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
              <h3 className="font-medium mb-2 text-gray-800">PK规则</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 每轮PK将随机抽取5道题目</li>
                <li>• 每道题有15秒答题时间</li>
                <li>• 答对一题得10分</li>
                <li>• 得分高者获胜</li>
              </ul>
            </div>
            {/* 开始挑战按钮：统一样式 */}
            <button
              onClick={startPK}
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:border border-black transition-all duration-200 text-base font-medium"
            >
              开始挑战
            </button>
          </div>
        ) : showPKSummary ? (
          renderPKSummary()
        ) : isPkFinished ? (
          renderPKResult()
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90vw] max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">你的得分</p>
                <p className="text-2xl font-bold text-gray-800">{userScore}</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-2 border border-gray-200">
                  <img src="https://tongque.ocybers.com/img/logo.jpg" alt="你的头像" className="w-full h-full object-cover" />
                </div>
                <span className="font-medium text-gray-700">VS</span>
                <div className="w-12 h-12 rounded-full overflow-hidden ml-2 border border-gray-200">
                  <img src={opponentData.avatar} alt={opponentData.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">{opponentData.name}</p>
                <p className="text-2xl font-bold text-gray-800">{opponentScore}</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">题目 {currentQuestion + 1}/5</span>
                <span className={`font-medium ${timer <= 5 ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                  剩余时间: {timer}秒
                </span>
              </div>
              <progress
                value={currentQuestion + 1}
                max="5"
                className="w-full h-2 bg-gray-200 rounded-full"
              />
            </div>
            <div className="mb-6 text-center">
              <h3 className="text-xl font-medium text-gray-800">{questions[currentQuestion].question}</h3>
            </div>
            {renderQuestion()}
            {renderAnswerResult()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PkPage;