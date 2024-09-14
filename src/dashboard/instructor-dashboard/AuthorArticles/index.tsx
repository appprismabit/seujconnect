import DashboardBreadcrumb from '@/components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import AuthorArticleArea from './AuthorArticleArea'

const AuthorArticles = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <AuthorArticleArea />


         </main>
         <FooterOne />
      </>
   )
}

export default AuthorArticles
