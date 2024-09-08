"use client"
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from "@/svg/BtnArrow";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';



interface FormData {
   fname: string;
   lname: string;
   phone: string;
   email: string;
   password: string;
   cpassword: string;
}

const schema = yup.object({
   fname: yup.string().required('First name is required').label("Name"),
   lname: yup.string().required('Last name is required').label("Name"),
   phone: yup.string().required().label("phone"),
   email: yup.string().required().email().label("Email"),
   password: yup.string().required().label("Password"),
   cpassword: yup.string().required('Enter confirm password').label("Password"),
})
   .required();

   console.log(schema);

const RegistrationForm = () => {
   const [loading, setLoading] = useState(false);


   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   // const onSubmit = () => {
   //    const notify = () => toast('Registration successfully', { position: 'top-center' });
   //    notify();
   //    reset();
   // };
   const onSubmit = async (data: FormData) => {
      setLoading(true);

      try {
         const response = await fetch('/api/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed')
         }
         const result = await response.json();

         toast('Registration successful!', { position: 'top-center' });
         reset();
         // router.push('/login');


      } catch (error: any) {
         toast.error(error.message || 'An unexpected error occurred', { position: 'top-center' });

      }
      finally{
         setLoading(false);

      }
   };





   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="row gutter-20">
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="fast-name">First Name</label>
                  <input type="text" {...register("fname")} id="fast-name" placeholder="First Name" />
                  <p className="form_error">{errors.fname?.message}</p>
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="last-name">Last name</label>
                  <input type="text" {...register("lname")} id="last-name" placeholder="Last name" />
                  <p className="form_error">{errors.lname?.message}</p>
               </div>
            </div>
         </div>
         <div className="form-grp">
            <label htmlFor="email">Phone Number</label>
            <input type="number" {...register("phone")} id="phone" placeholder="Enter phone number" />
            <p className="form_error">{errors.phone?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} id="email" placeholder="email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} id="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" {...register("cpassword")} id="confirm-password" placeholder="Confirm Password" />
            <p className="form_error">{errors.cpassword?.message}</p>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Sign Up<BtnArrow /></button>
      </form>
   )
}

export default RegistrationForm
