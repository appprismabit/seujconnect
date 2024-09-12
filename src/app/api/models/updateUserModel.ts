import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the user document
interface IupdateUserData extends Document {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  password: string; // Add the password field
  skill?: string; // Make skill optional if it's a new field
}

// Define the schema for the user document
const updateUserSchema: Schema<IupdateUserData> = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Password field added
  skill: { type: String, default: '' }, // Provide a default value for skill
});

// Check if the model already exists before defining it
const updateUserProfile: Model<IupdateUserData> =
  mongoose.models.User || mongoose.model<IupdateUserData>('User', updateUserSchema);

export default updateUserProfile;
export type { IupdateUserData };
