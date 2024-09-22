import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
import { connectDB } from '../../db/index';

import { ReducerType } from '@reduxjs/toolkit';
import { getArticlesByUserId } from '../../controllers/articleController';

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
    const token = formData.get('token')?.toString() || "";
    if (!token) {
      return new Response('No token provided', { status: 401 });
    }
    let userId;
    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'JWT secret is not defined' }, { status: 500 });
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      userId = decoded?.user._id;
      const result = await getArticlesByUserId(userId);
      return NextResponse.json({
        status: 201,
        data: result
      })
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Invalid token.' },
        { status: 403 } // Forbidden
      );
    }
  } catch (error: any) {

  }

}