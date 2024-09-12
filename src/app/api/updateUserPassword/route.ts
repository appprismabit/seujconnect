import { connectDB } from '../db/index';
import { updateUserPass } from '../controllers/updateUserPasswordController';

export async function POST(req: Request) {
    await connectDB();
    try {
        const body = await req.json();
        const response = await updateUserPass(body);
        return new Response(
            JSON.stringify({ message: 'User password updated successfully', data: response }),
            { status: 201 }
        );
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
