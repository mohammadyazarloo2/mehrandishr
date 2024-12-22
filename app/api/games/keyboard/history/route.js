import { connectMongoDB } from "@/lib/mongodb";
import GameHistory from "@/models/gameHistory";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const history = await GameHistory.find({ 
      userId: session.user._id,
      gameType: 'keyboard'
    }).sort({ createdAt: -1 });

    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت تاریخچه" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    console.log('Received data:', data);
    console.log('User session:', session);

    const gameHistory = await GameHistory.create({
      userId: session.user._id, // Changed from id to _id
      gameType: 'keyboard',
      score: data.score || 0,
      level: data.level || 1,
      mistakes: data.mistakes || 0,
      word: data.word || '',
      timeSpent: data.timeSpent || 0,
      streak: data.streak || 0
    });

    return NextResponse.json(gameHistory);
  } catch (error) {
    console.error('Game history error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}  