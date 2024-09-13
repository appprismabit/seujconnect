"use client";
import ArticleAdd from "@/dashboard/instructor-dashboard/article-add";
import Wrapper from "@/layouts/Wrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const index = () => {
  
  return (
    <Wrapper>
      <ArticleAdd />
    </Wrapper>
  );
};

export default index;
