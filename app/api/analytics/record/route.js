import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Analytics from "@/models/Analytics";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { path } = await req.json();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let record = await Analytics.findOne({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      path: path
    });

    if (record) {
      record.views += 1;
      await record.save();
    } else {
      record = await Analytics.create({
        date: today,
        views: 1,
        path: path
      });
    }

    return NextResponse.json({ success: true, views: record.views });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const path = searchParams.get('path');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await Analytics.findOne({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      path: path
    });

    return NextResponse.json({ views: record?.views || 0 });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json({ error: 'Failed to fetch views' }, { status: 500 });
  }
}