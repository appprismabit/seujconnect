import registerArticleModel from "../models/articleModel";
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
       // Create the new article object
    const newArticle = new registerArticleModel({
      ...body,
      userId,
    });


   
   

    // Save the new article to the database
    await newArticle.save();

    return { message: "Article added successfully" };
  } catch (error: any) {
    console.error("Error adding article: This is already taken");
    throw new Error(error.message);
  }
};


interface ArticleData {
  userId: string;
}

export async function getArticlesByUserId({
  userId,
}: ArticleData): Promise<any[]> {
  // Check if userId is provided
  if (!userId) {
    throw new Error("UserId is required");
  }

  try {
    
    const articles = await registerArticleModel.find({ userId }).exec();
    return articles; 
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

export async function getArticles(){
  const allArticles = await registerArticleModel.find({});
  return{
    message : 'All articles',
    allArticles
  } 
}

export async function delArticleById (body: any){
  const articleId = body.articleId;
  const deletedArticle = await registerArticleModel.findByIdAndDelete(articleId);
  if (!deletedArticle) {
    throw new Error('Article not found');
  }

   return {
      message: 'Article deleted successfully',
      deletedArticle
    };
}

export async function addArticleContent(body: any) {
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
    
   


    const updatedArticle = await registerArticleModel.findOneAndUpdate(
      { userId }, // Find the article by userId
      { $push: { content: { $each: body.content } } }, // Use $push to append to the content array
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );
    
      
      if (!updatedArticle) {
        throw new Error("No article found for this user.");
      }
    
    return { message: "Article Updated successfully",
      updatedUser: updatedArticle
     };
  } catch (error: any) {
    console.error("Error adding article: This is already taken");
    throw new Error(error.message);
  }
};





 

