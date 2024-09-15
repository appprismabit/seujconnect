import DashboardBreadcrumb from '@/components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import SingleArticleArea from './singleArticlearea'

const SingleArticle = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <SingleArticleArea />
         </main>
         <FooterOne />
      </>
   )
}
export default SingleArticle