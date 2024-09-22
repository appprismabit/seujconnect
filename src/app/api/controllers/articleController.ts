import { NextResponse } from "next/server";
import registerArticleModel from "../models/articleModel";
import User from '../models/Users';
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from 'mongoose';
import { registerUser } from "./userController";




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

    //console.log(newArticle);

    // Save the new article to the database
    const result = await newArticle.save();
    console.log(result);

    return { message: "Article added successfully" };
  } catch (error: any) {
    console.error("Error adding article: This is already taken");
    throw new Error(error.message);
  }
};

export async function getArticlesByUserId(userId? : string) {
  const result = await registerArticleModel.findOne({userId}).exec();
  return result;
}
/*
  const articlesWithUsernames = await Promise.all(fetchAllArticles.map(async (article) => {
        const user = await User.findById(article.userId);
        return {
          ...article.toObject(), // Convert to plain object
          userName: user ? user.fname + " " + user.lname : 'Unknown', // Add username to article
          //  userLastName: user ? user.lname : 'Unknown', // Add username to article

        };
      }));
*/




export async function getArticles() {
  try {
      const article = await registerArticleModel.find({}).exec();
      const articlesWithUsernames = await Promise.all(article.map(async(article)=>{
        const user = await User.findById(article.userId);
        return {
          ...article.toObject(),
          userName: user ? user.fname + " " + user.lname : 'Unknown',
        }
      }));
      return articlesWithUsernames;
  } catch (error) {
      console.error("Error fetching articles:", error); 
      throw new Error('Failed to fetch articles'); 
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

  const _id = body.articleId;


  if (!_id) {
    throw new Error("Article id not found");
  }
  try {
    const updatedArticle = await registerArticleModel.findOneAndUpdate(
      { _id },
      { $push: { content: { $each: body.content } } },
      { new: true, runValidators: true }
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
};

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
    } catch (error: any) {
      console.error("Error adding comments: This is already taken");
      throw new Error(error.message);
    }

  }
};

export async function updateLikeDislikeCounts(articleId: string, status: string) {
  const _id = articleId;
  try {
    if (status === '1') {
      const result = await registerArticleModel.findByIdAndUpdate(
        _id,
        { $inc: { likes: 1 } }, // Increment likes by 1
        { new: true }
      ).exec();
      if (!result) {
        throw new Error('Article not found');
      }
      return {
        message: 'Like count updated successfully',
        updatedArticle: result,
      };
    } else if (status === '0') {
      const result = await registerArticleModel.findByIdAndUpdate(
        _id,
        { $inc: { dislike: 1 } }, // Increment dislike by 1
        { new: true }
      ).exec();
      if (!result) {
        throw new Error('Article not found');
      }
      return {
        message: 'Like count updated successfully',
        updatedArticle: result,
      }
    }
  } catch (error: any) {
    console.error('Error updating like count:', error);
    throw new Error(error.message);
  }

};

export async function articleCount(userId?: string) {
  try {
    const _id = userId;
    // Fetch user details to get the role
    const user = await User.findOne({ _id }, { role: 1 });
   
    if (!user) {
      throw new Error('User not found');
    }
    const isAdmin = user.role === 0; // Check if the user is an admin
    const matchStage = isAdmin ? [] : [{ $match: { userId } }]; // Adjust match stage based on role

    // Aggregate counts based on role
    const counts = await registerArticleModel.aggregate([
      ...matchStage,
      {
        $group: {
          _id: '$status', // Group by the numeric status field
          count: { $sum: 1 } // Count each document in the group
        }
      }
    ]).exec(); // Ensure to execute the query

    // Mapping of status
    const statusMapping: { [key: number]: string } = {
      0: 'draft',
      1: 'request_for_approval',
      2: 'published',
      3: 'rejected'
    };

    // Initialize the result object
    const result: { [key: string]: number } = {
      draft: 0,
      request_for_approval: 0,
      published: 0,
      rejected: 0
    };

    // Convert counts to more usable format
    counts.forEach(item => {
      const statusKey = item._id as number; // Assuming _id is a number
      const statusName = statusMapping[statusKey]; // Get the corresponding status name

      if (statusName) {
        result[statusName] = item.count; // Assign the counts to the respective status name
      }
    });

    return result;
  } catch (error) {
    console.error('Error counting articles:', error);
    throw new Error('Failed to count articles');
  }
}




export async function articleStatus(status: string, articleId: string) {

  try {
    const _id = articleId;

    if (!_id) {
      throw new Error("User ID not found in token");
    }
    const result = await registerArticleModel.findByIdAndUpdate(
      _id,  // Ensure this is the document's _id or a valid identifier
      { $set: { status } },  // set status into the status array field
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    console.log(result);
    if (result) {
      return (
        { message: 'Saved...' }
      );
    }

  } catch (error: any) {
    console.error('Error counting articles:', error);
    throw new Error('Failed to count articles');
  }
}
//Mir Kashem Ali
//Kabyashree Buragohain








