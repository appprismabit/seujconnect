import registerArticleModel, { IaddArticle } from '../models/articleModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function addArticle(body: any) {
    const decoded = jwt.decode(body.token);
    let userId: string | undefined;

    if (decoded && typeof decoded !== 'string') {
        userId = (decoded as JwtPayload)?.user?._id; // Accessing the user's ID from the token
    }
    if (!userId) {
        throw new Error('User ID not found in token');
    }

    try {
        const { title, description, category } = body;
        let filePath: string | undefined;

        // Handle file if it exists
        if (body.file && body.file.filepath) {
            filePath = body.file.filepath; // File path where formidable saved the file
        }

        const newArticle = new registerArticleModel({
            title,
            description,
            category,
            userId,
            filePath // Save the file path if available
        });

        await newArticle.save();
        
        return { message: 'Article added successfully' };

    } catch (error: any) {
        console.error('Error adding article:', error.message);
        throw new Error(error.message);
    }
}
