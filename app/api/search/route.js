import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
import Article from "@/models/article";

export async function GET(req) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      const products = await Product.find().limit(5);
      const articles = await Article.find().limit(5);
      return Response.json({ products, articles });
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    }).limit(5);

    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    }).limit(5);

    return Response.json({ products, articles });

  } catch (error) {
    console.log("Search error:", error);
    return Response.json({ error: "خطا در جستجو" }, { status: 500 });
  }
}
