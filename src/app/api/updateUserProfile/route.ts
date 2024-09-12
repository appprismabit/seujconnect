import { connectDB } from '../db/index';
import { updateUserProfile } from '../controllers/updateUserProfileController';

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json(); // Parse request body which includes the ID
    const response = await updateUserProfile(body);

    return new Response(
      JSON.stringify({ message: 'User profile update successful!', data: response }),
      { status: 201 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
