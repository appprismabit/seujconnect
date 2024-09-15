import { NextResponse } from 'next/server';
import { connectDB } from '../../db/index';
import { addArticleComment } from '../../controllers/articleController';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    await connectDB();
    try {
        const formData = await req.formData();

        // Retrieve necessary fields from form data
        const text = formData.get('text')?.toString() || '';
        const phoneNumber = formData.get('phoneNumber')?.toString() || '';
        const articleId = formData.get('articleId')?.toString() || '';

        // Construct the comment block
        const commentBlock = {
            text,
            phoneNumber: text ? phoneNumber : undefined,
        };

        // Prepare the new comment data
        const newComment = {
            comment: [commentBlock],
            articleId,
        };

        // Log the newComment object for debugging
        console.log('New Comment Data:', newComment);

        // Call the controller to add the comment
        const result = await addArticleComment(newComment);
        if (result) {
            return NextResponse.json(
                { message: 'Your comment is added successfully.' },
                { status: 201 }
            );
        } else {
            throw new Error('Error getting the result');
        }

        // Return success response

    } catch (error: any) {
        // Handle and log errors
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        console.error('Error handling adding comments: ', errorMessage);

        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
