import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Article from '@/models/article';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    
    const publishedCount = await Article.countDocuments({ 
      authorId: session.user.id, 
      status: 'published' 
    });
    
    const draftCount = await Article.countDocuments({ 
      authorId: session.user.id, 
      status: 'draft' 
    });
    
    const articles = await Article.find({ authorId: session.user.id });
    const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);

    return NextResponse.json({
      publishedCount,
      draftCount,
      totalViews
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
