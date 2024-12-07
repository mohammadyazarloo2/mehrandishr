import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Author from '@/models/Author';

export async function GET() {
  try {
    await connectMongoDB();
    const authors = await Author.find();
    return NextResponse.json(authors);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const author = await Author.create(data);
    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
