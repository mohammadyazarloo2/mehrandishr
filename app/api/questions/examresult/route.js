import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import ExamResult from "@/models/ExamResult";

export async function GET(request) {
  try {
    await connectMongoDB();
    
    const results = await ExamResult.find()
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