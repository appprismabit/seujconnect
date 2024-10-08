import DashboardBreadcrumb from "@/components/common/breadcrumb/DashboardBreadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import ProfileArea from "./ProfileArea";

const AuthorProfile = () => {
  return (
    <>
      <HeaderOne />
      <main className="main-area fix">
        <DashboardBreadcrumb />
        <ProfileArea />
      </main>
      <FooterOne />
    </>
  );
};

export default AuthorProfile;
