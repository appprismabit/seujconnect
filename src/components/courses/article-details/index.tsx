"use client";
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import CourseDetailsArea from "./CourseDetailsArea"
import BreadcrumbTwo from "@/components/common/breadcrumb/BreadcrumbTwo"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum";
import Reviews from "./Reviews";
import Instructors from "./Instructors";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ArticleContent from "./ArticleContent";

const CourseDetails =({ single_course }: any) => {
   const searchParams = useSearchParams();

   const [articleId, setArticleId] = useState<string | undefined>(undefined);
   
   const [articles, setArticleSingle] = useState<any[]>([]);
   useEffect(() => {
     const id = searchParams.get('id');
     setArticleId(id ?? undefined);
     fetchArticlesDetails(id ?? undefined);
   }, [searchParams]);
   
   const fetchArticlesDetails = async (id: string | undefined) => {
     const formData = new FormData();
     if (id) {
       formData.append('articleId', id);
       try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         const response = await fetch(`${apiUrl}api/article/fetchSingleArticle`, {
           method: "POST",
           body: formData,
         });
         if (!response.ok) {
           throw new Error('Network response was not ok');
         }
 
         const result = await response.json();
         setArticleSingle(result.data);
        
       
       } catch (error) {
         console.error(error);
       }
     }
   };


   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            {/* <BreadcrumbTwo title={articles[0]?.title} sub_title="Article" /> */}
          <CourseDetailsArea article = {articles} fetchArticles={fetchArticlesDetails}/>
          
         </main>
         <FooterOne />
      </>
   )
}

export default CourseDetails
/*
Mir Kashem Ali 
Kabyashree Buragohain
*/