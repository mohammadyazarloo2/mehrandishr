import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Article from '@/models/Article';

export async function GET() {
  try {
    await connectMongoDB();
    const articles = await Article.find({}, 'tags');
    const allTags = articles.flatMap(article => article.tags || []);
    const uniqueTags = [...new Set(allTags)];
    
    return NextResponse.json(uniqueTags);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}