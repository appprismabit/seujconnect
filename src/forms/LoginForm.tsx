"use client";

import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {BtnArrow} from "@/svg/BtnArrow";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { loginUser } from "@/redux/features/authSlice"; // Import your loginUser action
import { RootState, AppDispatch } from "@/redux/store"; // Import your store types

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter(); // Next.js router for redirection
  const { loading, error } = useSelector((state: RootState) => state.auth); // Access auth state from Redux

  // Validation schema using Yup
  const schema = yup
    .object({  
      email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email")
        .label("Email"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .label("Password"),
    })
    .required();

  // Hook form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // On form submit
  const onSubmit = async (data: FormData) => {
    dispatch(loginUser(data)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!", { position: "top-center" });
        reset();
        router.push("/author/author-dashboard");
      } else {
        toast.error(result.payload || "Login failed", {
          position: "top-center",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="account__form">
      <div className="form-grp">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email")}
          type="text"
          placeholder="Enter your email"
        />
        <p className="form_error">{errors.email?.message}</p>
      </div>
      <div className="form-grp">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter your password"
        />
        <p className="form_error">{errors.password?.message}</p>
      </div>
      <div className="account__check">
        <div className="account__check-remember">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms-check"
          />
          <label htmlFor="terms-check" className="form-check-label">
            Remember me
          </label>
        </div>
        <div className="account__check-forgot">
          <Link href="/registration">Forgot Password?</Link>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-two arrow-btn"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"} <BtnArrow />
      </button>
      {error && <p className="form_error">{error}</p>}
    </form>
  );
};

export default LoginForm;
