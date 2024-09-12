import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner";
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar";
import ArticleForm from "@/forms/ArticleForm";
import Link from "next/link";

const ArticleArea = () => {
  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <DashboardBanner />
        <div className="row">
          <DashboardSidebar />
          <div className="col-lg-9">
            <div className="dashboard__content-wrap">
              <div className="dashboard__content-title">
                <h6 className="title text-info">
                  <i className="fa fa-hand-point-right"></i> Please provide the
                  following initial details of your article
                </h6>
              </div>
              <div className="row">
                <div className="col-12">
                  <ArticleForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleArea;
