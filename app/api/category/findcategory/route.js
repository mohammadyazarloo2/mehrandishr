import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { _id } = await req.json();
  console.log("find Request for ID:", _id);
  try {
    await connectMongoDB();
    const category = await Category.findByIdAndUpdate(
      _id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return NextResponse.json({ message: category }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
