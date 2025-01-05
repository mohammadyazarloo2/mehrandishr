import { connectMongoDB } from "@/lib/mongodb";
import Setting from "@/models/setting";

// Get settings
export async function GET() {
  try {
    await connectMongoDB();
    const settings = await Setting.findOne();
    return Response.json({ success: true, settings });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}

// Update settings
export async function PUT(req) {
  try {
    await connectMongoDB();
    const updatedData = await req.json();
    const settings = await Setting.findOneAndUpdate(
      {},
      updatedData,
      { new: true, upsert: true }
    );
    return Response.json({ success: true, settings });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}

// Invalidate settings cache
export async function POST() {
  try {
    await connectMongoDB();
    await Setting.findOneAndUpdate(
      {},
      { $currentDate: { lastModified: true } }
    );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}