import Article from "@/models/article";
import { connectMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectMongoDB();
    
    const articles = await Article.find({ author: session.user.name })
      .sort({ createdAt: -1 });

    const stats = {
      published: articles.filter(article => article.status === "published").length,
      drafts: articles.filter(article => article.status === "draft").length,
      views: articles.reduce((total, article) => total + (article.views || 0), 0)
    };

    return Response.json({
      success: true,
      articles,
      stats
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
