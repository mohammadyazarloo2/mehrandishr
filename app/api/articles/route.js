import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Article from '@/models/articles';

// GET all articles
export async function GET(request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const tag = searchParams.get('tag');
    const authorName = searchParams.get('author');

    let query = {};
    if (categoryId && categoryId !== 'undefined' && categoryId !== 'null') {
      query.category = categoryId;
    }
    if (tag && tag !== 'undefined' && tag !== 'null') {
      query.tags = { $in: [tag] };  // استفاده از عملگر $in برای جستجو در آرایه tags
    }
    if (authorName && authorName !== 'undefined' && authorName !== 'null') {
      query['author.name'] = authorName;  // Filter by author.name
    }

    const articles = await Article.find(query)
      .populate('category')
      .populate('author')
      .sort({ date: -1 });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new article
export async function POST(req) {
  try {
    const articleData = await req.json();
    await connectMongoDB();
    const article = await Article.create(articleData);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
