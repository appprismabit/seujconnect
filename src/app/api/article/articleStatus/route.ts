import { NextResponse } from 'next/server';
import { connectDB } from '../../db';
import { articleStatus } from '../../controllers/articleController';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    await connectDB();

    try {
        const formData = await req.formData();
        const status = formData.get('articleStatus')?.toString() || '';
        const articleId = formData.get('articleId')?.toString() || '';

        if (!status) {
            return NextResponse.json(
                { error: 'Please Enter the value of status' },
                { status: 400 } // Bad request
            );
        }

        const result = await articleStatus(status, articleId);

        if (result) {

            return NextResponse.json(
                { message: result.message },
                { status: 201 } // Created
            );
        } else {
            return NextResponse.json(
                { error: 'Failed to add the comment.' },
                { status: 500 } // Internal Server Error
            );
        }
    } catch (error: any) {
        console.error(error); // Log the error for debugging purposes
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 } // Internal Server Error
        );
    }
};
