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
    
    const articles = await Article.find({ authorId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title image views readTime');

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
