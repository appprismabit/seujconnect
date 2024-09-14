"use client";
import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";




const AuthorSettingPassword = ({style}: any) => {
   const token = localStorage.getItem("token");

   const [formData, setFormData] = useState({
      currentpassword: "",
      newpassword: "",
      repassword: "",
      token: token || ''
   });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setFormData({...formData, [e.target.id]: e.target.value});
   };

   const handleSubmit = async (e: React.FormEvent) =>{
      e.preventDefault();
      try{
         const response = await fetch("/api/userprofile/updateUserPassword", {
            method: 'POST',
            headers :{
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         if(response.ok){
            const result = await response.json();
            console.log(result);
            toast('Password change successfully!', {position: 'top-center'});
         }else{
            console.error('Error updating profile');
         }
      }catch(error){
         toast.error('An unexpected error occurrred', {position: 'top-center'});
      }
      finally{

      }
   };
   return (
      <div className="instructor__profile-form-wrap">
         <form onSubmit={handleSubmit} className="instructor__profile-form">
            <div className="form-grp">
               <label htmlFor="currentpassword">Current Password</label>
               <input id="currentpassword"
                type="password" 
                placeholder="Current Password"
                onChange={handleInputChange} 
                />
            </div>
            <div className="form-grp">
               <label htmlFor="newpassword">New Password</label>
               <input id="newpassword" 
               type="password" 
               placeholder="New Password" 
               onChange  = {handleInputChange}
               />
            </div>
            <div className="form-grp">
               <label htmlFor="repassword">Re-Type New Password</label>
               <input id="repassword"
                type="password" 
                placeholder="Re-Type New Password"
                onChange = {handleInputChange}
                />
            </div>
            <div className="submit-btn mt-25">
               <button type="submit" className="btn">Update Password</button>
            </div>
         </form>
      </div>
   )
}

export default AuthorSettingPassword
