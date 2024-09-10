import DashboardBreadcrumb from "@/components/common/breadcrumb/DashboardBreadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import ArticleArea from "./ArticleArea";

const ArticleAdd = () => {
  return (
    <>
      <HeaderOne />
      <main className="main-area fix">
        <DashboardBreadcrumb />
        <ArticleArea />
      </main>
      <FooterOne />
    </>
  );
};

export default ArticleAdd;
