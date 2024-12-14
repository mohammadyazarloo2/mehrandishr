import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import Article from "@/models/article";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { name } = params;
    await connectMongoDB();
    
    const articles = await Article
      .find({ "author.name": name })
      .sort({ createdAt: -1 })
      .limit(5);

    const stats = {
      published: await Article.countDocuments({ 
        "author.name": name,
        status: "published" 
      }),
      drafts: await Article.countDocuments({ 
        "author.name": name,
        status: "draft" 
      }),
      views: articles.reduce((total, article) => total + (article.views || 0), 0)
    };

    return NextResponse.json({
      success: true,
      articles,
      stats
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
