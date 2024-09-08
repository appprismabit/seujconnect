import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  title: string;
  qualification: string;
  phone: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  title: { type: String, required: true },  // Ensure title is defined
  qualification: { type: String, required: true },  // Ensure qualification is defined
  phone: { type: String, required: true },  // Ensure phone is defined
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };
