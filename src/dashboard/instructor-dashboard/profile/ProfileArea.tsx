"use client";
import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner";
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar";
import ProfileContent from "./ProfileContent";

const ProfileArea = () => {

  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <DashboardBanner />
        <div className="row">
          <DashboardSidebar />
          <ProfileContent />
        </div>
      </div>
    </section>
  );
};

export default ProfileArea;
