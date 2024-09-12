"use client";
import React, { useEffect, useState } from "react";
import { getUserFromToken, UserDetails } from "@/data/dashboard-data/UserData";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { initializeToken } from "@/redux/features/authSlice";

interface ProfileContentProps {
  style?: any;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ style }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state: RootState) => state.auth.user
  ) as UserDetails | null;
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(initializeToken());
    }
  }, [dispatch]);

  return (
    <div className="col-lg-9">
      <div className="dashboard__content-wrap">
        <div className="dashboard__content-title">
          <h4 className="title">My Profile</h4>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="profile__content-wrap">
              {userDetails ? (
                <ul className="list-wrap">
                  <li>
                    <span>Name</span> {userDetails.fname} {userDetails.lname}
                  </li>
                  <li>
                    <span>Email</span> {userDetails.email || "N/A"}
                  </li>
                  <li>
                    <span>Phone Number</span> {userDetails.phone || "N/A"}
                  </li>
                  <li>
                    <span>Qualification</span>{" "}
                    {userDetails.qualification || "N/A"}
                  </li>
                  <li>
                    <span>Biography</span> A dynamic user experience designer
                    and developer.
                  </li>
                </ul>
              ) : (
                <p>Loading user details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
