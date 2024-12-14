import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Author from '@/models/Author';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    const author = await Author.findOne({ userId: session.user.id });
    
    return NextResponse.json({ isAuthor: !!author });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
