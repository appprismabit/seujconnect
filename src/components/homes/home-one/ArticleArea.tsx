"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Tab titles for different article categories
const tab_title: string[] = [
  "All Articles",
  "Most Viewed",
  "Most Loved",
  "Informative",
];

// Swiper slider settings
const setting = {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 30,
  observer: true,
  observeParents: true,
  autoplay: false,
  navigation: {
    nextEl: ".courses-button-next",
    prevEl: ".courses-button-prev",
  },
  breakpoints: {
    "1500": { slidesPerView: 4 },
    "1200": { slidesPerView: 4 },
    "992": { slidesPerView: 3, spaceBetween: 24 },
    "768": { slidesPerView: 2, spaceBetween: 24 },
    "576": { slidesPerView: 1 },
    "0": { slidesPerView: 1 },
  },
};

const ArticleArea = ({ style }: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const [articles, setArticles] = useState([]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Function to fetch articles from the API
  const fetchArticles = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}api/article/fetchAllArticle`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
     
      setArticles(data.data); // Update state with the fetched articles
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <section
      className={`courses-area`}
      style={{ backgroundImage: `url(/assets/img/bg/courses_bg.jpg)` }}
    >
      <div className="container">
        <div className="section__title-wrap">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section__title text-center mb-40"></div>
              <div className="courses__nav">
                <ul className="nav nav-tabs" id="courseTab" role="tablist">
                  {tab_title.map((tab, index) => (
                    <li
                      key={index}
                      onClick={() => handleTabClick(index)}
                      className="nav-item"
                      role="presentation"
                    >
                      <button
                        className={`nav-link ${activeTab === index ? "active" : ""}`}
                      >
                        {tab}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-content" id="courseTabContent">
          <div
            className={`tab-pane fade show active`}
            id="all-tab-pane"
            role="tabpanel"
            aria-labelledby="all-tab"
          >
            <Swiper
              {...setting}
              modules={[Autoplay, Navigation]}
              className="swiper courses-swiper-active"
            >
              {articles.map((article: any) => (
                <SwiperSlide key={article._id} className="swiper-slide">
                  <div className="courses__item shine__animate-item">
                    <div className="courses__item-thumb">
                      <Link href="/article-details" className="shine__animate-link">
                        <Image
                          src={article.fileName ? `/uploads/articlethumb/${article.fileName}` : '/default-image.png'}
                          alt={article.title}
                          width={300}
                          height={200}
                        />
                      </Link>
                    </div>
                    <div className="courses__item-content">
                      <ul className="courses__item-meta list-wrap">
                        <li className="courses__item-tag">
                          <Link href="/article-category">
                            {article.category}
                          </Link>
                        </li>
                        <li className="created-date">
                          Created on: {new Date(article.createdAt).toLocaleDateString()}
                        </li>
                      </ul>
                      <h5 className="title">
                        <Link href="/article-details">{article.title}</Link>
                      </h5>
                      <p className="description">{article.description}</p>
                      <p className="author">
                        By <Link href="#">{article.userName} </Link>
                      </p>
                      <div className="courses__item-bottom">
                        <div className="button">
                          <Link href="/article-details">
                            <span className="text">Read More</span>
                            <i className="flaticon-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {!style && (
              <div className="courses__nav">
                <div className="courses-button-prev">
                  <i className="flaticon-arrow-right"></i>
                </div>
                <div className="courses-button-next">
                  <i className="flaticon-arrow-right"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleArea;
