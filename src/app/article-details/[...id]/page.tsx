import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import CourseDetailsArea from "@/components/courses/article-details/CourseDetailsArea";
import courses_data from "@/data/inner-data/InnerCourseData";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import ArticleArea from "@/components/homes/home-one/ArticleArea";

export const metadata = {
   title: "Course Details SkillGro - Online Courses & Education React Next js Template",
};

const Index = ({ params }: { params: { id: string } }) => {
   const articles = courses_data; // Use the actual data source for courses
   const single_course = articles.find((item) => item._id === params.id); // Ensure params.id matches the type

   return (
      <Wrapper>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Course Details" sub_title="Course Details" />
            {single_course ? (
               <CourseDetailsArea single_course={single_course} />
            ) : (
               <p>Course not found.</p>
            )}
         </main>
         <FooterOne />
      </Wrapper>
   );
};

export default Index;
