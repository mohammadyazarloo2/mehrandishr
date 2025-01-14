import Product from "@/models/products";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { productId } = await req.json();

    const product = await Product.findByIdAndUpdate(
      productId,
      { $inc: { views: 1 } },
      { new: true }
    );

    return NextResponse.json({ success: true, views: product.views });
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در بروزرسانی تعداد بازدید" },
      { status: 500 }
    );
  }
}
