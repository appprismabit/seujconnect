import { NextResponse } from "next/server";
import { connectDB } from "../../db/index";
import { addArticle } from "../../controllers/articleController";
import FileHelper from "../../Helpers/FileUploadHelper";
import registerArticleModel from "../../models/articleModel";
import { register } from "module";


// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  // Ensure the database is connected
  await connectDB();

  try {
    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const token = formData.get("token")?.toString() || ""; // Assuming JWT token is passed for authentication

    // Validate that required fields are present
    if (!file) {
      return NextResponse.json({ error: "File is missing" }, { status: 400 });
    }
    if (!title || !description || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    let lastArticle = await registerArticleModel.findOne({})
      .sort({ _id: -1 }) // Sort by _id in descending order to get the most recent document
      .exec();
    
    //const uniqueName = lastArticle?._id + "";

    //const uniqueName = lastArticle?._id.toString();
    if (typeof lastArticle === null) {
      console.log("Khumaisu");
      let lastArticle: { _id?: string } | undefined;
      lastArticle = { _id: "G_style" }; 
      console.log(lastArticle);
    }
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop();
    const newName = 'AR-TH' + lastArticle?._id + '.' + fileExtension;

    //let userDetails = await registerArticleModel.findOne({  })
    let userDetails = await registerArticleModel.find({ userId }).exec();


    // Save the file using the helper method and handle stream
    const savedFilePath = await FileHelper.saveFile(file.stream(), newName, "uploads/articlethumb");

    // Prepare the article data for saving in the database
    const articleData = {
      title,
      description,
      category,
      filePath: savedFilePath,
      fileName: newName,
      token, // Pass token for user authentication
    };



    // Save the article in the database using your article controller
    const savedArticle = await addArticle(articleData);

    // Return success response
    return NextResponse.json(
      { message: "Article added successfully", article: savedArticle },
      { status: 201 }
    );
  } catch (error: any) {
    // Log and return error
    console.error("Error handling article upload:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
