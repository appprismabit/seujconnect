import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../db/index';
import { addArticle } from '../controllers/articleController';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const ensureDirectoryExists = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Create directory recursively if it does not exist
    }
};

export async function POST(req: NextRequest) {
    await connectDB();

    return new Promise((resolve, reject) => {
        const uploadDir = path.join(process.cwd(), '/public/uploads/');
        ensureDirectoryExists(uploadDir); // Ensure the upload directory exists

        const form = new formidable.IncomingForm({
            uploadDir: uploadDir,
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });

        form.parse(req as any, async (err: any, fields: any, files: any) => {
            if (err) {
                console.error('Formidable parsing error:', err);
                return resolve(NextResponse.json({ error: err.message }, { status: 400 }));
            }

            try {
                // Prepare body with parsed fields and file path
                const body = {
                    ...fields,
                    file: files.file ? files.file[0] : undefined,
                };

                const response = await addArticle(body);
                return resolve(NextResponse.json({ message: 'Article added successfully', response }, { status: 201 }));
            } catch (error: any) {
                console.error('Error adding article:', error);
                return resolve(NextResponse.json({ error: error.message }, { status: 400 }));
            }
        });
    });
}
