import { NextResponse } from "next/server";
import registerArticleModel from "../models/articleModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from 'mongoose';


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
  // let userDetails = await registerArticleModel.find({ userId }).exec();
  // console.log(userDetails);

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

export async function getArticles() {
  const allArticles = await registerArticleModel.find({});
  return {
    message: 'All articles',
    allArticles
  }
}

export async function delArticleById(body: any) {
  const articleId = body.articleId;

  const deletedArticle = await registerArticleModel.findByIdAndDelete(articleId);
  if (!deletedArticle) {
    throw new Error('Article  found');
  }

  return {
    message: 'Article deleted successfully',
    deletedArticle
  };
}

export async function addArticleContent(body: any) {
  // Decode the JWT token to extract user details
  // const decoded = jwt.decode(body.token);
  const _id = body.articleId;

  // let userId: string | undefined;

  // if (decoded && typeof decoded !== "string") {
  //   userId = (decoded as JwtPayload)?.user?._id; // Accessing the user's ID from the token
  // }
  if (!_id) {
    throw new Error("Article id not found");
  }
  try {
    const updatedArticle = await registerArticleModel.findOneAndUpdate(
      { _id }, // Find the article by userId
      { $push: { content: { $each: body.content } } }, // Use $push to append to the content array
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );


    if (!updatedArticle) {
      throw new Error("No article found for this article id.");
    }

    return {
      message: "Article Updated successfully",
      updatedUser: updatedArticle
    };
  } catch (error: any) {
    console.error("Error adding article: This is already taken");
    throw new Error(error.message);
  }
};




export async function removeArticleContent(body: any) {
  const _Id = body.articleId;
  const contentIdToRemove = body.contentIdToRemove;

  try {


    // Use findByIdAndUpdate with $pull to remove content
    const updatedArticle = await registerArticleModel.findByIdAndUpdate(
      _Id,
      { $pull: { content: { _id: contentIdToRemove } } },
      { new: true, runValidators: true } // Return the updated document and apply schema validators
    );

    if (!updatedArticle) {
      return NextResponse.json({ success: false, message: 'No article found for this ID' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article content deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error removing article content:', error);
    return NextResponse.json({ success: false, message: 'Error removing article content' }, { status: 500 });
  }
};

export async function getSingleArticleById(articleId: string) {

  const _id = articleId;
  // console.log("Perfect id " +_id)

  try {
    const fetchSingleArticledata = await registerArticleModel.find({ _id }).exec();
    // console.log(fetchSingleArticledata);

    if (!fetchSingleArticledata) {
      throw new Error('Data is unavailable');
    }
    return fetchSingleArticledata;

  } catch (error: any) {
    console.error('Error fetching single article', error);
    return NextResponse.json({ success: false, message: 'Error fetching single article' }, { status: 500 });
  }
};

export async function updateArticle(body: any) {
  console.log('From the body ' + JSON.stringify(body));
  const { formValues } = body;
  const _id = formValues.articleId;

  if (!_id || typeof _id === 'undefined' || _id === null) {
    throw new Error('Please provide the ID.');
  }

  // Remove the articleId from formValues because it is not a field to update
  const { articleId, ...updateFields } = formValues;

  // Use `$set` operator to update only the specified fields
  const updateArticleById = await registerArticleModel.findByIdAndUpdate(
    _id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updateArticleById) {
    throw new Error('Article not found.');
  }

  return updateArticleById;
}

export async function updateArticleContent(body: any) {
  const articleId = body.articleId;
  const contentId = body.contentId;
  const newContent = body.content;

  if (!articleId || !contentId || !newContent) {
    throw new Error('Required parameters are missing.');
  }

  try {
    const result = await registerArticleModel.findOneAndUpdate(
      {
        _id: articleId,
        'content._id': contentId // Find the article and the specific content item
      },
      {
        $set: {
          'content.$': newContent // Update the specific content item
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!result) {
      throw new Error("No article or content found for the given IDs.");
    }

    return result;
  } catch (error: any) {
    console.error('Error updating article content:', error);
    throw new Error('Error updating article content');
  }
};


export async function addArticleComment(body: any) {
  const _id = body.articleId;
  console.log("this is the comment body " + JSON.stringify(body));

  if (_id) {
    try {
      const result = await registerArticleModel.findOneAndUpdate(
        { _id },
        { $push: { comments: { $each: body.comment } } },
        { new: true, runValidators: true }
      );
      if (!result) {
        throw new Error('Article not found');
      }
      return result;
    }catch(error: any){
      console.error("Error adding comments: This is already taken");
    throw new Error(error.message);
    }
    
  }
};









