"use client"; // Required for Next.js client-side components
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For router navigation
import Image from "next/image"; // For image rendering
import Link from "next/link"; // For links

const SingleArticleContent = () => {
   const [article, setArticle] = useState<any>(null); // State to store the fetched article
   const [error, setError] = useState<string | null>(null); // State to store error messages
   const [isLoading, setIsLoading] = useState(true); // Loading state

   const router = useRouter(); // Access the router for query params

   // Fetch the article ID from the URL when the component mounts
   useEffect(() => {
      // Check if window object is available (client-side)
      if (typeof window !== "undefined") {
         const articleId = new URLSearchParams(window.location.search).get("articleId"); // Get articleId from URL
         if (articleId) {
            fetchArticleById(articleId);
         } else {
            setError("Article ID not found in URL.");
         }
      }
   }, []);

   // Fetch the article from the API
   const fetchArticleById = async (id: string) => {
      try {
         const response = await fetch(`http://localhost:3000/api/article/fetchSingleArticle`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ articleID: id }),
         });
   
         console.log("API Response:", response); // Log the response
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
   
         const { data } = await response.json();
         console.log("Fetched article data:", data);
         if (data.length > 0) {
            setArticle(data[0]);
         } else {
            setError("No article found.");
         }
      } catch (error) {
         console.error("Error fetching article:", error);
         setError("Error fetching article. Please try again later.");
      } finally {
         setIsLoading(false);
      }
   };
   

   // Handle loading state
   if (isLoading) {
      return <p>Loading...</p>;
   }

   // Handle error state
   if (error) {
      return <p className="error-message">{error}</p>;
   }

   // Handle case where no article is found
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
                           {/* Show image if available, otherwise default */}
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
                                 {/* Link to article category */}
                                 <Link href={`/article-category/${article.category}`}>{article.category}</Link>
                              </li>
                           </ul>
                           {/* Display article title */}
                           <h5 className="title">
                              {article.title}
                           </h5>
                           {/* Display article description */}
                           <p className="description">{article.description}</p>
                           {/* Show additional article information if available */}
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
