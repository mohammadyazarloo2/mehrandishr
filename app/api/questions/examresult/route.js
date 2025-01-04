import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import ExamResult from "@/models/ExamResult";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'لطفا وارد شوید' }, { status: 401 });
    }

    await connectMongoDB();
    
    const results = await ExamResult.find({ userId: session.user.id })
      .populate({
        path: 'category',
        model: 'ExamCategory',
        select: 'name'
      })
      .sort({ createdAt: -1 })
      .select('score level totalQuestions correctAnswers wrongAnswers createdAt category');

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت نتایج آزمون‌ها' },
      { status: 500 }
    );
  }
}