import { connectDB } from '../../db/index';
import { NextRequest, NextResponse } from "next/server";
import { updateArticle } from '../../controllers/articleController';
import { connect } from 'http2';


export const config = {
    api: {
        bodyParser: false,
    },
};
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const formData = await req.formData();
        
       
        const formValues: Record<string, any> = {};
        
        
        for (const [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        
       
        const result = await updateArticle({formValues});
        
        if(result){
            return NextResponse.json(
                {message: 'Article Updated successfully'},
                {status: 201}
            );
        }
      
        return NextResponse.json({formValues});
    } catch (error: any) {

    }
}