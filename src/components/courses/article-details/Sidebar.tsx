"use client"
import VideoPopup from "@/modals/VideoPopup"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import InjectableSvg from "@/hooks/InjectableSvg";
import {BtnArrow, BtnPlus } from "@/svg/BtnArrow";

import img_1 from "@/assets/img/courses/course_thumb02.jpg"
import img_2 from "@/assets/img/others/payment.png"

const Sidebar = ({ article }: { article: any[] }) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="col-xl-3 col-lg-4">
            <div className="courses__details-sidebar">
               <div className="courses__details-video">
                  <Image src={`/uploads/artclecontent/AR-TH66e68e1df89acab5b874739b.jpg`}
                   width={300}
                   height={200}
                   layout="responsive"
                  alt="img" />
                  <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video"><i className="fas fa-play"></i></a>
               </div>
               <div className="courses__cost-wrap">
                  <span>This Course Fee:</span>
                  <h2 className="title">$18.00 <del>$32.00</del></h2>
               </div>
               <div className="courses__information-wrap">
                  <h5 className="title">Course includes:</h5>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon01.svg" alt="img" className="injectable" />
                        Level
                        <span>Expert</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon02.svg" alt="img" className="injectable" />
                        Duration
                        <span>11h 20m</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon03.svg" alt="img" className="injectable" />
                        Lessons
                        <span>12</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon04.svg" alt="img" className="injectable" />
                        Quizzes
                        <span>145</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon05.svg" alt="img" className="injectable" />
                        Certifications
                        <span>Yes</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon06.svg" alt="img" className="injectable" />
                        Graduation
                        <span>25K</span>
                     </li>
                  </ul>
               </div>
               <div className="courses__payment">
                  <h5 className="title">Secure Payment:</h5>
                  <Image src={img_2} alt="img" />
               </div>
               <div className="courses__details-social">
                  <h5 className="title">Share this course:</h5>
                  <ul className="list-wrap">
                     <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-whatsapp"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-youtube"></i></Link></li>
                  </ul>
               </div>
               <div className="courses__details-enroll">
                  <div className="tg-button-wrap">
                     <Link href="/courses" className="btn btn-two arrow-btn">
                        See All Instructors<BtnArrow />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
      </>
   )
}

export default Sidebar
