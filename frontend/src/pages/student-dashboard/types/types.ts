type QuestionType = {
  id: number;
  question: string;
  options?: string[];
  answer: string;
  type: string;
  analysis: string;
};

type OpponentType = {
  name: string;
  avatar: string;
  title: string;
  description: string;
};

type CourseCardProps = {
  id: number;
  title: string;
  teacher: string;
  niandu: string;
  image: string;
};

interface GradeItem {
  id: number;
  name: string;
  score: number;
  rank: number;
}

export type { QuestionType, OpponentType, CourseCardProps, GradeItem };