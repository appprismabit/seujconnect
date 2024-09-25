import CourseDetails from "@/components/courses/article-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Course Details SkillGro - Online Courses & Education React Next js Template",
};
const page = () => {
   return (
      <Wrapper>
         <CourseDetails />
      </Wrapper>
   )
}

export default page