import User from '../models/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Interface for the registration data
interface RegisterData {
  title: string;
  qualification: string;
  phone: string;
  email: string;
  password: string;
}

// Interface for the login data
interface LoginData {
  email: string;
  password: string;
}


export async function registerUser({
  title,
  qualification,
  phone,
  email,
  password,
}: RegisterData): Promise<{ token: string }> {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    title,  
    qualification,  
    phone,  
    email,
    password: hashedPassword, 
  });

  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return { token };  
}

/**
 * Function to handle user login
 */
export async function loginUser({ email, password }: LoginData): Promise<{ token: string }> {
  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  // Compare the provided password with the hashed password stored in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return { token };  // Return the JWT token
}
