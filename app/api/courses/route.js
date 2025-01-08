import { NextResponse } from 'next/server';
import Course from '@/models/course';
import { connectMongoDB } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectMongoDB();
    
    const courses = await Course.find();

    return NextResponse.json(courses);
    
  } catch (error) {
    return NextResponse.json(
      { message: 'خطا در دریافت اطلاعات دوره‌ها' },
      { status: 500 }
    );
  }
}
