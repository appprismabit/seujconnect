// src/components/LogoutButton.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/"); // Redirect to homepage or login page after logout
  };

  return (
    <button onClick={handleLogout} className="btn btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
