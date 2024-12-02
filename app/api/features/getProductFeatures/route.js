import { connectMongoDB } from "@/lib/mongodb";
import Features from "@/models/features";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { productId } = await request.json();
    
    const features = await Features.find({ productId: productId });
    return new Response(JSON.stringify({ features }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch features", { status: 500 });
  }
}
