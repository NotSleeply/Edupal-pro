
type CourseCardProps = {
  title: string;
  teacher: string;
  niandu: string;
  image: string;
};

export const CourseCard = ({
  title,
  teacher,
  niandu,
  image,
}: CourseCardProps) => (
  <div className="bg-card text-card-foreground rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
    <div
      className="h-40 bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-1">教师: {teacher}</p>
      <p className="text-sm text-muted-foreground">{niandu}</p>
    </div>
  </div>
);

type MyCoursesProps = {
  courses: CourseCardProps[];
};

const MyCourses = ({ courses }: MyCoursesProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {courses.map((course, idx) => (
      <CourseCard key={idx} {...course} />
    ))}
  </div>
);

export type { CourseCardProps };
export default MyCourses;