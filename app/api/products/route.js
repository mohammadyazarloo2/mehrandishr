import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import Features from "@/models/features";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const products = await Products.find()
      .populate({
        path: 'features',
        model: Features,
        select: 'title value'
      })
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      status: "success",
      data: products 
    });

  } catch (error) {
    console.log("Error fetching products:", error);
    return NextResponse.json(
      { message: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}