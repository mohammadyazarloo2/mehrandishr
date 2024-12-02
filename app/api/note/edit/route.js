import { connectMongoDB } from "@/lib/mongodb";
import NoteBook from "@/models/notebook";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  const { title,noteText,_id } =await req.json();
  console.log("update Request for ID:", _id);
  try {
    await connectMongoDB();
    const product = await NoteBook.updateOne({_id},{title,noteText});
    // res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    return NextResponse.json({ message: _id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
