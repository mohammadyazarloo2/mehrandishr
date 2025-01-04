import { NextResponse } from 'next/server';
import { connectMongoDB } from "@/lib/mongodb";
import Question from "@/models/Question";
import ExamResult from "@/models/ExamResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'لطفا وارد شوید' }, { status: 401 });
    }
    await connectMongoDB();
    const { category, level, answers } = await request.json();

    // Get questions from database
    const questions = await Question.find({
      _id: { $in: Object.keys(answers) }
    });

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    // Compare each answer with correct option index
    questions.forEach(question => {
      const userAnswer = answers[question._id];
      const options = question.options;
      const correctIndex = question.correct;
      
      // Check if user's answer matches the option at correct index
      if (options[correctIndex] === userAnswer) {
        correctAnswers++;
      }
    });

    const wrongAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save result
    await ExamResult.create({
      userId: session.user.id,
      category: category,
      level,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      answers
    });

    return NextResponse.json({
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      category // Return category ID in response
    });

  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json(
      { error: 'خطا در ثبت نتیجه آزمون' },
      { status: 500 }
    );
  }
}
