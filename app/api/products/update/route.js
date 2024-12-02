import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  const { name,title,description,price,_id } =await req.json();
  console.log("update Request for ID:", _id);
  try {
    await connectMongoDB();
    const product = await Products.updateOne({_id},{name,title,description,price});
    // res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    return NextResponse.json({ message: _id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
