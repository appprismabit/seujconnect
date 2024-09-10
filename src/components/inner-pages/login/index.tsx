"use client";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import LoginArea from "./LoginArea";
import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/author-dashboard");
    }
  }, [router]);
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
