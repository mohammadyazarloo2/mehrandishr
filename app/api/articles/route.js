import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Article from "@/models/article";
import { getServerSession } from "next-auth";
import slugify from "slugify";
import { authOptions } from "../auth/[...nextauth]/route";

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
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectMongoDB();
    const data = await req.json();

    // Generate slug from title
    const slug = slugify(data.title, { lower: true });

    // Create article with author info
    const article = await Article.create({
      ...data,
      slug,
      author: {
        name: session.user.name,
        avatar: session.user.image || ""
      }
    });

    return new Response(JSON.stringify(article), { status: 201 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
