import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner";
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar";
import AuthorSettingContent from "./AuthorSettingContent";

const AuthorSettingArea = () => {
  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <DashboardBanner />
        <div className="row">
          <DashboardSidebar />
          <AuthorSettingContent />
        </div>
      </div>
    </section>
  );
};

export default AuthorSettingArea;
