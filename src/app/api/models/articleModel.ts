import mongoose, { Schema, Document, Model } from "mongoose";

// Interface to define the structure of an article document
interface IaddArticle extends Document {
  title: string;
  description: string;
  category: string;
  userId: string;
  filePath?: string; // Optional field to store the file path
}

// Define the schema for the article model
const articleSchema: Schema<IaddArticle> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
    filePath: { type: String, default: null }, // Optional field to store file path
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps

// Register the article model, or use existing one if already registered
const registerArticleModel: Model<IaddArticle> =
  mongoose.models.Article ||
  mongoose.model<IaddArticle>("Article", articleSchema);

export default registerArticleModel;
export type { IaddArticle };
