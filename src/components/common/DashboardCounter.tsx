"use client";
import Count from "@/components/common/Count";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import dashboard_count_data from "@/data/dashboard-data/DashboardCounterData";
import { UserDetails, initializeToken } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

const DashboardCounter = ({ style }: any) => {
   const pathname = usePathname();
   const dispatch = useDispatch();
   const [count, setCount] = useState<{ [key: number]: number }>({}); // Initialize as an object to store counts

   const token = useSelector((state: RootState) => state.auth.token);
   const userDetails = useSelector((state: RootState) => state.auth.user) as UserDetails | null;

   useEffect(() => {
      if (typeof window !== "undefined") {
         dispatch(initializeToken());
      }
      fetchCount(); // Fetch counts after dispatching token initialization
   }, [dispatch]);

   const fetchCount = async () => {
      try {
         const userID = userDetails?._id;
         const formData = new FormData();
         if (userID) {
            formData.append('userId', userID); 
         } else {
            console.error('userID is undefined or null');
         }

         const response = await fetch(`http://localhost:3000/api/article/articleCount`, {
            method: "POST",
            body: formData,
         });

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const data = await response.json();
         console.log("Fetched count data:", data);

         // Assuming data.count is already in the format you expect
         setCount(data.count); // Set the count directly if it's already an object
      } catch (error) {
         console.error("Error fetching articles:", error);
      }
   };

   const roleBasedData = userDetails?.role === 0
      ? dashboard_count_data[0].dashboard_count_data // Admin data
      : userDetails?.role === 1
         ? dashboard_count_data[1].dashboard_count_data // User data
         : []; // Handle other roles or conditions

   return (
      <>
         {roleBasedData && (
            <>
               {roleBasedData.map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
                     <div className="dashboard__counter-item">
                        <div className="icon">
                           <i className={item.icon}></i>
                        </div>
                        <div className="content">
                           <span className="count">
                              <Count number={count[item.flag] || 0} /> {/* Use item.id to access count */}
                           </span>
                           <p style={{ marginTop: "14px" }}>{item.title}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </>
         )}
      </>
   );
};

export default DashboardCounter;
