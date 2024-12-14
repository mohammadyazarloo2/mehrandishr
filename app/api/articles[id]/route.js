import { connectMongoDB } from "@/lib/mongodb";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const article = await Article.findById(params.id);
    
    return NextResponse.json({
      success: true,
      article
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  await connectMongoDB();
  
  const body = await request.json();
  const { id } = params;

  const updatedArticle = await Article.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true, runValidators: true }
  );

  return NextResponse.json({
    success: true,
    article: updatedArticle
  });
}