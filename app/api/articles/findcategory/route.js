import { connectMongoDB } from "@/lib/mongodb";
import BlogCategory from "@/models/BlogCategory";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { _id } = await req.json();
  try {
    await connectMongoDB();
    const category = await BlogCategory.findByIdAndUpdate(
      _id,
      { $inc: { views: 1 } },
      { new: true }
    );

    return NextResponse.json({ message: category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
