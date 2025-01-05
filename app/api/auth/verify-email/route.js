import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    await connectMongoDB();

    const user = await User.findOne({ 
      email,
      verificationCode: code,
      verificationExpires: { $gt: new Date() }
    });

    console.log('Verifying code:', {
      email,
      code,
      found: !!user
    });
    
    if (user) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "کد نامعتبر است" }), { status: 400 });
  } catch (error) {
    console.log('Verification Error:', error);
    return new Response(JSON.stringify({ error: "خطای سرور" }), { status: 500 });
  }
}