import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Question from "@/models/Question";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('category');
  const level = searchParams.get('level');

  try {
    await connectMongoDB();
    
    const query = {};
    if (categoryId) query.category = categoryId;
    if (level) query.level = level;

    const questions = await Question.find(query)
      .populate('category')
      .sort({ createdAt: -1 });

    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch questions" }, 
      { status: 500 }
    );
  }
}
