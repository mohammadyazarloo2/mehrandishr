import { connectMongoDB } from "@/lib/mongodb";
import Brand from "@/models/brand";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const brands = await Brand.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت برندها", error },
      { status: 500 }
    );
  }
}
