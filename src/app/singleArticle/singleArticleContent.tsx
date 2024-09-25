"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const SingleArticleContent = () => {
   const [article, setArticle] = useState<any>(null);
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const articleId = "66e5708fb5ee6c28c92fff57";
   useEffect(() => {
      if (articleId) {
         fetchArticleById(articleId);
      } else {
         setError("Article ID not found.");
         setIsLoading(false);
      }
   }, [articleId]);
   const fetchArticleById = async (id: string) => {
      try {
         const response = await fetch(`http://localhost:3000/api/article/fetchSingleArticle`, {
            method: "POST",
            headers: {
               "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
               articleId: id,
            }).toString(),
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const resultText = await response.text();
         const result = JSON.parse(resultText);

         console.log("Fetched article data:", result); // Log the full response

         if (result.success && result.data.length > 0) {
            console.log("Article data:", result.data[0]); // Log the article itself
            setArticle(result.data[0]); // Ensure you're accessing the correct data structure
         } else {
            setError(result.message || "No article found.");
         }
      } catch (error: any) {
         console.error("Error fetching article:", error.message);
         setError("Error fetching article. Please try again later.");
      } finally {
         setIsLoading(false);
      }
   };




   if (isLoading) {
      return <p>Loading...</p>;
   }
   if (error) {
      return <p className="error-message">{error}</p>;
   }
   if (!article) {
      return <p>No article found.</p>;
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
                           {article.fileName && article.fileName !== "AR-THundefined.jpg" ? (
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

                        </div>
                        <div className="article__item-content article__item-content-two">
                           <ul className="article__item-meta list-wrap">
                              <li className="article__item-tag">
                                 <Link href={`/article-category/${article.category}`}>
                                    {article.category}
                                 </Link>
                              </li>
                           </ul>
                           <h5 className="title">{article.title}</h5>
                           <p className="description">{article.description}</p>
                           <p className="created-at">
                              Created on: {new Date(article.createdAt).toLocaleDateString()}
                           </p>
                           <p className="updated-at">
                              Last updated: {new Date(article.updatedAt).toLocaleDateString()}
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