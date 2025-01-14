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

    const questions = await Question.find({
      _id: { $in: Object.keys(answers) }
    });

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach(question => {
      const userAnswer = answers[question._id];
      if (userAnswer === question.options[question.correct]) {
        correctAnswers++;
      }
    });

    const wrongAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const examResult = {
      userId: session.user.id,
      category,
      level,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      answers: Object.entries(answers).reduce((acc, [id, answer]) => {
        acc[id] = answer;
        return acc;
      }, {})
    };

    await ExamResult.create(examResult);

    return NextResponse.json({
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      category
    });

  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json(
      { error: 'خطا در ثبت نتیجه آزمون' },
      { status: 500 }
    );
  }
}

