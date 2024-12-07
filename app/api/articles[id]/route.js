import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const db = await connectToDatabase();
    const article = await db.collection('articles').findOne({
      // Adjust the query based on your database structure
      title: decodeURIComponent(params.id.toString().replace(/-/g, " "))
    });

    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
