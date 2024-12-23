import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import ExamCategory from "@/models/ExamCategory";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parent');
  
    try {
      await connectMongoDB();
      
      let query = {};
      if (parentId) {
        query.parent = parentId;
      } else {
        query.parent = null; // فقط دسته‌های اصلی
      }
  
      const categories = await ExamCategory.find(query).sort({ createdAt: -1 });
      return NextResponse.json(categories);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
  }

export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();
    const category = await ExamCategory.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating exam category" },
      { status: 500 }
    );
  }
}
