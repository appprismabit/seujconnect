import { connectDB } from '../db/index';
import { registerArticle } from '../controllers/articleController';

export async function POST(req: Request) {
    await connectDB();
    try {
        const body = await req.json();

        const response = await registerArticle(body);

        return new Response(JSON.stringify({ message: 'Article registration successful', data: response }), {
            status: 201,
        });
    } catch (error: any) {

        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}