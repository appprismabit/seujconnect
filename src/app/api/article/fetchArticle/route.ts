import { NextRequest, NextResponse } from 'next/server';
import { getArticlesByUserId } from '../../controllers/articleController';
import { connectDB } from '../../db';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: 'UserId is required' }, { status: 400 });
    }

    await connectDB();

    const articles = await getArticlesByUserId({ userId });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    console.error('Error in fetchArticles API:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
