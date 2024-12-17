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
    
    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectMongoDB();

    const author = await Author.findOneAndUpdate(
      { userId: session.user.id },
      {
        bio: data.bio,
        expertise: data.expertise,
        socialLinks: data.socialLinks,
        avatar: data.avatar,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}