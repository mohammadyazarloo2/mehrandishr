import { connectMongoDB } from "@/lib/mongodb";
import Features from "@/models/features";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const features = await Features.find().populate('productId');
    return NextResponse.json(features);
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت ویژگی‌ها" },
      { status: 500 }
    );
  }
}
