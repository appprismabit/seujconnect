"use client";
import ArticleAdd from "@/dashboard/instructor-dashboard/article-add";
import Wrapper from "@/layouts/Wrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <Wrapper>
      <ArticleAdd />
    </Wrapper>
  );
};

export default index;
