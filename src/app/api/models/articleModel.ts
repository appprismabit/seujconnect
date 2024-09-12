import mongoose, { Schema, Document, Model } from "mongoose";

interface IaddArticle extends Document {
    title: string;
    description: string;
    category: string;
    userId: string;
    filePath?: string; // Optional field to store file path
}

const articleSchema: Schema<IaddArticle> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
    filePath: { type: String } // Optional field
});

const registerArticleModel: Model<IaddArticle> = mongoose.models.Article || mongoose.model<IaddArticle>("Article", articleSchema);

export default registerArticleModel;
export type { IaddArticle };
