"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Correct import for Next.js navigation in client components
import { RootState } from "@/redux/store";
import { UserDetails } from "@/data/dashboard-data/UserData";
import { initializeToken } from "@/redux/features/authSlice";

const SingleArticleContent = () => {
   const [article, setArticle] = useState<any>(null); // State to store the fetched article
   const [error, setError] = useState<string | null>(null); // State to store error messages
   const [isMounted, setIsMounted] = useState(false); // To check if the component is mounted
   const dispatch = useDispatch();
   const router = useRouter(); // Access the router for article ID

   const userDetails = useSelector(
      (state: RootState) => state.auth.user
   ) as UserDetails | null;

   // Ensure component is mounted before accessing useRouter
   useEffect(() => {
      if (typeof window !== "undefined") {
         setIsMounted(true); // Mark component as mounted
         dispatch(initializeToken());
      }
   }, [dispatch]);

   useEffect(() => {
      if (isMounted) {
         const articleId = new URLSearchParams(window.location.search).get("articleId"); // Get article ID from query
         if (articleId) {
            fetchArticleById(articleId); // Fetch the article when ID is available
         }
      }
   }, [isMounted]); // Depend on isMounted to fetch article after component mounts

   const fetchArticleById = async (id: string) => {
      try {
         const response = await fetch(`http://localhost:3000/api/article/fetchArticle`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ articleID: id }), // Pass the article ID
         });

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();
         console.log("Fetched article data:", data); // Log data for debugging
         setArticle(data); // Update state with the fetched article
      } catch (error) {
         console.error("Error fetching article:", error);
         setError("Error fetching article. Please try again later.");
      }
   };

   if (error) {
      return <p className="error-message">{error}</p>;
   }

   if (!article) {
      return <p>Loading...</p>; // Loading state
   }

   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap dashboard__content-wrap-two">
            <div className="dashboard__content-title">
               <h4 className="title">Article Details</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="article__details-wrap mb-40">
                     <div className="article__item article__item-two shine__animate-item">
                        <div className="article__item-thumb article__item-thumb-two">
                           <Link href={`/article-details/${article._id}`} className="shine__animate-link">
                              {article.fileName ? (
                                 <Image
                                    src={`/uploads/articlethumb/${article.fileName}`}
                                    alt={article.title}
                                    width={800}
                                    height={400}
                                    layout="responsive"
                                 />
                              ) : (
                                 <Image
                                    src="/default-image.png"
                                    alt="Default image"
                                    width={800}
                                    height={400}
                                    layout="responsive"
                                 />
                              )}
                           </Link>
                        </div>
                        <div className="article__item-content article__item-content-two">
                           <ul className="article__item-meta list-wrap">
                              <li className="article__item-tag">
                                 <Link href={`/article-category/${article.category}`}>{article.category}</Link>
                              </li>
                           </ul>
                           <h5 className="title">
                              <Link href={`/article-details/${article._id}`}>{article.title}</Link>
                           </h5>
                           <p className="description">{article.description}</p>
                           <p className="author">
                              By <Link href="#">{userDetails?.fname} {userDetails?.lname}</Link>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SingleArticleContent;
