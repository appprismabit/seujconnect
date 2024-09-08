import Link from "next/link"
import Image from "next/image"

import logo from "@/assets/img/logo/seuj_connect.png"

const FooterCommon = () => {
   return (
      <>
         <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="footer__widget">
               <div className="logo mb-35">
                  <Link href="/"><Image src={logo} alt="img" /></Link>
               </div>
               <div className="footer__content">
                  <p></p>
                  <ul className="list-wrap">
                     <li>Six Mile Vip Road</li>
                     <li>+91 7002443005</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Useful Links</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="#">Our values</Link></li>
                    
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Our Company</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="#">Contact Us</Link></li>
                     
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

export default FooterCommon
