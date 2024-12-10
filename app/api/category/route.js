import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت دسته‌بندی‌ها" }, { status: 500 });
  }
}