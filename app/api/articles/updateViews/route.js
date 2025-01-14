import { NextResponse } from "next/server";
import Article from "@/models/article";
import { connectMongoDB } from "@/lib/mongodb";
import BlogCategory from "@/models/BlogCategory";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { articleId } = await req.json();

    const article = await Article.findByIdAndUpdate(
      articleId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!article) {
      return NextResponse.json(
        { message: "مقاله مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      views: article.views,
    });

    await BlogCategory.findByIdAndUpdate(
      article.category,
      { $inc: { views: 1 } },
      { new: true }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در بروزرسانی تعداد بازدید" },
      { status: 500 }
    );
  }
}
