import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { receiverId, content } = await req.json();
    
    if (!receiverId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = await Message.create({
      sender: session.user.id,
      receiver: receiverId,
      content: content.trim()
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .lean();

    return NextResponse.json(populatedMessage);
  } catch (error) {
    console.error("Message sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await Message.find({
      $or: [
        { sender: session.user.id },
        { receiver: session.user.id }
      ]
    })
    .populate({
      path: 'sender',
      select: 'name email _id'
    })
    .populate({
      path: 'receiver',
      select: 'name email _id'
    })
    // .sort({ createdAt: -1 }) // This will sort messages in descending order
    .lean();

    // console.log("Found messages:", messages);
     // Debug log
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}