import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { _id } =await req.json();
  console.log("find Request for ID:", _id);
  try {
    await connectMongoDB();
    const product = await Products.findById(_id);
    // res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    return NextResponse.json({ message: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
