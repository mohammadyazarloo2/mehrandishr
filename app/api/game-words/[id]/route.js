import { connectMongoDB } from "@/lib/mongodb";
import GameWord from "@/models/gameWord";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const word = await GameWord.findById(params.id);
    if (!word) {
      return NextResponse.json({ error: "کلمه یافت نشد" }, { status: 404 });
    }
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت کلمه" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const word = await GameWord.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json({ error: "خطا در بروزرسانی کلمه" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();
    await GameWord.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "کلمه با موفقیت حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف کلمه" }, { status: 500 });
  }
}
