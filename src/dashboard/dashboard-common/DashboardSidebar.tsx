"use client";
import Link from "next/link";
import React from "react";
import { useRouter, usePathname } from 'next/navigation';

interface DataType {
   id: number;
   title: string;
   class_name?: string;
   sidebar_details: {
      id: number;
      link: string;
      icon: string;
      title: string;
   }[];
}[];

const sidebar_data: DataType[] = [
   {
      id: 1,
      title: "Welcome, User",
      sidebar_details: [
         {
            id: 1,
            link: "/author-dashboard",
            icon: "fas fa-home",
            title: "Dashboard",
         },
         {
            id: 2,
            link: "/author-profile",
            icon: "skillgro-avatar",
            title: "My Profile",
         },
         {
            id: 3,
            link: "/author-articles",
            icon: "skillgro-book",
            title: "My Articles",
         },
      ],
   },
   {
      id: 3,
      title: "User",
      class_name: "mt-30",
      sidebar_details: [
         {
            id: 1,
            link: "/instructor-setting",
            icon: "skillgro-settings",
            title: "Settings",
         },
         {
            id: 2,
            link: "/login", // Redirect to the login page after logout
            icon: "skillgro-logout",
            title: "Logout",
         },
      ],
   },
];

const DashboardSidebar = () => {
   const pathname = usePathname();
   const router = useRouter();

   // Function to handle logout and clear localStorage
   const handleLogout = () => {
      localStorage.removeItem("token"); // Clear the token
      // Clear any other relevant data from localStorage here, if needed
      router.push("/login"); // Redirect to login page
   };

   return (
      <div className="col-lg-3">
         <div className="dashboard__sidebar-wrap">
            {sidebar_data.map((item) => (
               <React.Fragment key={item.id}>
                  <div className={`dashboard__sidebar-title mb-20 ${item.class_name}`}>
                     <h6 className="title">{item.title}</h6>
                  </div>
                  <nav className="dashboard__sidebar-menu">
                     <ul className="list-wrap">
                        {item.sidebar_details.map((list) => (
                           <li
                              key={list.id}
                              className={pathname === list.link ? 'active' : ''}
                           >
                              {list.title === "Logout" ? (
                                 <a
                                    href="#"
                                    onClick={handleLogout}
                                    style={{ cursor: "pointer" }}
                                 >
                                    <i className={list.icon}></i>
                                    {list.title}
                                 </a>
                              ) : (
                                 <Link href={list.link}>
                                    <i className={list.icon}></i>
                                    {list.title}
                                 </Link>
                              )}
                           </li>
                        ))}
                     </ul>
                  </nav>
               </React.Fragment>
            ))}
         </div>
      </div>
   );
};

export default DashboardSidebar;
