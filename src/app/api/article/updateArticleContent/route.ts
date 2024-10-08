import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../db";
import { updateArticleContent } from '../../controllers/articleController';
import FileHelper from "../../Helpers/FileUploadHelper";

export const config = {
    api: {
        bodyParser: false,
    },
};
export async function POST(req: Request) {
    await connectDB();
    try {
        const formData = await req.formData();
        const contentArray = [];
        const type = formData.get('content[type]')?.toString() || '';
        const level = formData.get('content[level]')?.toString() || '';
        const text = formData.get('content[text]')?.toString() || '';
        const src = formData.get('content[src]') as File || '';
        const alt = formData.get('content[alt]')?.toString() || '';
        const articleId = formData.get('articleId')?.toString() || '';
        const contentId = formData.get('contentId')?.toString() || '';

        // const fileName = src;
        // const fileExtension = fileName.split('.').pop();
        // const newName = 'AR-CON' + fileName + fileExtension;

        // const savedFilePath = await FileHelper.saveFile(src.stream(), newName, 'uploads/artclecontent');

        const contentBlock: any = { type };
        if (type === 'heading' && level) {
            contentBlock.level = level;
        }
        if (type === 'image' && src) {
            contentBlock.src = src;
            contentBlock.alt = alt;
        } else if (text) {
            contentBlock.text = text;
        }
        contentArray.push(contentBlock);

        const newArticle = {
            content: contentArray,
            articleId,
            contentId
        };



        const result = await updateArticleContent(newArticle);

        return NextResponse.json(
            { message: 'Article content updated successfully ', result },
            { status: 201 }
        );


    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        console.error('Error handling article upload:', errorMessage);

        // Return error response
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
};

