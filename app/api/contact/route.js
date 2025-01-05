import { connectMongoDB } from "@/lib/mongodb";
import Contact from "@/models/contact";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const { subject, message, name, email } = await req.json();

    // Create contact data object
    const contactData = {
      subject,
      message,
      status: 'pending',
      createdAt: new Date()
    };

    // Add user info based on session
    if (session?.user?.id) {
      contactData.userId = session.user.id;
    } else if (name && email) {
      contactData.name = name;
      contactData.email = email;
    } else {
      throw new Error('Invalid user data');
    }

    // Save to database
    const newContact = await Contact.create(contactData);

    return Response.json({ 
      success: true, 
      message: 'پیام با موفقیت ثبت شد',
      contactId: newContact._id 
    });

  } catch (error) {
    console.log('Contact API Error:', error);
    return Response.json({ 
      success: false, 
      message: error.message || 'خطا در ثبت پیام'
    }, { status: 500 });
  }
}
