"use client";
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

import course_details_img1 from "@/assets/img/courses/courses_details.jpg";
import course_details_img2 from "@/assets/img/courses/course_author001.png";

const tab_title: string[] = ["Overview", "Curriculum", "Instructors", "Reviews"];

const CourseDetailsArea = ({ article, fetchArticles }: { article: any[], fetchArticles: (id: string | undefined) => void }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  

  return (
    <section className="courses__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="courses__details-thumb">
              <Image src={`/uploads/articlethumb/${article[0]?.fileName}`}
                width={300}
                height={200}
                layout="responsive"
                alt="invalid image" />
            </div>
            <div className="courses__details-content">
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link href="/course">
                    {article[0]?.category || 'no data available'}
                  </Link>
                </li>
                <li className="avg-rating">
                  <i className="fas fa-thumbs-up"></i>
                  {article[0]?.likes}
                </li>
                <li className="avg-rating">
                  <i className="fas fa-thumbs-down"></i>
                  {article[0]?.dislike}
                </li>
              </ul>
              <h2 className="title">
                {article[0]?.title}
              </h2>
              <div className="courses__details-meta">
                <ul className="list-wrap">
                  <li className="author-two">
                    <Image src={course_details_img2} alt="img" />
                   
                  </li>
                  <li className="date"><i className="flaticon-calendar"></i> {new Date(article[0]?.createdAt).toLocaleDateString()}</li>
                  <li><i className="flaticon-mortarboard"></i>2,250 Students</li>
                </ul>
              </div>
              {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                {tab_title.map((tab, index) => (
                  <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                    <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                  </li>
                ))}
              </ul> */}
              
              <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} role="tabpanel">
                  {<Overview article={article} fetchArticles={fetchArticles}/>}
                </div>
                {/* <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} role="tabpanel">
                  <Curriculum />
                </div>
                <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} role="tabpanel">
                  <Instructors />
                </div>
                <div className={`tab-pane fade ${activeTab === 3 ? 'show active' : ''}`} role="tabpanel">
                  <Reviews />
                </div> */}
              </div>
            </div>
          </div>
          {<Sidebar article={article} />}
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea;
