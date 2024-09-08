import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import LoginArea from "./LoginArea";
import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo";

const Login = () => {
  return (
    <>
      <HeaderOne />
      <main className="main-area fix">
        <BreadcrumbTwo title="User Login" sub_title="Login" />
        <LoginArea />
      </main>
      <FooterOne />
    </>
  );
};

export default Login;
