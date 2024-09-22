import mongoose, { Schema, Document, Model } from "mongoose";

// Define the User interface to represent the user data
interface IUser extends Document {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  password: string;
  role: number;
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema({
  fname: { type: String, required: true },  // First name field
  lname: { type: String, required: true },  // Last name field
  phone: { type: String, required: true },  // Phone number field
  email: { type: String, required: true, unique: true, lowercase: true },  // Email field
  password: { type: String, required: true },  // Hashed password field
  role: {type: Number, default: 1}
});

// Create and export the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };
