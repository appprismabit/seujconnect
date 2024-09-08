import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner"
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar"
import instructor_assignment_data from "@/data/dashboard-data/InstructorAssignmentData"
import ArticleForm from "@/forms/ArticleForm"
import Link from "next/link"

const InstructorAssignmentArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBanner />
            <div className="row">
               <DashboardSidebar />
               <div className="col-lg-9">
                  <div className="dashboard__content-wrap">
                     <div className="dashboard__content-title">
                        <h4 className="title">Add</h4>
                     </div>
                     <div className="row">
                        <div className="col-12">
                           <div className="dashboard__review-table">
                           <ArticleForm />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default InstructorAssignmentArea
