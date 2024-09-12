import Article from '../models/articleModel';
import jwt from 'jsonwebtoken';

interface RegisterArticle {
    articleTitle: string;
    articleSubtitle: string;
    articleCatg: string;
}
export async function registerArticle({
    articleTitle,
    articleSubtitle,
    articleCatg
}:RegisterArticle): Promise<{ token: string }> {
    const newArticle = new Article({
        articleTitle,
        articleSubtitle,
        articleCatg
    });

    await newArticle.save();

    const token = jwt.sign({articleId: newArticle._id}, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
    return {token};
}
