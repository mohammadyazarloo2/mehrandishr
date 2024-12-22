import { connectMongoDB } from "@/lib/mongodb";
import UserGameStats from "@/models/userGameStats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "لطفا وارد شوید" }, { status: 401 });
    }

    let stats = await UserGameStats.findOne({ userId: session.user.id });
    
    if (!stats) {
      stats = await UserGameStats.create({ userId: session.user.id });
    }

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت آمار" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "لطفا وارد شوید" }, { status: 401 });
    }

    const data = await req.json();
    const stats = await UserGameStats.findOneAndUpdate(
      { userId: session.user.id },
      data,
      { new: true, upsert: true }
    );

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "خطا در بروزرسانی آمار" }, { status: 500 });
  }
}
