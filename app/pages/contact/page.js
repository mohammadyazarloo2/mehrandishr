"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FiSend, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function ContactPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("در حال ارسال پیام...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id,
          subject: formData.subject,
          message: formData.message,
          name: session ? undefined : formData.name,
          email: session ? undefined : formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message, { id: toastId });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message, { id: toastId });
      }
    } catch (error) {
      toast.error("خطا در برقراری ارتباط با سرور", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "آدرس",
      content: "تهران، خیابان ولیعصر",
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "تلفن تماس",
      content: "021-12345678",
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "ایمیل",
      content: "info@mehrandish.ir",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "#10B981",
              color: "white",
              direction: "rtl",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "white",
              direction: "rtl",
            },
          },
          loading: {
            style: {
              background: "#3B82F6",
              color: "white",
              direction: "rtl",
            },
          },
          duration: 4000,
        }}
      />

      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">تماس با ما</h1>
          <p className="text-gray-600 text-lg">
            ما مشتاقانه منتظر شنیدن نظرات و پیشنهادات شما هستیم
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
                {item.icon}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!session && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-gray-700 mb-2 font-medium">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required={!session}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                    placeholder="نام خود را وارد کنید"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-gray-700 mb-2 font-medium">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required={!session}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                    placeholder="example@email.com"
                  />
                </motion.div>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-gray-700 mb-2 font-medium">
                موضوع
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300"
                placeholder="موضوع پیام خود را وارد کنید"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-gray-700 mb-2 font-medium">
                پیام
              </label>
              <textarea
                rows="6"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 resize-none"
                placeholder="پیام خود را بنویسید..."
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 via-[#ffdb00] to-yellow-500 text-gray-900 rounded-xl font-medium
                flex items-center justify-center gap-2 hover:from-yellow-500 hover:via-[#ffdb00] hover:to-yellow-600 
                focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300
                disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                "در حال ارسال..."
              ) : (
                <>
                  <span>ارسال پیام</span>
                  <FiSend className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
