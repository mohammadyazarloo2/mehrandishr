import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Course from '@/models/course';

export async function GET() {
  try {
    await connectMongoDB();
    
    const courses = await Course.find({}, {
      title: 1,
      image: 1,
      _id: 1
    });

    return NextResponse.json(courses);
    
  } catch (error) {
    return NextResponse.json(
      { message: 'خطا در دریافت اطلاعات دوره‌ها' },
      { status: 500 }
    );
  }
}
