import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner"
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar"
import AuthorArticlesContent from "./AuthorArticleContent"

const AuthorArticleArea = ({style}:any) => {

  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <DashboardBanner />
        <div className="row">
          <DashboardSidebar />
          <AuthorArticlesContent style={style} />
        </div>
      </div>
    </section>
  )
}

export default AuthorArticleArea
