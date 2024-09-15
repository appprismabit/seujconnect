import { NextResponse } from "next/server";
import { connectDB } from '../../db/index';
import { updateLikeDislikeCounts } from "../../controllers/articleController";

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const formData = await req.formData();
    const articleId = formData.get('articleId')?.toString() || '';
    const status = formData.get('status')?.toString() || '';
    
    
    

    const result = await updateLikeDislikeCounts(articleId, status);
    return NextResponse.json(
      { message: "Like count updated successfully", result },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
