import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import BlogCategory from '@/models/BlogCategory';

export async function GET() {
  try {
    await connectMongoDB();
    const categories = await BlogCategory.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json();
    const category = await BlogCategory.create({
      ...data,
      parent: "0" // Adding default parent value
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}