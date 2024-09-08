import { connectDB } from '../db/index';
import { registerUser } from '../controllers/userController';

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const response = await registerUser(body);


    return new Response(JSON.stringify({ message: 'User registered successfully', data: response }), {
      status: 201,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
