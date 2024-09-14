import DashboardBreadcrumb from '@/components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import InstructorEnrolledCourseArea from '../AuthorArticles/AuthorArticleArea'

const InstructorCourses = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorEnrolledCourseArea style={true} />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorCourses
