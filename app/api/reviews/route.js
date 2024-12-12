import { connectMongoDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();
    
    // Validate required fields
    if (!body.productId || !body.name || !body.email || !body.rating || !body.comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const newReview = await Review.create(body);
    return NextResponse.json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Review fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}