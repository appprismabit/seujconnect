import blog_data from "@/data/home-data/BlogData"
import Image from "next/image"
import Link from "next/link"

import blog_shape from "@/assets/img/blog/blog_shape.svg"

const Blog = () => {
   return (
      <section className="blog__post-area-three tg-motion-effects blog__bg" style={{ backgroundImage: `url(/assets/img/bg/h3_blog_bg.jpg)` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-6">
                  <div className="section__title text-center mb-40">
                     <span className="sub-title">News & Blogs</span>
                     <h2 className="title">Our Latest News Feed</h2>
                     <p>when known printer took a galley of type scrambl edmake</p>
                  </div>
               </div>
            </div>
            
            <div className="row gutter-20">
               {blog_data.filter((items) => items.page === "home_1").map((item) => (
                  <div key={item.id} className="col-xl-3 col-md-6">
                     <div className="blog__post-item shine__animate-item">
                        <div className="blog__post-thumb">
                           <Link href="/blog-details" className="shine__animate-link"><Image src={item.thumb} alt="img" /></Link>
                           <Link href="/blog" className="post-tag">{item.tag}</Link>
                        </div>
                        <div className="blog__post-content">
                           <div className="blog__post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                                 <li><i className="flaticon-user-1"></i>by <Link href="/blog-details">Admin</Link></li>
                              </ul>
                           </div>
                           <h4 className="title"><Link href="/blog-details">{item.title}</Link></h4>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="blog__shape">
            <Image src={blog_shape} alt="shape" className="tg-motion-effects2" />
         </div>
      </section>
   )
}

export default Blog
