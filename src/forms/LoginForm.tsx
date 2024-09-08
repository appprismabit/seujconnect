"use client";

import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from "@/svg/BtnArrow";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
   email: string;
   password: string;
}

const LoginForm = () => {
   const [loading, setLoading] = useState(false);
   const router = useRouter(); // Next.js router for redirection

   // Validation schema using Yup
   const schema = yup.object({
      email: yup.string().required('Email is required').email('Enter a valid email').label("Email"),
      password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').label("Password"),
   }).required();

   // Hook form setup
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({
      resolver: yupResolver(schema),
   });

   // On form submit
   const onSubmit = async (data: FormData) => {
      setLoading(true);

      try {
         const response = await fetch('/api/login', { // Replace with your login API endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
         }

         const result = await response.json();

         // Login successful, store JWT token
         toast('Login successful!', { position: 'top-center' });

         // Store JWT token (replace with session storage/cookies if needed)
         localStorage.setItem('token', result.token);

         // Reset form
         reset();

         // Redirect to user dashboard
         router.push('/author-dashboard');

      } catch (error: any) {
         // Enhanced error handling for network errors or invalid login
         toast.error(error.message || 'An unexpected error occurred', { position: 'top-center' });
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input id="email" {...register("email")} type="text" placeholder="Enter your email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input id="password" {...register("password")} type="password" placeholder="Enter your password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input type="checkbox" className="form-check-input" id="terms-check" />
               <label htmlFor="terms-check" className="form-check-label">Remember me</label>
            </div>
            <div className="account__check-forgot">
               <Link href="/registration">Forgot Password?</Link>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'} <BtnArrow />
         </button>
      </form>
   );
};

export default LoginForm;
