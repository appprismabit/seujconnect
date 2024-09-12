import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./features/courseSlice";
import cartSlice from "./features/cartSlice";
import productSlice from "./features/productSlice";
import wishlistSlice from "./features/wishlistSlice";
import authSlice, { setToken } from "./features/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Create the Redux store
const store = configureStore({
  reducer: {
    courses: courseSlice,
    products: productSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Custom hook to initialize token
export const useInitializeToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setToken(token)); // Dispatch the token to Redux
      }
    }
  }, [dispatch]);
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
