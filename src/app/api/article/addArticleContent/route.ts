import { NextResponse } from 'next/server';
import { connectDB } from '../../db/index';
import { addArticleContent } from '../../controllers/articleController';
import FileHelper from "../../Helpers/FileUploadHelper";
import registerArticleModel from '../../models/articleModel';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  await connectDB();
  try {
    // Extract the form data
    const formData = await req.formData();

    // Initialize the content array
    const contentArray = [];

    // Loop through formData to extract content blocks
    const type = formData.get('content[type]')?.toString() || '';
    const level = formData.get('content[level]')?.toString() || '';
    const text = formData.get('content[text]')?.toString() || '';
    const src = formData.get('content[src]') as File;
    const alt = formData.get('content[alt]')?.toString() || '';
    const articleId = formData.get('articleId')?.toString() || '';
    console.log('This is the article id ' + articleId);
    

    const contentBlock: any = { type };

    // Add fields conditionally based on the content type
    if (type === 'heading' && level) {
      contentBlock.level = level;
    }

    if (type === 'image' && src) {
      let lastArticle = await registerArticleModel.findOne({})
      .sort({ _id: -1 }) // Sort by _id in descending order to get the most recent document
      .exec();
      const fileName = src.name;
    const fileExtension = fileName.split('.').pop();
    //const newName = 'AR-TH' + lastArticle?._id + '.' + fileExtension;
    const savedFilePath = await FileHelper.saveFile(src.stream(), fileName, "uploads/artclecontent");
      contentBlock.src = fileName;
      contentBlock.alt = alt;
    } else if (text) {
      contentBlock.text = text;
    }

    // Push the content block into the array
    contentArray.push(contentBlock);

    // Other form fields, like token or other article data
    const token = formData.get('token')?.toString() || '';

    const newArticle = {
      content: contentArray,
      articleId
    };
    console.log(newArticle)
    

    // Retrieve the existing article content using userId (from token)
    const saveArticleContent = await addArticleContent(newArticle);

    // Return success response
    return NextResponse.json(
      { message: 'Article content added successfully', saveArticleContent },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    console.error('Error handling article upload:', errorMessage);

    // Return error response
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
