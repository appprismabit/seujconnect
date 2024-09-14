import { NextRequest, NextResponse } from "next/server";
import { delArticleById } from '../../controllers/articleController';
import { connectDB } from '../../db/index';


export const config = {
    api: {
        bodyParser: false,
    },
};
export async function POST(req: Request) {
    await connectDB();
    try {
        const formData = await req.formData();

        const articleId = formData.get('articleId')?.toString() || "";

        if (!articleId) {
            return NextResponse.json({ error: 'File is missing' }, { status: 400 });
        }
        const result = await delArticleById({articleId});
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error handling article upload:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}