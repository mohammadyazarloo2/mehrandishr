import { connectMongoDB } from "@/lib/mongodb";
import GameWord from "@/models/gameWord";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const words = await GameWord.find().select('name translate img level');
    return NextResponse.json(words);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
