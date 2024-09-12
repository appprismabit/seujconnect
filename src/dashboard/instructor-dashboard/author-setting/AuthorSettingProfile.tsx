"use client";
import { getUserFromToken, UserDetails } from "@/data/dashboard-data/UserData";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from "@/svg/BtnArrow";





const AuthorSettingProfile = ({ style }: any) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    skill: "",
    token : ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserDetails = () => {
      try {
        const user = getUserFromToken();
        setUserDetails(user);
        setFormData({
          fname: user?.fname || "",
          lname: user?.lname || "",
          email: user?.email || "",
          phone: user?.phone || "",
          skill: "", // Replace if fetched dynamically
          token: token || ""
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setUserDetails(null);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //setFormData(true);

    try {
      const response = await fetch("/api/updateUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        toast('Profile updated successful!', { position: 'top-center' });

       // console.log("Profile updated successfully");
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      toast.error( 'An unexpected error occurred', { position: 'top-center' });

    }
    finally{
    //  setFormData(false);

    }
  };

  return (
    <>
      <div className="instructor__profile-form-wrap">
        <form onSubmit={handleSubmit} className="instructor__profile-form">
          <div className="row">
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="fname">First Name</label>
                <input
                  id="fname"
                  type="text"
                  value={formData.fname}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="lname">Last Name</label>
                <input
                  id="lname"
                  type="text"
                  value={formData.lname}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="email">User Name</label>
                <input
                  id="email"
                  type="text"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-grp">
                <label htmlFor="skill">Skill/Occupation</label>
                <input
                  id="skill"
                  type="text"
                  value={formData.skill}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="submit-btn mt-25">
            <button type="submit" className="btn">
              Update Info
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthorSettingProfile;
