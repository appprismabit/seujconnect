import User from "../models/Users"; // Adjust the import path as needed
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Interface for the registration data
interface RegisterData {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  password: string;
}

// Interface for the login data
interface LoginData {
  email: string;
  password: string;
}

// Register a new user
export async function registerUser({
  fname,
  lname,
  phone,
  email,
  password,
}: RegisterData): Promise<{ token: string }> {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({
    fname,
    lname,
    phone,
    email,
    password: hashedPassword,
  });
  console.log(newUser);

  await newUser.save();

  // Generate a JWT token
  const token = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return { token };
}

// Login user function
export async function loginUser({
  email,
  password,
}: LoginData): Promise<{ token: string }> {
  // Find the user by email
  const user = await User.findOne({ email });
 
  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the hashed password stored in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return { token }; // Return the JWT token
}
