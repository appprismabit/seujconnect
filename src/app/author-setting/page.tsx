"use client";
import AuthorSetting from "@/dashboard/instructor-dashboard/author-setting";
import Wrapper from "@/layouts/Wrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const index = () => {
   
   return (
      <Wrapper>
         <AuthorSetting />
      </Wrapper>
   )
}

export default index