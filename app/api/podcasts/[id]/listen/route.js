import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Podcast from "@/models/Podcast";

export async function POST(request, { params }) {
  try {
    await connectMongoDB();

    const result = await Podcast.findByIdAndUpdate(
      params.id,
      { $inc: { listens: 1 } },
      { new: true }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('Listen route error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
