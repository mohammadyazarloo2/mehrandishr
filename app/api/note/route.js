import { connectMongoDB } from "@/lib/mongodb";
import NoteBook from "@/models/notebook";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const pro=await NoteBook.find();
    return NextResponse.json({ message: "notes fetched",data:pro }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "an error accoured" });
  }
}
export const dynamic = 'force-dynamic'