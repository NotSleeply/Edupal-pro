import type { CourseCardProps } from "../components/courses";

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

export { defaultCourses, randomImg, randomTeacher, randomName };