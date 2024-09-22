import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "../../controllers/articleController";
import { connectDB } from "../../db/index";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        await connectDB(); // Ensure the database connection is established

        const result = await getArticles(); // Fetch articles without filtering by userId

        return NextResponse.json({
            success: true,
            data: result, // Return the fetched articles
        });
    } catch (error: any) {
        console.error("Error in POST /api/article/fetchAllArticles:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
