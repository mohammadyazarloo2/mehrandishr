import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Author from "@/models/Author";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const author = await Author.findOne({ 
        name: params.name 
      }).select('name avatar bio expertise socialLinks');
    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
