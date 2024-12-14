import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    
    if (!file) {
      return new Response(JSON.stringify({ error: "No file received" }), { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ایجاد نام یکتا برای فایل
    const uniqueName = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), 'public', 'uploads', 'podcasts', uniqueName);
    
    // ذخیره فایل
    await writeFile(path, buffer);
    
    // برگرداندن آدرس فایل
    const url = `/uploads/podcasts/${uniqueName}`;
    
    return new Response(JSON.stringify({ url }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
