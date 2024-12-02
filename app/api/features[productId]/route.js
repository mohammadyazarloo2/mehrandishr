import { connectMongoDB } from "@/lib/mongodb";
import Features from "@/models/features";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const features = await Features.find({ productId: params.productId });
    return NextResponse.json(features);
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت ویژگی‌های محصول" },
      { status: 500 }
    );
  }
}
