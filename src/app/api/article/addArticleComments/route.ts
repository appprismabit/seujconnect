import {NextResponse} from 'next/server';
import {connectDB} from '../../db/index';
import {addArticleComments} from '../../controllers/articleController';

export const config = {
    api:{
        bodyParser: false,
    },
}