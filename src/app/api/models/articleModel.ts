import mongoose, {Schema, Document, Model} from "mongoose";

interface IArticle extends Document {
    articleTitle: string;
    articleSubtitle: string;
    articleCatg: string;
}

const articleSchema: Schema<IArticle> = new Schema({
    articleTitle: {type: String, required: true},
    articleSubtitle: {type: String, required: true},
    articleCatg: {type: String, required: true}
});

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);
export default Article;
export type{IArticle};