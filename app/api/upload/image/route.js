import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image"); // Changed from "file" to "image"

    if (!file) {
      return NextResponse.json(
        { error: "No file received" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), "public/uploads/articles", filename);

    await writeFile(filepath, buffer);
    const url = `/uploads/articles/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}