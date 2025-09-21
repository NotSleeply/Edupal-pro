// 预设的模拟题目库
const mockQuestionBank = {
  数学: {
    选择题: [
      {
        content: "鸡兔同笼，共有头35个，脚94只，鸡有多少只？",
        options: ["A. 12", "B. 23", "C. 17", "D. 18"],
        answer: "B",
        explanation: "设鸡有x只，兔有y只。x + y = 35，2x + 4y = 94，解得x=23，y=12。"
      },
      {
        content: "鸡兔同笼，共有头20个，脚54只，鸡有多少只？",
        options: ["A. 7", "B. 13", "C. 10", "D. 15"],
        answer: "B",
        explanation: "设鸡有x只，兔有y只。x + y = 20，2x + 4y = 54，解得x=13，y=7。"
      },
      {
        content: "鸡兔同笼，共有头40个，脚110只，鸡有多少只？",
        options: ["A. 15", "B. 25", "C. 20", "D. 30"],
        answer: "B",
        explanation: "设鸡有x只，兔有y只。x + y = 40，2x + 4y = 110，解得x=25，y=15。"
      },
      {
        content: "鸡兔同笼，共有头50个，脚140只，鸡有多少只？",
        options: ["A. 20", "B. 30", "C. 35", "D. 40"],
        answer: "B",
        explanation: "设鸡有x只，兔有y只。x + y = 50，2x + 4y = 140，解得x=30，y=20。"
      }
    ],
    判断题: [
      {
        content: "所有半径相等的圆面积都相等。",
        options: ["正确", "错误"],
        answer: "正确",
        explanation: "圆的面积只与半径有关，半径相等面积必相等。"
      },
      {
        content: "圆的周长等于直径乘以π。",
        options: ["正确", "错误"],
        answer: "正确",
        explanation: "圆的周长公式为C = 2πr = πd。"
      }
    ],
    计算题: [
      {
        content: "计算：(3x + 2)(2x - 1) = ?",
        options: [],
        answer: "6x² + x - 2",
        explanation: "(3x + 2)(2x - 1) = 3x×2x + 3x×(-1) + 2×2x + 2×(-1) = 6x² - 3x + 4x - 2 = 6x² + x - 2"
      },
      {
        content: "解方程：2x + 5 = 13",
        options: [],
        answer: "x = 4",
        explanation: "2x + 5 = 13，两边减去5得：2x = 8，两边除以2得：x = 4"
      }
    ],
    填空题: [
      {
        content: "勾股定理的表达式是：a² + b² = ____",
        options: [],
        answer: "c²",
        explanation: "勾股定理表明，直角三角形中，两直角边的平方和等于斜边的平方，即a² + b² = c²。"
      },
      {
        content: "已知直角三角形的两直角边分别为3和4，则斜边为____",
        options: [],
        answer: "5",
        explanation: "根据勾股定理，斜边c = √(3² + 4²) = √(9 + 16) = √25 = 5。"
      },
      {
        content: "若直角三角形的斜边为13，一条直角边为5，则另一条直角边为____",
        options: [],
        answer: "12",
        explanation: "设另一条直角边为b，则b² = 13² - 5² = 169 - 25 = 144，b = 12。"
      },
      {
        content: "已知直角三角形的两直角边分别为a和b，斜边为c，则有a² + ____ = c²",
        options: [],
        answer: "b²",
        explanation: "勾股定理的标准表达式为a² + b² = c²。"
      },
      {
        content: "已知直角三角形的斜边为10，一条直角边为6，则另一条直角边为____",
        options: [],
        answer: "8",
        explanation: "设另一条直角边为b，则b² = 10² - 6² = 100 - 36 = 64，b = 8。"
      }
    ]
  },
  物理: {
    选择题: [
      {
        content: "光在真空中的传播速度约为多少？",
        options: ["A. 3×10⁶ m/s", "B. 3×10⁷ m/s", "C. 3×10⁸ m/s", "D. 3×10⁹ m/s"],
        answer: "C",
        explanation: "光在真空中的传播速度是一个物理常数，约为3×10⁸米每秒。"
      },
      {
        content: "牛顿第一定律又称为什么定律？",
        options: ["A. 动量定律", "B. 惯性定律", "C. 作用力定律", "D. 能量定律"],
        answer: "B",
        explanation: "牛顿第一定律描述了物体的惯性特征，因此又称为惯性定律。"
      }
    ],
    判断题: [
      {
        content: "物体的重力和质量成正比。",
        options: ["正确", "错误"],
        answer: "正确",
        explanation: "根据万有引力定律，重力G = mg，其中g是重力加速度，重力与质量成正比。"
      }
    ],
    计算题: [
      {
        content: "一个质量为2kg的物体，受到10N的水平推力，求其加速度。",
        options: [],
        answer: "a = 5 m/s²",
        explanation: "根据牛顿第二定律 F = ma，所以 a = F/m = 10N/2kg = 5 m/s²"
      }
    ],
    填空题: [
      {
        content: "欧姆定律的表达式是：U = ____",
        options: [],
        answer: "IR",
        explanation: "欧姆定律表明电压等于电流乘以电阻，即U = IR。"
      }
    ]
  },
  化学: {
    选择题: [
      {
        content: "水的化学分子式是什么？",
        options: ["A. HO", "B. H₂O", "C. H₂O₂", "D. HO₂"],
        answer: "B",
        explanation: "水分子由两个氢原子和一个氧原子组成，分子式为H₂O。"
      }
    ],
    判断题: [
      {
        content: "酸性溶液的pH值小于7。",
        options: ["正确", "错误"],
        answer: "正确",
        explanation: "pH值小于7表示溶液呈酸性，等于7为中性，大于7为碱性。"
      }
    ],
    计算题: [
      {
        content: "计算0.1mol NaCl的质量（Na=23, Cl=35.5）",
        options: [],
        answer: "5.85g",
        explanation: "NaCl的摩尔质量 = 23 + 35.5 = 58.5 g/mol，所以0.1mol × 58.5 g/mol = 5.85g"
      }
    ],
    填空题: [
      {
        content: "氢气燃烧的化学方程式：2H₂ + O₂ → ____",
        options: [],
        answer: "2H₂O",
        explanation: "氢气燃烧产生水，反应方程式为：2H₂ + O₂ → 2H₂O"
      }
    ]
  }
};

export  { mockQuestionBank };