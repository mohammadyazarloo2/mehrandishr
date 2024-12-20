import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Article from "@/models/article";
import Author from "@/models/Author";
import User from "@/models/user";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ isAuthor: false });
    }

    await connectMongoDB();
    
    // یافتن کاربر فعلی
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ isAuthor: false });
    }

    // یافتن نویسنده مرتبط با کاربر
    const author = await Author.findOne({ userId: user._id });
    if (!author) {
      return Response.json({ isAuthor: false });
    }

    // یافتن مقاله و چک کردن نام نویسنده
    const article = await Article.findById(params.id);
    if (!article) {
      return Response.json({ isAuthor: false });
    }

    // مقایسه نام نویسنده مقاله با نام نویسنده فعلی
    const isAuthor = article.author.name === author.name;

    return Response.json({ isAuthor });

  } catch (error) {
    console.error("Error checking author:", error);
    return Response.json({ isAuthor: false });
  }
}
