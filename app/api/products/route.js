import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import Features from "@/models/features";
import { NextResponse } from "next/server";
import Category from "@/models/category";
import Brand from "@/models/brand";

export async function GET(request) {
  try {
    await connectMongoDB();

    // Get page and limit from URL params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;
    const categoryParam = searchParams.get("category");
    const brandId = searchParams.get("brand");
    
    let query = {};
    if (categoryParam) {
      const categoryIds = categoryParam.split(",");
      query.category = { $in: categoryIds };
    }
    if (brandId) query.brandId = brandId;
    

    // Get total count
    const totalProducts = await Products.countDocuments(query);

    // Get paginated products
    const products = await Products.find(query)
      .populate("category")
      .populate("brandId")
      .populate({
        path: "features",
        select: "title value",
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      status: "success",
      data: products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.log("Error fetching products:", error);
    return NextResponse.json(
      { message: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}
