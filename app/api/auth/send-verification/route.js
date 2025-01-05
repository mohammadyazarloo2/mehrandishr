import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { sendEmail } from "@/lib/mail";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectMongoDB();

    // تولید کد تصادفی 6 رقمی
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log('Sending verification code:', {
      email,
      verificationCode,
    });

    // ذخیره یا بروزرسانی کد در دیتابیس
    await User.findOneAndUpdate(
      { email },
      { 
        $set: { 
          verificationCode,
          verificationExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 دقیقه اعتبار
        }
      },
      { upsert: true }
    );

    // ارسال ایمیل
    await sendEmail({
      to: email,
      subject: "کد تایید مهراندیش",
      text: `کد تایید شما: ${verificationCode}`
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "خطا در ارسال کد تایید" }), { status: 500 });
  }
}
