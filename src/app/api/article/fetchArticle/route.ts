import { NextRequest, NextResponse } from 'next/server';
import { getArticlesByUserId } from '../../controllers/articleController';
import { connectDB } from '../../db';
import registerArticleModel from '../../models/articleModel'

export const config = {
  api: {
    bodyParser: false, // Allow JSON body parsing
  },
};
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();


    const contentType = req.headers.get('Content-Type') || '';
    let userId = '';
    if (contentType.includes('multipart/form-data')) {
      // Parse form-data
      const formData = await req.formData();
      userId = formData.get('userId')?.toString() || '';
    }
    if (!userId) {
      const fetchAllArticles = await registerArticleModel.find();
      return NextResponse.json(fetchAllArticles, { status: 200 });
    }


    const articles = await getArticlesByUserId({ userId });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    console.error('Error in fetchArticles API:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
