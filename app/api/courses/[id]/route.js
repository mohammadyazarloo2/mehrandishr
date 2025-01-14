import { NextResponse } from 'next/server';
import Course from '@/models/course';
import { connectMongoDB } from '@/lib/mongodb';

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    
    const course = await Course.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!course) {
      return NextResponse.json(
        { message: 'دوره مورد نظر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
    
  } catch (error) {
    return NextResponse.json(
      { message: 'خطا در دریافت اطلاعات دوره' },
      { status: 500 }
    );
  }
}
