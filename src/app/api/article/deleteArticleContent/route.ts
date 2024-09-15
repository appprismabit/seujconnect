import { NextResponse } from "next/server";
import { connectDB } from '../../db/index';
import {removeArticleContent} from '../../controllers/articleController';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    await connectDB();
    try {
        const formData = await req.formData();
        const articleId = formData.get('articleId')?.toString() || '';
        const contentIdToRemove = formData.get('contentId')?.toString() || '';

        if(!articleId || !contentIdToRemove){
            return NextResponse.json({
                success: false,
                message: 'Invalid request',
                status: 400
            });
        }

        const articleData = {
            articleId,
            contentIdToRemove
        }
        const result = await removeArticleContent(articleData);
        return NextResponse.json({
            success: true,
            message: 'Content removed successfully',
            status: 200
        })
    } catch (error: any) {

    }
}