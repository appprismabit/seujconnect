import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Content Block (used inside the article content array)
interface IContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'blockquote';
  level?: number;  // For headings, optional
  text?: string;   // For headings, paragraphs, blockquotes
  src?: string;    // For images
  alt?: string;    // Alternative text for images
}

// Interface for Comment Block
interface ICommentBlock {
  text?: string; 
  phoneNumber?: string;
}

// Interface to define the structure of an article document
interface IArticle extends Document {
  title?: string;  // Optional
  description?: string; // Optional
  category?: string; // Optional
  userId: string; // Required
  filePath?: string; 
  fileName?: string; // Optional field to store the file name
  content: IContentBlock[]; // Array of content blocks
  comments: ICommentBlock[]; // Array of comment blocks
}

// Schema for Comment Block
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
    required: function() { return this.type === 'heading'; } // Required for headings
  },
  text: {
    type: String,
    required: function() { return this.type !== 'image'; } // Required for non-image types
  },
  src: {
    type: String,
    required: function() { return this.type === 'image'; } // Required for images
  },
  alt: {
    type: String,
    required: function() { return this.type === 'image'; } // Required for images
  }
});

// Schema for Article
const articleSchema: Schema<IArticle> = new Schema({
  title: { type: String, default: null }, // Optional
  description: { type: String, default: null }, // Optional
  category: { type: String, default: null }, // Optional
  userId: { type: String, required: true }, // Required
  filePath: { type: String, default: null }, 
  fileName: { type: String, default: null }, // Optional
  content: [contentBlockSchema], // Array of content blocks
  comments: [commentBlockSchema] // Array of comment blocks
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Register the article model, or use the existing one if already registered
const ArticleModel: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);

export default ArticleModel;
export type { IArticle, IContentBlock, ICommentBlock };
