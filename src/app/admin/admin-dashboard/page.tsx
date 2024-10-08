"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHome from "@/dashboard/admin-dashboard/dashboard-home";
import Wrapper from "@/layouts/Wrapper";



const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Redirect to login if token is not found
    if (!token) {
      router.push("/login"); // Change to the login route of your app
    }
  }, [router]);

  return (
    <Wrapper>
      <DashboardHome />
    </Wrapper>
  );
};

export default Index;
