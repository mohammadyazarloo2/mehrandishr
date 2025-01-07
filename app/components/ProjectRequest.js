import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

export default function ProjectRequest({onClose}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        e.target.reset();
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl p-8 z-50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            درخواست پروژه
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RiCloseLargeFill className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">نام کاربری</label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
              placeholder="نام خود را وارد کنید"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">ایمیل</label>
            <input
              type="email" 
              id="email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
              placeholder="example@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">شماره تماس</label>
            <input
              type="tel"
              id="mobile"
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
              placeholder="09123456789"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">توضیحات پروژه</label>
            <textarea
              id="message"
              rows="4"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none resize-none"
              placeholder="توضیحات پروژه خود را وارد کنید..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-amber-500/20"
          >
            ثبت درخواست
          </button>
        </form>
      </div>
    </>
  );
}
