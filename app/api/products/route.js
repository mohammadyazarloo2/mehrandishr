import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import Features from "@/models/features";
import { NextResponse } from "next/server";
import Category from "@/models/category";
import Brand from "@/models/brand";

export async function GET(req) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sort = searchParams.get('sort') || 'newest';
    
    let sortQuery = {};
    switch(sort) {
      case 'cheapest':
        sortQuery = { price: 1 };
        break;
      case 'expensive':
        sortQuery = { price: -1 };
        break;
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      case 'mostViewed':
        sortQuery = { views: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    const query = {};
    if (searchParams.get('category')) {
      query.category = { $in: searchParams.get('category').split(',') };
    }
    if (searchParams.get('brand')) {
      query.brand = searchParams.get('brand');
    }

    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Products.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit),
      Products.countDocuments(query)
    ]);

    return NextResponse.json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
