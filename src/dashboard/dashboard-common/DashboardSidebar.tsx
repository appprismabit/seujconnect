"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import avatar from "@/assets/img/courses/details_instructors01.jpg";
import avatar_2 from "@/assets/img/courses/details_instructors02.jpg";
import { getUserFromToken, UserDetails } from "@/data/dashboard-data/UserData";

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
}

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
      {
        id: 4,
        link: "/author-setting",
        icon: "skillgro-settings",
        title: "Settings",
      },
      {
        id: 5,
        link: "/login",
        icon: "skillgro-logout",
        title: "Logout",
      },
    ],
  },
];

const DashboardSidebar = ({ style }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>();

  // Function to handle logout and clear localStorage
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    router.push("/login");
  };

  useEffect(() => {
    const user = getUserFromToken(); // Get user details directly
    setUserDetails(user);
  }, []);

  return (
    <div className="col-lg-3">
      <div className="dashboard__sidebar-wrap mb-2">
        <div className="text-center">
          <Image
            src={style ? avatar_2 : avatar}
            alt="img"
            className="mx-auto rounded-circle"
            width={150}
            height={150}
          />
          <div className="content text-center">
            <h4 className="title text-success">{userDetails?.title}</h4>
            <h6 className="title">
              {" "}
              <i className="fa fa-graduation-cap" aria-hidden="true"></i>{" "}
              {userDetails?.qualification}
            </h6>
            <h6 className="title">
              {" "}
              <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
              {userDetails?.email}
            </h6>
            <h6 className="title">
              {" "}
              <i className="fa fa-phone-alt" aria-hidden="true"></i>{" "}
              {userDetails?.phone}
            </h6>
          </div>
        </div>
        <div className="account__divider"></div>
        {sidebar_data.map((item) => (
          <React.Fragment key={item.id}>
            <div
              className={`dashboard__sidebar-title mb-20 ${item.class_name}`}
            >
              <h6 className="title">{item.title}</h6>
            </div>
            <nav className="dashboard__sidebar-menu">
              <ul className="list-wrap">
                {item.sidebar_details.map((list) => (
                  <li
                    key={list.id}
                    className={pathname === list.link ? "active" : ""}
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
