"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import avatar from "@/assets/img/courses/details_instructors01.jpg";
import avatar_2 from "@/assets/img/courses/details_instructors02.jpg";
import LogoutButton from "@/components/inner-pages/login/LogoutBtn";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { UserDetails, initializeToken } from "@/redux/features/authSlice";
import sidebar_data from "@/data/dashboard-data/SideBarData";

const DashboardSidebar = ({ style }: any) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const userDetails = useSelector(
    (state: RootState) => state.auth.user
  ) as UserDetails | null;

  // Handle token initialization on page refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(initializeToken());
    }
  }, [dispatch]);

 
  // Determine which sidebar data to use based on the user's role or id
  const roleBasedSidebar = userDetails?.role === 0
    ? sidebar_data[0] // For role 0, show first sidebar data
    : userDetails?.role === 1
    ? sidebar_data[1] // For role 1, show second sidebar data
    : null; // Handle other roles or conditions

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
            {/* Display user details if available */}
            {userDetails ? (
              <>
                <h4 className="title text-success">
                  {userDetails.fname} {userDetails.lname}
                </h4>
                <h6 className="title">{userDetails.qualification}</h6>
                <h6 className="title">
                  <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                  {userDetails.email}
                </h6>
                <h6 className="title">
                  <i className="fa fa-phone-alt" aria-hidden="true"></i>{" "}
                  {userDetails.phone}
                </h6>
              </>
            ) : token ? (
              <p>Loading user details...</p>
            ) : (
              <p>No user details available</p>
            )}
          </div>
        </div>
        <div className="account__divider"></div>

        {/* Render the role-based sidebar */}
        {roleBasedSidebar && (
          <>
            <div
              className={`dashboard__sidebar-title mb-20 ${roleBasedSidebar.class_name}`}
            >
              <h6 className="title">{roleBasedSidebar.title}</h6>
            </div>
            <nav className="dashboard__sidebar-menu">
              <ul className="list-wrap">
                {roleBasedSidebar.sidebar_details.map((list) => (
                  <li
                    key={list.id}
                    className={pathname === list.link ? "active" : ""}
                  >
                    <Link href={list.link}>
                      <i className={list.icon}></i>
                      {list.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="account__divider"></div>
            <LogoutButton />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
