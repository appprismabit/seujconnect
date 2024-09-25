import { NextRequest, NextResponse } from "next/server";
import {getSingleArticleById} from '../../controllers/articleController';
import {connectDB} from '../../db/index';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest){
    try{
        await connectDB();
        const formData = await req.formData();
        const articleId = formData.get('articleId')?.toString() || '';
        console.log('This is the articleId ' +articleId);
        
        if(!articleId){
            return NextResponse.json({success: false, message : 'Please input article id'}, {status: 400});

        }
       // console.log(articleId); 

        const fetchSingleArticle = await getSingleArticleById(articleId);

        return NextResponse.json(
            {data: fetchSingleArticle},
            {status: 201}
        );
        
    }catch(error : any){
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    console.error('Error handling article upload:', errorMessage);

    // Return error response
    return NextResponse.json({ message: errorMessage }, { status: 500 }); 
    }
}