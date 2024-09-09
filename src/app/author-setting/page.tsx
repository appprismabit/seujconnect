"use client";
import AuthorSetting from "@/dashboard/instructor-dashboard/author-setting";
import Wrapper from "@/layouts/Wrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const index = () => {
   const router = useRouter();

   useEffect(() => {
     const token = localStorage.getItem("token");
     // Redirect to login if token is not found
     if (!token) {
       router.push("/login"); // Change to the login route of your app
     }
   }, [router]);
   return (
      <Wrapper>
         <AuthorSetting />
      </Wrapper>
   )
}

export default index