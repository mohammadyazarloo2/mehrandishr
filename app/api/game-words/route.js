import { connectMongoDB } from "@/lib/mongodb";
import GameWord from "@/models/gameWord";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const words = await GameWord.find().sort({ createdAt: -1 });
    return NextResponse.json(words);
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت کلمات" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const word = await GameWord.create(data);
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json({ error: "خطا در ایجاد کلمه" }, { status: 500 });
  }
}
