import registerArticleModel, { IaddArticle } from "../models/articleModel";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function addArticle(body: any) {
  // Decode the JWT token to extract user details
  const decoded = jwt.decode(body.token);
  let userId: string | undefined;

  if (decoded && typeof decoded !== "string") {
    userId = (decoded as JwtPayload)?.user?._id; // Accessing the user's ID from the token
  }
  if (!userId) {
    throw new Error("User ID not found in token");
  }

  try {
    const { title, description, category } = body;
    if (!title || !description || !category) {
      throw new Error("Title, description, and category are required.");
    }

    // Handle file if it exists
    let filePath: string | undefined;
    if (body.file?.filepath) {
      filePath = body.file.filepath; // File path where formidable saved the file
    }

    // Create the new article object
    const newArticle = new registerArticleModel({
      title,
      description,
      category,
      userId,
      filePath, // Optional file path
    });

    // Save the new article to the database
    await newArticle.save();

    return { message: "Article added successfully" };
  } catch (error: any) {
    console.error("Error adding article:", error.message);
    throw new Error(error.message);
  }
}
