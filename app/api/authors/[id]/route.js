import { NextResponse } from "next/server";
import Author from "@/app/models/Author";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request, { params }) {
  await connectMongoDB();
  const author = await Author.findById(params.id);
  return NextResponse.json(author);
}

export async function PUT(request, { params }) {
  await connectMongoDB();
  const data = await request.json();
  const author = await Author.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(author);
}

export async function DELETE(request, { params }) {
  await connectMongoDB();
  await Author.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Author deleted successfully" });
}
