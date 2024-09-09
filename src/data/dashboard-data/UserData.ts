import jwt from "jsonwebtoken";
export interface UserDetails {
  _id: string;
  title: string;
  email: string;
  phone: string;
  qualification: string;
  password: string;
  __v?: number;
  [key: string]: any; 
}

export const getUserFromToken = (): UserDetails | null => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found in localStorage.");
        return null;
      }

      const decoded = jwt.decode(token) as { user: UserDetails } | null;
      if (decoded && decoded.user) {
        console.log("Decoded User:", decoded.user);
        return decoded.user; // Return the user object
      }

      console.log("Failed to decode token.");
      return null;
    }
    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
