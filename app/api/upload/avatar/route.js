import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    
    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ایجاد نام یکتا برای فایل
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads/avatar', fileName);

    // ذخیره فایل
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ 
      message: "File uploaded successfully",
      url: `/uploads/avatar/${fileName}`
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
