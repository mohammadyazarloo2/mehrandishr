import { connectMongoDB } from "@/lib/mongodb";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Log the raw params to see what we're receiving
    console.log("Raw params:", params);
    
    const { id } = params;
    console.log("Extracted ID:", id);

    await connectMongoDB();
    // Use findOne instead of findById initially for debugging
    const article = await Article.findOne({ _id: id });
    
    if (!article) {
      return NextResponse.json({ error: `Article not found for ID: ${id}` }, { status: 404 });
    }
    
    return NextResponse.json(article);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { slug } = params;
    const updateData = await req.json();
    await connectMongoDB();
    
    const article = await Article.findOneAndUpdate(
      { slug },
      updateData,
      { new: true }
    );
    
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = params;
    await connectMongoDB();
    await Article.findOneAndDelete({ slug });
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
