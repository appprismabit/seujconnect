import { connectDB } from "../db";
import { loginUser } from "../controllers/userController";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const { token } = await loginUser({ email, password });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    // Check if error is an instance of Error
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";

    console.error("Error in login API:", errorMessage);

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
    });
  }
}
