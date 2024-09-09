import DashboardBreadcrumb from "@/components/common/breadcrumb/DashboardBreadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import AuthorSettingArea from "./AuthorSettingArea";

const AuthorSetting = () => {
  return (
    <>
      <HeaderOne />
      <main className="main-area fix">
        <DashboardBreadcrumb />
        <AuthorSettingArea />
      </main>
      <FooterOne />
    </>
  );
};

export default AuthorSetting;
