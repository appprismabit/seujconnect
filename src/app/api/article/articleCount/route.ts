import { NextResponse } from 'next/server';
import { connectDB } from '../../db/index';
import { articleCount } from '../../controllers/articleController';
import jwt from 'jsonwebtoken';

export const config = {
    api: {
        bodyParser: false,
    },
};

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
    await connectDB();
    try {
        const formData = await req.formData();
        const token = formData.get('token')?.toString() || ""; // Corrected to call toString()
       
        if (!token) {
            return NextResponse.json(
                { error: 'Authorization token is required.' },
                { status: 401 } // Unauthorized
            );
        }
        // Verify the token
       let userId;
        if (!JWT_SECRET) {
            return NextResponse.json(
                { error: 'JWT secret is not defined.' },
                { status: 500 } // Internal Server Error
            );
        }

        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);          
            userId = decoded?.user._id;
           
           
            
            // Adjust this based on your token structure
        } catch (err) {
            return NextResponse.json(
                { error: 'Invalid token.' },
                { status: 403 } // Forbidden
            );
        }

        // Call articleCount with the verified userId
        const result = await articleCount(userId); // Pass userId to articleCount

        return NextResponse.json({
            status: 201,
            count: result
        });

    } catch (error: any) {
        console.error('Error fetching article counts:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 } // Internal Server Error
        );
    }
}
