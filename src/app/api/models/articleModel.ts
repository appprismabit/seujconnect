import mongoose, { Schema, Document, Model } from "mongoose";


interface IContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'blockquote';
  level?: number;  // For headings, optional
  text?: string;   // For headings, paragraphs, blockquotes
  src?: string;    // For images
  alt?: string;    // Alternative text for images
}


interface ICommentBlock {
  text?: string;
  phoneNumber?: string;
}
const commentBlockSchema: Schema<ICommentBlock> = new Schema({
  text: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  }
});

// Schema for Content Block
const contentBlockSchema: Schema<IContentBlock> = new Schema({
  type: {
    type: String,
    enum: ['heading', 'paragraph', 'image', 'blockquote'],
    required: true
  },
  level: {
    type: Number,
    required: function () { return this.type === 'heading'; } // Required for headings
  },
  text: {
    type: String,
    required: function () { return this.type !== 'image'; } // Required for non-image types
  },
  src: {
    type: String,
    required: function () { return this.type === 'image'; } // Required for images
  },
  alt: {
    type: String,
    required: function () { return this.type === 'image'; } // Required for images
  }
});



interface IArticle extends Document {
  title?: string;  // Optional
  description?: string; // Optional
  category?: string; // Optional
  userId: string; // Required
  filePath?: string;
  fileName?: string;
  likes?: number;  // Single object instead of array
  dislike?: number;
  content: IContentBlock[]; // Array of content blocks
  comments: ICommentBlock[]; // Array of comment blocks
}

// Schema for Article
const articleSchema: Schema<IArticle> = new Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  category: { type: String, default: null },
  userId: { type: String, required: true },
  filePath: { type: String, default: null },
  fileName: { type: String, default: null },
  likes: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  content: [contentBlockSchema],
  comments: [commentBlockSchema]
}, { timestamps: true });

// Register the article model, or use the existing one if already registered
const ArticleModel: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);

export default ArticleModel;
export type { IArticle, IContentBlock, ICommentBlock };
