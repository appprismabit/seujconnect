import { connectDB } from "../db/index"; // Adjust the path to your database connection
import { registerUser } from "../controllers/userController";

// API route to register a new user
export async function POST(req: Request) {
  // Connect to the database
  await connectDB();

  try {
    // Parse the request body
    const body = await req.json();

    // Call the registerUser function to register the user
    const response = await registerUser(body);

    // Return a success response with a JWT token
    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        data: response,
      }),
      {
        status: 201,
      }
    );
  } catch (error: any) {
    // Handle errors and return error response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
