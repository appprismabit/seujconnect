"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UserDetails } from "@/data/dashboard-data/UserData";
import { initializeToken } from "@/redux/features/authSlice";

const enrolled_courses = ["My Articles", "Active Articles", "Completed Courses"];
const my_courses = ["Publish", "Pending", "Draft"];

const setting = {
   slidesPerView: 3,
   spaceBetween: 30,
   observer: true,
   observeParents: true,
   loop: true,
   breakpoints: {
      "1500": { slidesPerView: 3 },
      "1200": { slidesPerView: 3 },
      "992": { slidesPerView: 2, spaceBetween: 24 },
      "768": { slidesPerView: 2, spaceBetween: 24 },
      "576": { slidesPerView: 1.5 },
      "0": { slidesPerView: 1 },
   },
};

const AuthorArticlesContent = ({ style }: any) => {
   const [activeTab, setActiveTab] = useState(0);
   const [articles, setArticles] = useState<any[]>([]); // State to store fetched articles
   const [error, setError] = useState<string | null>(null); // State to store error messages
   const dispatch = useDispatch();
   const userDetails = useSelector((state: RootState) => state.auth.user) as UserDetails | null;

   useEffect(() => {
      if (typeof window !== "undefined") {
         dispatch(initializeToken());
         fetchArticles();
      }
   }, [dispatch]);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   const fetchArticles = async () => {
      const storedToken = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('token', storedToken || '');

      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
         const response = await fetch(`${apiUrl}api/article/fetchArticleByUserId`, {
            method: "POST",
            body: formData,
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const responseData = await response.json();
         
         if (responseData.status === 201) {
            setArticles([responseData.data]); // Set articles array with the fetched data
         } else {
            setError("No articles found."); // Handle case where no articles are returned
         }
      } catch (error) {
         console.error("Error fetching articles:", error);
         setError("Error fetching articles. Please try again later.");
      }
   };

   const tab_title = style ? my_courses : enrolled_courses;

   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap dashboard__content-wrap-two">
            <div className="dashboard__content-title">
               <h4 className="title">{style ? "My Courses" : "Enrolled Courses"}</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="dashboard__nav-wrap mb-40">
                     <ul className="nav nav-tabs" id="courseTab" role="tablist">
                        {tab_title.map((tab, index) => (
                           <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                              <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="tab-content" id="courseTabContent">
                     {error ? (
                        <p className="error-message">{error}</p>
                     ) : (
                        <div className="tab-pane fade show active" role="tabpanel">
                           <Swiper
                              {...setting}
                              modules={[Navigation]}
                              className="swiper dashboard-courses-active"
                           >
                              {articles.map((article) => (
                                 <SwiperSlide key={article._id} className="swiper-slide">
                                    <div className="courses__item courses__item-two shine__animate-item">
                                       <div className="courses__item-thumb courses__item-thumb-two">
                                          <Link href={`/article-details?articleId=${article._id}`} className="shine__animate-link">
                                             {article.fileName ? (
                                                <Image
                                                   src={`/uploads/articlethumb/${article.fileName}`}
                                                   alt={article.title}
                                                   width={300}
                                                   height={200}
                                                   layout="responsive"
                                                />
                                             ) : (
                                                <Image
                                                   src="/default-image.png"
                                                   alt="Default image"
                                                   width={300}
                                                   height={200}
                                                   layout="responsive"
                                                />
                                             )}
                                          </Link>
                                       </div>
                                       <div className="courses__item-content courses__item-content-two">
                                          <ul className="courses__item-meta list-wrap">
                                             <li className="courses__item-tag">
                                                <Link href={`/article-category/${article.category}`}>{article.category}</Link>
                                             </li>
                                          </ul>
                                          <h5 className="title">
                                             <Link href={`/article-details?articleId=${article._id}`}>{article.title}</Link>
                                          </h5>
                                          <p className="description">{article.description}</p>
                                          <p className="author">
                                             By <Link href="#">{userDetails?.fname} {userDetails?.lname}</Link>
                                          </p>
                                       </div>
                                    </div>
                                 </SwiperSlide>
                              ))}
                           </Swiper>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AuthorArticlesContent;
