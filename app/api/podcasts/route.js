import { connectMongoDB } from "@/lib/mongodb";
import Podcast from "@/models/Podcast";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const podcasts = await Podcast.find({});
    return NextResponse.json({ podcasts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}
